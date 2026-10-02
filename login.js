// ====== SETTINGS: ask your backend teammate for these ======
const API_BASE = 'http://localhost:5000';       // backend URL
const LOGIN_URL = API_BASE + '/api/login';       // POST {email, password}
const SIGNUP_URL = API_BASE + '/api/signup';     // POST {name, email, phone, password}
const AFTER_LOGIN_PAGE = 'index.html';           // where to go after login
// ===========================================================

const $ = (id) => document.getElementById(id);
const loginForm = $('loginForm');
const signupForm = $('signupForm');
const alertBox = $('formAlert');

/* ---------- Tabs: switch between Login and Sign up ---------- */
function showForm(which) {
  const isLogin = which === 'login';
  loginForm.hidden = !isLogin;
  signupForm.hidden = isLogin;
  $('tabLogin').classList.toggle('active', isLogin);
  $('tabSignup').classList.toggle('active', !isLogin);
  $('tabLogin').setAttribute('aria-selected', isLogin);
  $('tabSignup').setAttribute('aria-selected', !isLogin);
  document.title = (isLogin ? 'Login' : 'Sign up') + ' | KarmaChakra';
  showAlert('');
}
$('tabLogin').onclick = () => showForm('login');
$('tabSignup').onclick = () => showForm('signup');
$('goSignup').onclick = (e) => { e.preventDefault(); showForm('signup'); };
$('goLogin').onclick = (e) => { e.preventDefault(); showForm('login'); };
if (location.hash === '#signup') showForm('signup');

/* ---------- Helpers ---------- */
function showAlert(msg, type = 'err') {
  alertBox.hidden = !msg;
  alertBox.textContent = msg;
  alertBox.className = 'alert ' + type;
}

function setState(input, msg) {
  const field = input.closest('.field');
  const err = field.querySelector('.error');
  field.classList.toggle('invalid', !!msg);
  field.classList.toggle('valid', !msg && input.value !== '');
  err.textContent = msg || '';
  return !msg;
}

// Show / Hide password buttons
document.querySelectorAll('.eye').forEach((btn) => {
  btn.onclick = () => {
    const input = $(btn.dataset.target);
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    btn.textContent = show ? 'Hide' : 'Show';
    btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
  };
});

/* ---------- Validation rules ---------- */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NAME_RE = /^[A-Za-z][A-Za-z .'-]{1,49}$/;
const PHONE_RE = /^[6-9]\d{9}$/;   // Indian mobile numbers

const passwordChecks = {
  len:   (p) => p.length >= 8,
  upper: (p) => /[A-Z]/.test(p),
  lower: (p) => /[a-z]/.test(p),
  num:   (p) => /\d/.test(p),
  sym:   (p) => /[^A-Za-z0-9]/.test(p),
};
const isStrongPassword = (p) => Object.values(passwordChecks).every((fn) => fn(p));

const validate = {
  email(el) {
    const v = el.value.trim();
    if (!v) return setState(el, 'Enter your email address');
    if (!EMAIL_RE.test(v)) return setState(el, 'Enter a valid email, like name@example.com');
    return setState(el);
  },
  loginPassword(el) {
    return setState(el, el.value ? '' : 'Enter your password');
  },
  name(el) {
    const v = el.value.trim();
    if (!v) return setState(el, 'Enter your full name');
    if (!NAME_RE.test(v)) return setState(el, 'Use letters only (2 to 50 characters)');
    return setState(el);
  },
  phone(el) {
    const v = el.value.trim();
    if (!v) return setState(el, 'Enter your mobile number');
    if (!PHONE_RE.test(v)) return setState(el, 'Enter a valid 10-digit number starting with 6 to 9');
    return setState(el);
  },
  signupPassword(el) {
    const v = el.value;
    if (!v) return setState(el, 'Create a password');
    if (!isStrongPassword(v)) return setState(el, 'Password does not meet all the rules below');
    return setState(el);
  },
  confirm(el) {
    if (!el.value) return setState(el, 'Re-enter your password');
    if (el.value !== $('signupPassword').value) return setState(el, 'Passwords do not match');
    return setState(el);
  },
  terms(el) {
    const field = el.closest('.field');
    field.querySelector('.error').textContent = el.checked ? '' : 'Accept the terms to continue';
    field.classList.toggle('invalid', !el.checked);
    return el.checked;
  },
};

/* ---------- Live password strength meter ---------- */
const pwd = $('signupPassword');
pwd.addEventListener('input', () => {
  const p = pwd.value;
  let score = 0;
  document.querySelectorAll('#rules li').forEach((li) => {
    const ok = passwordChecks[li.dataset.rule](p);
    li.classList.toggle('met', ok);
    if (ok) score++;
  });
  const levels = [
    ['Password strength', '0%', 'transparent'],
    ['Very weak', '20%', '#ff5a4d'],
    ['Weak', '40%', '#ff8a3d'],
    ['Fair', '60%', '#ffc94d'],
    ['Good', '80%', '#9ad46b'],
    ['Strong', '100%', '#6fcf8f'],
  ];
  const [label, width, color] = p ? levels[score] : levels[0];
  $('strengthText').textContent = label;
  $('meterBar').style.width = width;
  $('meterBar').style.background = color;
  if ($('confirm').value) validate.confirm($('confirm'));
});

// Only digits in phone box
$('phone').addEventListener('input', (e) => { e.target.value = e.target.value.replace(/\D/g, ''); });

/* ---------- Validate on blur (when user leaves a field) ---------- */
[['loginEmail', 'email'], ['loginPassword', 'loginPassword'], ['name', 'name'],
 ['signupEmail', 'email'], ['phone', 'phone'], ['signupPassword', 'signupPassword'],
 ['confirm', 'confirm']].forEach(([id, rule]) => {
  $(id).addEventListener('blur', () => validate[rule]($(id)));
});
$('terms').addEventListener('change', () => validate.terms($('terms')));

/* ---------- Send data to backend ---------- */
async function postJSON(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  let data = {};
  try { data = await res.json(); } catch (_) {}
  return { ok: res.ok, data };
}

function setLoading(btn, loading, text) {
  btn.disabled = loading;
  btn.textContent = loading ? 'Please wait...' : text;
}

/* ---------- LOGIN submit ---------- */
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const results = [validate.email($('loginEmail')), validate.loginPassword($('loginPassword'))];
  if (results.includes(false)) return;

  const btn = loginForm.querySelector('.btn');
  setLoading(btn, true);
  try {
    const { ok, data } = await postJSON(LOGIN_URL, {
      email: $('loginEmail').value.trim(),
      password: $('loginPassword').value,
    });
    if (!ok) { showAlert(data.message || 'Incorrect email or password.'); return; }

    const store = $('remember').checked ? localStorage : sessionStorage;
    if (data.token) store.setItem('token', data.token);
    store.setItem('user', JSON.stringify(data.user || { email: $('loginEmail').value.trim() }));
    showAlert('Login successful. Redirecting...', 'ok');
    setTimeout(() => (location.href = AFTER_LOGIN_PAGE), 800);
  } catch (err) {
    showAlert('Cannot reach the server. Check your connection and try again.');
  } finally {
    setLoading(btn, false, 'Login');
  }
});

/* ---------- SIGNUP submit ---------- */
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const results = [
    validate.name($('name')), validate.email($('signupEmail')), validate.phone($('phone')),
    validate.signupPassword($('signupPassword')), validate.confirm($('confirm')), validate.terms($('terms')),
  ];
  if (results.includes(false)) return;

  const btn = signupForm.querySelector('.btn');
  setLoading(btn, true);
  try {
    const { ok, data } = await postJSON(SIGNUP_URL, {
      name: $('name').value.trim(),
      email: $('signupEmail').value.trim(),
      phone: $('phone').value.trim(),
      password: $('signupPassword').value,
    });
    if (!ok) { showAlert(data.message || 'Could not create your account. Try again.'); return; }

    signupForm.reset();
    showForm('login');
    showAlert('Account created. Please login.', 'ok');
  } catch (err) {
    showAlert('Cannot reach the server. Check your connection and try again.');
  } finally {
    setLoading(btn, false, 'Create account');
  }
});

$('forgot').onclick = (e) => { e.preventDefault(); showAlert('Password reset is coming soon.', 'ok'); };