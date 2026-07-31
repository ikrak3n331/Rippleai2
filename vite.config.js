import { defineConfig } from 'vite';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));

/**
 * Minimal server-side includes so the banner, footer and icon sprite live in one
 * place instead of being duplicated across every page.
 *
 *   <!--#include partials/banner.html -->
 *
 * Runs for both `vite dev` and `vite build`, so there is no runtime cost and no
 * flash of un-injected markup.
 */
function includePartials() {
  const read = name => readFileSync(resolve(root, name), 'utf8');
  return {
    name: 'include-partials',
    enforce: 'pre',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        let out = html;
        // Nested includes are allowed one level deep; loop until stable.
        for (let i = 0; i < 5 && /<!--#include\s/.test(out); i++) {
          out = out.replace(/<!--#include\s+([\w./-]+)\s*-->/g, (_, file) => read(file));
        }
        return out;
      },
    },
    // Editing a partial should reload the page.
    handleHotUpdate({ file, server }) {
      if (file.includes('partials')) server.ws.send({ type: 'full-reload' });
    },
  };
}

const pages = readdirSync(resolve(root, 'pages'))
  .filter(f => f.endsWith('.html'))
  .reduce((acc, f) => ({ ...acc, [f.replace(/\.html$/, '')]: resolve(root, 'pages', f) }), {});

export default defineConfig({
  plugins: [includePartials()],
  build: {
    rollupOptions: {
      input: { index: resolve(root, 'index.html'), ...pages },
    },
  },
});
