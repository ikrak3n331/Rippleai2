// Password page. Checks the one password and, on a match, sets the session
// flag that partials/gate.html looks for before letting a page paint.
//
// Client-side only — the password is in the bundle. It keeps the examples out
// of casual view; it is not access control.

const PASSWORD = 'rippleexample';
const KEY = 'ripple-unlocked';

const form = document.querySelector('[data-password-form]');
const input = document.getElementById('gate-pass');
const error = document.getElementById('gate-error');

/* Only ever follow a same-origin path back. A leading `//` or a full URL would
   turn the ?next= parameter into an open redirect. */
const destination = () => {
  const next = new URLSearchParams(location.search).get('next');
  return next && next.startsWith('/') && !next.startsWith('//') ? next : '/';
};

form?.addEventListener('submit', event => {
  event.preventDefault();

  if (input.value !== PASSWORD) {
    error.hidden = false;
    input.setAttribute('aria-invalid', 'true');
    input.select();
    return;
  }

  try {
    sessionStorage.setItem(KEY, '1');
  } catch (e) {
    /* Nothing to do: without storage the gate lets pages through anyway. */
  }

  location.replace(destination());
});

input?.addEventListener('input', () => {
  error.hidden = true;
  input.removeAttribute('aria-invalid');
});
