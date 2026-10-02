// ====== SETTINGS ======
const PROFILE_API = '';            // later: 'http://localhost:5000/api/profile'  (empty = demo data)
const REQUIRE_LOGIN = false;       // set true when backend login works (sends visitors to login.html)
// ======================

const $ = (id) => document.getElementById(id);

/* ---------- Demo data (later this comes from your backend) ---------- */
let data = {
  name: '', email: '', phone: '', bio: '',
  level: 7, levelTitle: 'Karma Yogi',
  mudra: 4820, nextLevelAt: 6000, prevLevelAt: 4000,
  verified: 38, streak: 12, rank: 24,
  domains: [
    { name: 'Prakriti Karma', icon: '🌱', pts: 1250, goal: 2000 },
    { name: 'Seva Karma',     icon: '🤝', pts: 980,  goal: 2000 },
    { name: 'Jeeva Karma',    icon: '🐾', pts: 720,  goal: 2000 },
    { name: 'Samaj Karma',    icon: '🏛️', pts: 640,  goal: 2000 },
    { name: 'Arogya Karma',   icon: '❤️', pts: 780,  goal: 2000 },
    { name: 'Vidya Karma',    icon: '📚', pts: 450,  goal: 2000 },
  ],
  activity: [
    { icon: '🌱', title: 'Tree Plantation Drive', when: '2 days ago', pts: 100 },
    { icon: '🐾', title: 'Street Animal Care',    when: '4 days ago', pts: 90 },
    { icon: '🤝', title: 'Food Donation',         when: '1 week ago', pts: 80 },
    { icon: '📚', title: 'Teaching Session',      when: '1 week ago', pts: 70 },
    { icon: '🛡️', title: 'Community Safety Watch', when: '2 weeks ago', pts: 110 },
  ],
  badges: [
    { icon: '🌱', name: 'First Sapling',   note: 'Plant your first tree', earned: true },
    { icon: '🔥', name: '7-Day Streak',    note: 'Do good 7 days in a row', earned: true },
    { icon: '🤝', name: 'Helping Hand',    note: '10 Seva deeds', earned: true },
    { icon: '🐾', name: 'Animal Friend',   note: '10 Jeeva deeds', earned: true },
    { icon: '🏆', name: 'Top 25',          note: 'Reach top 25 on the leaderboard', earned: true },
    { icon: '📚', name: 'Gyan Daan',       note: '10 Vidya deeds', earned: false },
    { icon: '🌳', name: 'Forest Maker',    note: 'Plant 50 trees', earned: false },
    { icon: '💎', name: 'Karma Master',    note: 'Reach Level 10', earned: false },
  ],
};

/* ---------- Saved login info + saved edits ---------- */
function readStore(key) {
  try { return JSON.parse(localStorage.getItem(key) || sessionStorage.getItem(key) || 'null'); } catch (_) { return null; }
}
const loginUser = readStore('user') || {};
const savedEdits = readStore('profileEdits') || {};
data.name  = savedEdits.name  || loginUser.name  || 'KarmaChakra Member';
data.email = savedEdits.email || loginUser.email || '';
data.phone = savedEdits.phone || loginUser.phone || '';
data.bio   = savedEdits.bio   || 'Doing one good deed at a time.';

const token = localStorage.getItem('token') || sessionStorage.getItem('token');
if (REQUIRE_LOGIN && !token) location.href = 'login.html';
if (token) $('navAuth').textContent = 'Logout';

/* ---------- Toast message ---------- */
let toastTimer;
function toast(msg) {
  const t = $('toast');
  t.textContent = msg; t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (t.hidden = true), 2600);
}

/* ---------- Count-up number effect ---------- */
function countUp(el, to, prefix = '') {
  const start = performance.now(), dur = 1100;
  (function step(now) {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = prefix + Math.round(to * (1 - Math.pow(1 - p, 3))).toLocaleString('en-IN');
    if (p < 1) requestAnimationFrame(step);
  })(start);
}

/* ---------- Draw everything on the page ---------- */
function render() {
  $('pName').textContent = data.name;
  $('pBio').textContent = data.bio;
  $('pLevel').textContent = `${data.levelTitle}, Level ${data.level}`;
  $('avatarInitial').textContent = (data.name.trim()[0] || 'K').toUpperCase();

  // Mudra + level progress
  const pct = Math.min(100, Math.round(((data.mudra - data.prevLevelAt) / (data.nextLevelAt - data.prevLevelAt)) * 100));
  countUp($('mudraTotal'), data.mudra);
  $('levelNote').textContent = `${(data.nextLevelAt - data.mudra).toLocaleString('en-IN')} Mudrā to Level ${data.level + 1}`;
  requestAnimationFrame(() => {
    $('levelBar').style.width = pct + '%';
    $('ringFill').style.strokeDashoffset = 339.3 * (1 - pct / 100);
  });

  // Stats
  countUp(document.querySelector('[data-stat=verified]'), data.verified);
  countUp(document.querySelector('[data-stat=streak]'), data.streak);
  countUp(document.querySelector('[data-stat=badges]'), data.badges.filter((b) => b.earned).length);
  countUp(document.querySelector('[data-stat=rank]'), data.rank, '#');

  // Six karmas
  $('domains').innerHTML = data.domains.map((d) => `
    <div class="dom">
      <div class="dom-top"><span>${d.icon} ${d.name}</span><span>${d.pts.toLocaleString('en-IN')} Mudrā</span></div>
      <div class="dom-bar"><i data-w="${Math.min(100, Math.round((d.pts / d.goal) * 100))}"></i></div>
    </div>`).join('');
  requestAnimationFrame(() => document.querySelectorAll('.dom-bar i').forEach((i) => (i.style.width = i.dataset.w + '%')));

  // Activity
  $('activity').innerHTML = data.activity.length
    ? data.activity.map((a) => `
      <li><div class="act-ico">${a.icon}</div>
        <div class="act-info">${a.title}<small>${a.when}</small></div>
        <div class="act-pts">+${a.pts} Mudrā</div></li>`).join('')
    : '<li>No karma yet. Pick a karma from the home page and start your journey.</li>';

  // Badges
  $('badges').innerHTML = data.badges.map((b) => `
    <div class="badge-item ${b.earned ? '' : 'locked'}">
      <span class="ico">${b.icon}</span><b>${b.name}</b><small>${b.note}</small>
    </div>`).join('');
}

/* ---------- Profile photo (saved in this browser) ---------- */
function showPhoto(src) {
  $('avatar').style.backgroundImage = `url('${src}')`;
  $('avatar').classList.add('has-photo');
}
const savedPhoto = localStorage.getItem('profilePhoto');
if (savedPhoto) showPhoto(savedPhoto);

$('photoInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) { toast('Please choose an image file.'); return; }
  if (file.size > 2 * 1024 * 1024) { toast('Image must be smaller than 2 MB.'); return; }
  const reader = new FileReader();
  reader.onload = () => {
    showPhoto(reader.result);
    try { localStorage.setItem('profilePhoto', reader.result); } catch (_) {}
    toast('Photo updated.');
  };
  reader.readAsDataURL(file);
});

/* ---------- Edit profile popup ---------- */
const dlg = $('editDialog');
const fields = { name: $('fName'), email: $('fEmail'), phone: $('fPhone'), bio: $('fBio') };

function setErr(input, msg) {
  const f = input.closest('.field');
  f.classList.toggle('invalid', !!msg);
  f.querySelector('.error').textContent = msg || '';
  return !msg;
}
const check = {
  name:  () => setErr(fields.name,  /^[A-Za-z][A-Za-z .'-]{1,49}$/.test(fields.name.value.trim()) ? '' : 'Use letters only (2 to 50 characters)'),
  email: () => setErr(fields.email, /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.value.trim()) ? '' : 'Enter a valid email'),
  phone: () => setErr(fields.phone, fields.phone.value === '' || /^[6-9]\d{9}$/.test(fields.phone.value) ? '' : 'Enter a valid 10-digit number'),
};

$('editBtn').onclick = () => {
  fields.name.value = data.name; fields.email.value = data.email;
  fields.phone.value = data.phone; fields.bio.value = data.bio;
  $('bioCount').textContent = `${data.bio.length}/120`;
  Object.keys(check).forEach((k) => setErr(fields[k], ''));
  dlg.showModal();
};
$('cancelBtn').onclick = () => dlg.close();
dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });   // click outside closes
fields.bio.addEventListener('input', () => ($('bioCount').textContent = `${fields.bio.value.length}/120`));
fields.phone.addEventListener('input', (e) => (e.target.value = e.target.value.replace(/\D/g, '')));
['name', 'email', 'phone'].forEach((k) => fields[k].addEventListener('blur', check[k]));

$('editForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  if ([check.name(), check.email(), check.phone()].includes(false)) return;

  data.name = fields.name.value.trim();
  data.email = fields.email.value.trim();
  data.phone = fields.phone.value.trim();
  data.bio = fields.bio.value.trim() || 'Doing one good deed at a time.';

  // Save in this browser (works without backend)
  localStorage.setItem('profileEdits', JSON.stringify({ name: data.name, email: data.email, phone: data.phone, bio: data.bio }));

  // LATER: also send to backend
  if (PROFILE_API) {
    try {
      await fetch(PROFILE_API, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        body: JSON.stringify({ name: data.name, email: data.email, phone: data.phone, bio: data.bio }),
      });
    } catch (_) { toast('Saved here, but the server could not be reached.'); }
  }

  $('pName').textContent = data.name;
  $('pBio').textContent = data.bio;
  $('avatarInitial').textContent = data.name[0].toUpperCase();
  dlg.close();
  toast('Profile updated.');
});

/* ---------- Logout ---------- */
function logout() {
  ['token', 'user'].forEach((k) => { localStorage.removeItem(k); sessionStorage.removeItem(k); });
  location.href = 'login.html';
}
$('logoutBtn').onclick = logout;
$('navAuth').addEventListener('click', (e) => { if (token) { e.preventDefault(); logout(); } });

/* ---------- Start ---------- */
(async function init() {
  if (PROFILE_API && token) {
    try {
      const res = await fetch(PROFILE_API, { headers: { Authorization: 'Bearer ' + token } });
      if (res.ok) data = { ...data, ...(await res.json()) };   // backend fields override demo data
    } catch (_) { /* keep demo data */ }
  }
  render();
})();