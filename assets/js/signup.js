/* ==============================================
   QUIZARY — SIGN UP PAGE
   Password visibility toggles + client-side
   validation (name, email, password match/strength)
   before allowing submit.
   ============================================== */

document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector('.auth-form');
  if (!form) return;

  /* ---------- Password show/hide toggles ---------- */
  const toggles = form.querySelectorAll('.auth-field-toggle');

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const input = toggle.previousElementSibling;
      if (!input) return;

      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      toggle.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
      toggle.classList.toggle('auth-field-toggle-active', isHidden);
    });
  });

  /* ---------- Field refs ---------- */
  const nameField = form.querySelector('input[name="fullname"]');
  const emailField = form.querySelector('input[name="email"]');
  const passwordField = form.querySelector('input[name="password"]');
  const confirmField = form.querySelector('input[name="confirm_password"]');

  const setFieldError = (input, hasError) => {
    const wrapper = input.closest('.auth-field');
    if (wrapper) wrapper.classList.toggle('auth-field-error', hasError);
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /* ---------- Live validation feedback ---------- */
  confirmField?.addEventListener('input', () => {
    setFieldError(confirmField, confirmField.value !== passwordField.value && confirmField.value.length > 0);
  });

  emailField?.addEventListener('blur', () => {
    setFieldError(emailField, emailField.value.length > 0 && !emailPattern.test(emailField.value));
  });

  passwordField?.addEventListener('input', () => {
    setFieldError(passwordField, passwordField.value.length > 0 && passwordField.value.length < 8);
  });

  /* ---------- Submit ---------- */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;

    if (!nameField.value.trim()) {
      setFieldError(nameField, true);
      valid = false;
    } else {
      setFieldError(nameField, false);
    }

    if (!emailPattern.test(emailField.value)) {
      setFieldError(emailField, true);
      valid = false;
    } else {
      setFieldError(emailField, false);
    }

    if (passwordField.value.length < 8) {
      setFieldError(passwordField, true);
      valid = false;
    } else {
      setFieldError(passwordField, false);
    }

    if (confirmField.value !== passwordField.value) {
      setFieldError(confirmField, true);
      valid = false;
    } else {
      setFieldError(confirmField, false);
    }

    if (!valid) return;

    // TODO: replace with real signup request (fetch/auth API).
    // On success, e.g.: window.location.href = 'index.html';
    console.log('Signup form valid — ready to submit:', {
      name: nameField.value.trim(),
      email: emailField.value.trim(),
    });
  });

});