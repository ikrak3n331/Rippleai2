// Behaviour for the Privacy Page. The Figma frames are static, so the
// interactions here follow the design system's documented component states
// (accordion open/closed, "Open all" toggle, banner menu).

/* ---------- Banner menu ---------- */
const menuButton = document.querySelector('.banner__item--menu');
const menuPanel = document.getElementById('banner-menu-panel');

if (menuButton && menuPanel) {
  const setMenu = open => {
    menuButton.setAttribute('aria-expanded', String(open));
    menuPanel.hidden = !open;
  };

  menuButton.addEventListener('click', () => {
    setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
  });

  document.addEventListener('click', event => {
    if (!menuPanel.hidden && !menuPanel.contains(event.target) && !menuButton.contains(event.target)) {
      setMenu(false);
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menuPanel.hidden) {
      setMenu(false);
      menuButton.focus();
    }
  });
}

/* ---------- Accordion ---------- */
document.querySelectorAll('[data-accordion]').forEach(accordion => {
  const buttons = [...accordion.querySelectorAll('.accordion__button')];
  const toggle = accordion.querySelector('[data-accordion-toggle]');

  const setItem = (button, open) => {
    button.setAttribute('aria-expanded', String(open));
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    if (panel) panel.hidden = !open;
  };

  const syncToggle = () => {
    if (!toggle) return;
    const allOpen = buttons.every(b => b.getAttribute('aria-expanded') === 'true');
    toggle.setAttribute('aria-expanded', String(allOpen));
    toggle.textContent = allOpen ? 'Close all' : 'Open all';
  };

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      setItem(button, button.getAttribute('aria-expanded') !== 'true');
      syncToggle();
    });
  });

  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      buttons.forEach(button => setItem(button, open));
      syncToggle();
    });
  }

  syncToggle();
});

/* ---------- Tabs ---------- */
document.querySelectorAll('[data-tabs]').forEach(group => {
  const tabs = [...group.querySelectorAll('[role="tab"]')];
  if (!tabs.length) return;

  const select = tab => {
    tabs.forEach(t => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) panel.hidden = !on;
    });
  };

  tabs.forEach(tab => tab.addEventListener('click', () => select(tab)));

  // Left/Right arrows move between tabs, per the WAI-ARIA tabs pattern.
  group.querySelector('[role="tablist"]').addEventListener('keydown', event => {
    const i = tabs.indexOf(document.activeElement);
    if (i === -1) return;
    let next = null;
    if (event.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
    if (event.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
    if (event.key === 'Home') next = tabs[0];
    if (event.key === 'End') next = tabs[tabs.length - 1];
    if (!next) return;
    event.preventDefault();
    next.focus();
    select(next);
  });
});

/* ---------- Textarea word count ---------- */
document.querySelectorAll('[data-word-count]').forEach(field => {
  const output = document.getElementById(field.dataset.wordCount);
  if (!output) return;
  const update = () => {
    const words = field.value.trim() ? field.value.trim().split(/\s+/).length : 0;
    output.textContent = `You have ${words} word${words === 1 ? '' : 's'}`;
  };
  field.addEventListener('input', update);
  update();
});
