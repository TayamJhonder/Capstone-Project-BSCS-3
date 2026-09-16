/* ===== CONFIG ===== */
const NAV_CONFIG = {
  instructor: [
    { page:"dashboard", icon:"⌂", label:"Dashboard" },
    { page:"checking", icon:"▣", label:"Exam Checking" },
    { page:"subjects", icon:"▤", label:"Subjects" },
    { page:"grades", icon:"▥", label:"Grades Record" },
    { page:"studentsList", icon:"◯", label:"Students" },
    { page:"profile", icon:"◯", label:"Instructor Profile" },
    { page:"settings", icon:"⚙", label:"Profile Settings" }
  ],
  student: [
    { page:"studentDashboard", icon:"⌂", label:"Dashboard" },
    { page:"studentGrades", icon:"▥", label:"My Grades" },
    { page:"studentProfile", icon:"◯", label:"My Profile" }
  ]
};

const TITLES = {
  dashboard:["Dashboard","Welcome back, Instructor."],
  checking:["Exam Checking","Process and review a student's examination."],
  subjects:["Subjects","Manage subjects and their examinations."],
  grades:["Grades Record","View and manage automatically recorded grades."],
  studentsList:["Students","Click a student to view their profile and exam results."],
  profile:["Instructor Profile","Your account information at AI analytics."],
  settings:["Profile Settings","Update your account preferences."],
  studentDashboard:["Student Dashboard","Welcome back."],
  studentGrades:["My Grades","View all your recorded exam results."],
  studentProfile:["My Profile","View and manage your student information."]
};

const KEYS = {
  users:"examcheckUsers",
  current:"examcheckCurrentUser",
  settings:"examcheckSettings",
  studentProfile:"examcheckStudentProfile",
  studentsList:"examcheckStudentsList",
  theme:"examcheckTheme"
};

let currentRole = "instructor";

/* ===== STORAGE HELPERS ===== */
function readJSON(key, fallback){
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch (e) { return fallback; }
}
function writeJSON(key, val){ localStorage.setItem(key, JSON.stringify(val)); }

const getStoredUsers = () => readJSON(KEYS.users, []);
const saveStoredUsers = (u) => writeJSON(KEYS.users, u);
const getCurrentUser = () => readJSON(KEYS.current, null);
const setCurrentUser = (u) => writeJSON(KEYS.current, u);
const clearCurrentUser = () => localStorage.removeItem(KEYS.current);
const getStoredSettings = () => readJSON(KEYS.settings, null);
const saveStoredSettings = (s) => writeJSON(KEYS.settings, s);
const getStudentProfile = () => readJSON(KEYS.studentProfile, null);
const saveStudentProfile = (p) => writeJSON(KEYS.studentProfile, p);
const getStudentsList = () => readJSON(KEYS.studentsList, []);
const saveStudentsList = (l) => writeJSON(KEYS.studentsList, l);

/* ===== UTILS ===== */
function escapeHtml(s){
  if (s === null || s === undefined) return "";
  return String(s).replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}

function computeInitials(fullName){
  if (!fullName) return "ST";
  return fullName.trim().split(" ").map(p => p[0]).join("").slice(0,2).toUpperCase();
}

function getFullName(p){
  return [p.firstName, p.middleInitial ? p.middleInitial + "." : "", p.surname, p.suffix].filter(Boolean).join(" ");
}

function getDisplayName(user){
  if (!user) return "User";
  return user.username || user.fullName || "User";
}

/* ===== THEME TOGGLE ===== */
function applyTheme(theme){
  document.body.classList.toggle("dark", theme === "dark");
  localStorage.setItem(KEYS.theme, theme);
}

function initTheme(){
  const saved = localStorage.getItem(KEYS.theme);
  applyTheme(saved || "light");

  const btn = document.getElementById("themeToggle");
  if (btn){
    btn.addEventListener("click", () => {
      const isDark = document.body.classList.contains("dark");
      applyTheme(isDark ? "light" : "dark");
    });
  }
}

/* ===== ROLE SELECTOR ===== */
document.querySelectorAll(".role-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".role-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentRole = btn.dataset.role;
    updateLoginUI();
  });
});

function updateLoginUI(){
  document.getElementById("loginSubmitBtn").textContent = "Sign In";
  document.getElementById("loginId").placeholder = "Enter email or username";
  document.getElementById("loginError").textContent = "";
}

/* ===== NAV RENDERING ===== */
function renderNav(role){
  const nav = document.getElementById("sidebarNav");
  nav.innerHTML = NAV_CONFIG[role].map((item, i) => `
    <button class="nav-item${i === 0 ? " active" : ""}" data-page="${item.page}">
      ${item.icon} <span>${item.label}</span>
    </button>
  `).join("");

  nav.querySelectorAll(".nav-item").forEach(btn => {
    btn.addEventListener("click", () => {
      showPage(btn.dataset.page);
      closeSidebarMobile();
    });
  });

  document.getElementById("sidebarRole").textContent = role === "instructor" ? "Instructor Portal" : "Student Portal";
}

/* ===== PAGE SWITCHING ===== */
function showPage(name){
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  const target = document.getElementById(name);
  if (target) target.classList.remove("hidden");

  document.querySelectorAll(".nav-item").forEach(b => b.classList.toggle("active", b.dataset.page === name));

  const t = TITLES[name];
  if (t){
    document.getElementById("pageTitle").textContent = t[0];
    document.getElementById("pageSubtitle").textContent = t[1];
  }

  window.scrollTo({top:0,behavior:"smooth"});

  if (name === "settings") loadSettingsForm();
  if (name === "profile") loadProfilePage();
  if (name === "studentProfile") renderStudentProfile();
  if (name === "studentsList") renderStudentsTable();
  if (name === "studentDashboard") renderStudentDashboard();
  if (name === "studentGrades") renderStudentGrades();
}
window.showPage = showPage;

/* ===== USER HEADER ===== */
function updateUserHeader(user){
  const displayName = getDisplayName(user);
  const initials = computeInitials(user.fullName || displayName);

  const img = document.getElementById("topbarAvatarImg");
  const initEl = document.getElementById("topbarAvatarInitials");

  let picture = null;
  if (user && user.role === "student"){
    const profile = getStudentProfile();
    picture = profile && profile.picture;
  } else if (user && user.role === "instructor"){
    picture = user.picture || null;
  }

  if (picture){
    img.src = picture;
    img.classList.remove("hidden");
    initEl.classList.add("hidden");
  } else {
    img.classList.add("hidden");
    initEl.classList.remove("hidden");
    initEl.textContent = initials;
  }
}

/* ===== SIDEBAR ===== */
const sidebar = document.getElementById("sidebar");
const app = document.getElementById("app");

document.getElementById("burgerBtn").addEventListener("click", () => {
  if (window.innerWidth <= 850){
    sidebar.classList.toggle("open");
  } else {
    sidebar.classList.toggle("collapsed");
    app.classList.toggle("sidebar-collapsed");
  }
});

document.getElementById("mainBurgerBtn").addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

function closeSidebarMobile(){
  if (window.innerWidth <= 850){
    sidebar.classList.remove("open");
  }
}

/* ===== AUTH ===== */
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const loginIdInput = document.getElementById("loginId");
const passwordInput = document.getElementById("password");
const loginError = document.getElementById("loginError");
const signupError = document.getElementById("signupError");
const loginPanel = document.getElementById("loginPanel");
const signupPanel = document.getElementById("signupPanel");

function setAuthMode(mode){
  const isLogin = mode === "login";
  loginPanel.classList.toggle("hidden", !isLogin);
  signupPanel.classList.toggle("hidden", isLogin);
  loginError.textContent = "";
  signupError.textContent = "";
}

document.getElementById("showSignupBtn").addEventListener("click", () => setAuthMode("signup"));
document.getElementById("showLoginBtn").addEventListener("click", () => setAuthMode("login"));

/* ===== LOGIN ===== */
loginForm.addEventListener("submit", e => {
  e.preventDefault();

  const enteredId = loginIdInput.value.trim();
  const enteredPassword = passwordInput.value;

  const idValid = enteredId.length > 0;
  const passwordValid = enteredPassword.length >= 1;

  document.getElementById("loginIdError").textContent = idValid ? "" : "Enter your email or username.";
  document.getElementById("passwordError").textContent = passwordValid ? "" : "Enter your password.";
  loginError.textContent = "";

  if (!idValid || !passwordValid) return;

  const matched = getStoredUsers().find(u =>
    (u.email.toLowerCase() === enteredId.toLowerCase() ||
     (u.username && u.username.toLowerCase() === enteredId.toLowerCase())) &&
    (u.role || "instructor") === currentRole
  );

  let user;

  if (matched){
    user = {
      id: matched.id,
      fullName: matched.fullName,
      username: matched.username,
      email: matched.email,
      role: currentRole
    };
  } else {
    const fallbackUsername = enteredId.includes("@")
      ? enteredId.split("@")[0]
      : enteredId;

    user = {
      id: "guest-" + Date.now(),
      fullName: fallbackUsername,
      username: fallbackUsername,
      email: enteredId.includes("@") ? enteredId : fallbackUsername + "@school.edu",
      role: currentRole
    };
  }

  setCurrentUser(user);
  enterApp(user);
});

function enterApp(user){
  updateUserHeader(user);
  renderNav(user.role || "instructor");
  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  const firstPage = (user.role === "student") ? "studentDashboard" : "dashboard";
  showPage(firstPage);
}

/* ===== SIGN UP (PERMISSIVE — kahit anong email/username) ===== */
signupForm.addEventListener("submit", e => {
  e.preventDefault();

  const fullName = document.getElementById("signupFullName");
  const username = document.getElementById("signupUsername");
  const signupEmail = document.getElementById("signupEmail");
  const signupPassword = document.getElementById("signupPassword");
  const confirmPassword = document.getElementById("confirmPassword");

  // Minimal validation — kailangan may laman
  const nameValid = fullName.value.trim().length > 0;
  const usernameValid = username.value.trim().length > 0;
  const emailValid = signupEmail.value.trim().length > 0;
  const passwordValid = signupPassword.value.length > 0;
  const confirmValid = signupPassword.value === confirmPassword.value;

  document.getElementById("signupFullNameError").textContent = nameValid ? "" : "Enter your full name.";
  document.getElementById("signupUsernameError").textContent = usernameValid ? "" : "Enter a username.";
  document.getElementById("signupEmailError").textContent = emailValid ? "" : "Enter an email address.";
  document.getElementById("signupPasswordError").textContent = passwordValid ? "" : "Enter a password.";
  document.getElementById("confirmPasswordError").textContent = confirmValid ? "" : "Passwords do not match.";
  signupError.textContent = "";

  if (!nameValid || !usernameValid || !emailValid || !passwordValid || !confirmValid) return;

  const users = getStoredUsers();
  const emailLower = signupEmail.value.trim().toLowerCase();
  const usernameLower = username.value.trim().toLowerCase();

  // Kung existing na (same email O same username), i-update na lang
  const existingIdx = users.findIndex(u =>
    u.email.toLowerCase() === emailLower ||
    (u.username && u.username.toLowerCase() === usernameLower)
  );

  const newUser = {
    id: existingIdx >= 0 ? users[existingIdx].id : Date.now().toString(),
    fullName: fullName.value.trim(),
    username: username.value.trim(),
    email: signupEmail.value.trim(),
    password: signupPassword.value,
    role: currentRole
  };

  if (existingIdx >= 0) users[existingIdx] = newUser;
  else users.push(newUser);

  saveStoredUsers(users);

  const user = {
    id:newUser.id,
    fullName:newUser.fullName,
    username:newUser.username,
    email:newUser.email,
    role:currentRole
  };
  setCurrentUser(user);
  signupForm.reset();
  signupError.textContent = "";
  enterApp(user);
});

loginIdInput.addEventListener("input", () => {
  document.getElementById("loginIdError").textContent = "";
  loginError.textContent = "";
});

passwordInput.addEventListener("input", () => {
  document.getElementById("passwordError").textContent = "";
  loginError.textContent = "";
});

document.getElementById("gmailLoginBtn").addEventListener("click", () => {
  const demoEmail = prompt("Enter your Gmail address (demo login):", "student@gmail.com");
  if (!demoEmail) return;

  const fallbackUsername = demoEmail.split("@")[0];
  const user = {
    id: "gmail-" + Date.now(),
    fullName: fallbackUsername,
    username: fallbackUsername,
    email: demoEmail,
    role: currentRole
  };
  setCurrentUser(user);
  enterApp(user);
});

document.getElementById("logout").addEventListener("click", () => {
  clearCurrentUser();
  document.getElementById("app").classList.add("hidden");
  document.getElementById("loginScreen").classList.remove("hidden");
  loginIdInput.value = "";
  passwordInput.value = "";
  loginError.textContent = "";
  signupForm.reset();
  setAuthMode("login");
  updateLoginUI();
});

/* ===== TOPBAR AVATAR ===== */
document.getElementById("topbarAvatarInput").addEventListener("change", function(){
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = ev => {
    const user = getCurrentUser();
    if (!user) return;

    if (user.role === "student"){
      const p = getStudentProfile() || {};
      p.picture = ev.target.result;
      saveStudentProfile(p);
      syncStudentToTeacherList();
    } else {
      user.picture = ev.target.result;
      setCurrentUser(user);
    }

    updateUserHeader(user);
    renderStudentProfile();
    showToast("Profile picture updated");
  };
  reader.readAsDataURL(file);
});

document.getElementById("topbarUserPill").addEventListener("click", () => {
  document.getElementById("topbarAvatarInput").click();
});

/* ===== EXAM PHOTO ===== */
document.getElementById("examImage").addEventListener("change", function(){
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    document.getElementById("preview").src = e.target.result;
    document.getElementById("previewWrap").classList.remove("hidden");
    document.getElementById("dropZone").classList.add("hidden");
  };
  reader.readAsDataURL(file);
});

function clearPhoto(){
  document.getElementById("examImage").value = "";
  document.getElementById("previewWrap").classList.add("hidden");
  document.getElementById("dropZone").classList.remove("hidden");
}
window.clearPhoto = clearPhoto;

function processExam(){
  const file = document.getElementById("examImage").files[0];
  if (!file){ alert("Please upload an exam photo first."); return; }

  const name = document.getElementById("studentName").value.trim() || "Maria Santos";
  const btn = document.getElementById("processBtn");
  btn.disabled = true; btn.textContent = "Processing...";

  setTimeout(() => {
    document.getElementById("resultStudent").textContent = name;
    document.getElementById("resultSubject").textContent = document.getElementById("subjectSelect").value;
    document.getElementById("resultExam").textContent = document.getElementById("examSelect").value;
    document.getElementById("resultPanel").classList.remove("hidden");
    document.getElementById("resultPanel").scrollIntoView({behavior:"smooth"});
    btn.disabled = false; btn.textContent = "Process & Check Exam";
  }, 600);
}
window.processExam = processExam;

function saveGrade(){
  const name = document.getElementById("studentName").value.trim() || "Maria Santos";
  const subject = document.getElementById("subjectSelect").value;
  const exam = document.getElementById("examSelect").value;
  const row = document.createElement("tr");
  row.innerHTML = `<td>${escapeHtml(name)}</td><td>NEW-001</td><td>${escapeHtml(subject)}</td><td>${escapeHtml(exam)}</td><td>9/10</td><td><span class="badge good">90%</span></td><td>Today</td>`;
  document.getElementById("gradeRows").prepend(row);
  alert("Grade saved.");
  showPage("grades");
}
window.saveGrade = saveGrade;

/* ===== STUDENT DASHBOARD ===== */
function renderStudentDashboard(){
  const user = getCurrentUser();
  const p = getStudentProfile();
  const displayName = getDisplayName(user);

  const welcome = document.getElementById("studentWelcomeName");
  if (welcome) welcome.textContent = `Welcome, ${displayName}!`;

  const scores = (p && p.examScores) ? p.examScores : [];
  const percentages = scores.map(s => parseInt(s.percentage) || 0);
  const avg = percentages.length ? Math.round(percentages.reduce((a,b)=>a+b,0) / percentages.length) : 0;
  const highest = percentages.length ? Math.max(...percentages) : 0;

  document.getElementById("studentExamsTaken").textContent = scores.length;
  document.getElementById("studentAvgScore").textContent = avg + "%";
  document.getElementById("studentHighestScore").textContent = highest + "%";
  document.getElementById("studentSubjectCount").textContent = scores.length ? 4 : 0;

  const recent = document.getElementById("studentRecentGrades");
  if (scores.length){
    recent.innerHTML = scores.slice(0,3).map(s => `
      <tr>
        <td>${escapeHtml(s.subject)}</td>
        <td>${escapeHtml(s.exam)}</td>
        <td><span class="badge ${parseInt(s.percentage) >= 85 ? "good" : "average"}">${escapeHtml(s.percentage)}</span></td>
      </tr>
    `).join("");
  } else {
    recent.innerHTML = `<tr><td colspan="3" class="empty-row">No exams taken yet.</td></tr>`;
  }
}

/* ===== STUDENT GRADES ===== */
function renderStudentGrades(){
  const p = getStudentProfile();
  const scores = (p && p.examScores) ? p.examScores : [];

  const tbody = document.getElementById("studentGradeRows");
  if (scores.length){
    tbody.innerHTML = scores.map(s => `
      <tr>
        <td>${escapeHtml(s.subject)}</td>
        <td>${escapeHtml(s.exam)}</td>
        <td>${escapeHtml(s.score)}</td>
        <td><span class="badge ${parseInt(s.percentage) >= 85 ? "good" : "average"}">${escapeHtml(s.percentage)}</span></td>
        <td>${escapeHtml(s.date)}</td>
      </tr>
    `).join("");
  } else {
    tbody.innerHTML = `<tr><td colspan="5" class="empty-row">No exam results yet.</td></tr>`;
  }
}

/* ===== STUDENT PROFILE ===== */
function renderStudentProfile(){
  const p = getStudentProfile();
  if (!p) return;

  const fullName = getFullName(p);
  const el = id => document.getElementById(id);

  if (el("studentFullName")) el("studentFullName").textContent = fullName || "Student Name";
  if (el("studentCourseYear")) el("studentCourseYear").textContent = `${p.course || "—"} • ${p.yearLevel || "—"}`;
  if (el("studentIdDisplay")) el("studentIdDisplay").textContent = p.idNumber || "—";
  if (el("studentCourseDisplay")) el("studentCourseDisplay").textContent = p.course || "—";
  if (el("studentYearDisplay")) el("studentYearDisplay").textContent = p.yearLevel || "—";

  if (el("editSurname")) el("editSurname").value = p.surname || "";
  if (el("editFirstName")) el("editFirstName").value = p.firstName || "";
  if (el("editMiddleInitial")) el("editMiddleInitial").value = p.middleInitial || "";
  if (el("editSuffix")) el("editSuffix").value = p.suffix || "";
  if (el("editCourse")) el("editCourse").value = p.course || "";
  if (el("editYearLevel")) el("editYearLevel").value = p.yearLevel || "1st Year";
  if (el("editIdNumber")) el("editIdNumber").value = p.idNumber || "";
  if (el("editSchoolYear")) el("editSchoolYear").value = p.schoolYear || "2026-2027";
}

function toggleStudentEdit(show){
  const view = document.getElementById("studentProfileView");
  const form = document.getElementById("studentEditForm");
  const btn = document.getElementById("editProfileBtn");
  if (!view || !form || !btn) return;
  view.classList.toggle("hidden", show);
  form.classList.toggle("hidden", !show);
  btn.classList.toggle("hidden", show);
}

/* ===== TEACHER: SYNC + LIST ===== */
function syncStudentToTeacherList(){
  const p = getStudentProfile();
  if (!p) return;
  const fullName = getFullName(p);
  const list = getStudentsList();
  const idx = list.findIndex(s => s.idNumber === p.idNumber);
  const record = {
    ...p,
    fullName,
    examScores: (idx >= 0 && list[idx].examScores) ? list[idx].examScores : []
  };
  if (idx >= 0) list[idx] = record;
  else list.push(record);
  saveStudentsList(list);
}

function renderStudentsTable(filter = ""){
  const tbody = document.getElementById("studentsTableBody");
  if (!tbody) return;
  const f = filter.toLowerCase();
  const list = getStudentsList().filter(s =>
    (s.fullName || "").toLowerCase().includes(f) ||
    (s.idNumber || "").toLowerCase().includes(f)
  );

  tbody.innerHTML = list.length ? list.map((s, i) => `
    <tr>
      <td>${escapeHtml(s.fullName)}</td>
      <td>${escapeHtml(s.idNumber || "—")}</td>
      <td>${escapeHtml(s.course || "—")}</td>
      <td>${escapeHtml(s.yearLevel || "—")}</td>
      <td>${s.examScores && s.examScores[0] ? escapeHtml(s.examScores[0].percentage) : "—"}</td>
      <td><button class="text-btn" data-student-idx="${i}">View</button></td>
    </tr>
  `).join("") : `<tr><td colspan="6" class="empty-row">No students yet.</td></tr>`;
}

function openStudentModal(s){
  if (!s) return;
  const initials = computeInitials(s.fullName);
  const avatar = document.getElementById("modalAvatar");
  if (s.picture) avatar.innerHTML = `<img src="${s.picture}" alt="">`;
  else avatar.textContent = initials;

  const el = id => document.getElementById(id);
  el("modalName").textContent = s.fullName;
  el("modalCourseYear").textContent = `${s.course || "—"} • ${s.yearLevel || "—"}`;
  el("modalId").textContent = s.idNumber || "—";
  el("modalSurname").textContent = s.surname || "—";
  el("modalFirstName").textContent = s.firstName || "—";
  el("modalMI").textContent = s.middleInitial || "—";
  el("modalSuffix").textContent = s.suffix || "—";
  el("modalCourse").textContent = s.course || "—";
  el("modalYear").textContent = s.yearLevel || "—";
  el("modalSY").textContent = s.schoolYear || "2026-2027";

  const rows = document.getElementById("modalExamRows");
  const scores = s.examScores || [];
  rows.innerHTML = scores.length ? scores.map(sc => `
    <tr>
      <td>${escapeHtml(sc.subject)}</td>
      <td>${escapeHtml(sc.exam)}</td>
      <td>${escapeHtml(sc.score)}</td>
      <td><span class="badge ${parseInt(sc.percentage) >= 85 ? "good" : "average"}">${escapeHtml(sc.percentage)}</span></td>
      <td>${escapeHtml(sc.date)}</td>
    </tr>
  `).join("") : `<tr><td colspan="5" class="empty-row">No exam results yet.</td></tr>`;

  document.getElementById("studentModal").classList.remove("hidden");
}

/* ===== TOAST ===== */
function showToast(msg){
  const toast = document.createElement("div");
  toast.textContent = msg;
  toast.style.cssText = `
    position:fixed;bottom:30px;left:50%;transform:translateX(-50%);
    background:#101827;color:white;padding:12px 22px;border-radius:30px;
    font-size:13px;font-weight:600;z-index:200;box-shadow:0 10px 30px rgba(0,0,0,0.25);
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2200);
}

/* ===== EVENT DELEGATION ===== */
document.addEventListener("click", e => {
  if (e.target.id === "editProfileBtn") toggleStudentEdit(true);
  if (e.target.id === "cancelStudentEditBtn") toggleStudentEdit(false);

  if (e.target.id === "saveStudentProfileBtn"){
    const profile = {
      surname: document.getElementById("editSurname").value.trim(),
      firstName: document.getElementById("editFirstName").value.trim(),
      middleInitial: document.getElementById("editMiddleInitial").value.trim(),
      suffix: document.getElementById("editSuffix").value.trim(),
      course: document.getElementById("editCourse").value.trim(),
      yearLevel: document.getElementById("editYearLevel").value,
      idNumber: document.getElementById("editIdNumber").value.trim(),
      schoolYear: document.getElementById("editSchoolYear").value.trim() || "2026-2027",
      school: "Computer Communication Development Institute",
      location: "Sorsogon City",
      picture: (getStudentProfile() || {}).picture || null,
      examScores: (getStudentProfile() || {}).examScores || []
    };

    const msg = document.getElementById("studentSaveMsg");

    if (!profile.surname || !profile.firstName){
      msg.style.color = "#c33b3b";
      msg.textContent = "Surname and First Name are required.";
      return;
    }

    saveStudentProfile(profile);
    syncStudentToTeacherList();
    renderStudentProfile();
    toggleStudentEdit(false);
    msg.style.color = "#14834e";
    msg.textContent = "Saved successfully.";
    showToast("Student profile saved");
    setTimeout(() => msg.textContent = "", 2500);
  }

  const btn = e.target.closest("[data-student-idx]");
  if (btn){
    const idx = parseInt(btn.dataset.studentIdx, 10);
    openStudentModal(getStudentsList()[idx]);
  }

  if (e.target.id === "closeStudentModal") document.getElementById("studentModal").classList.add("hidden");
  if (e.target.id === "studentModal") document.getElementById("studentModal").classList.add("hidden");
});

document.addEventListener("input", e => {
  if (e.target.id === "studentSearch") renderStudentsTable(e.target.value);

  if (e.target && e.target.type === "password"){
    const wrap = e.target.parentElement;
    wrap.classList.add("password-typing", "typing");
    clearTimeout(wrap._typingTimer);
    wrap._typingTimer = setTimeout(() => wrap.classList.remove("typing"), 800);
  }
});

/* ===== INSTRUCTOR SETTINGS ===== */
function loadSettingsForm(){
  const nameInput = document.getElementById("settingsFullName");
  if (!nameInput) return;

  const user = getCurrentUser();
  const settings = getStoredSettings();

  if (settings){
    document.getElementById("settingsFullName").value = settings.fullName || "";
    document.getElementById("settingsEmail").value = settings.email || "";
    document.getElementById("settingsContact").value = settings.contact || "";
    document.getElementById("settingsUsername").value = settings.username || "";
    document.getElementById("settingsEmployeeId").value = settings.employeeId || "";
    document.getElementById("settingsAccountRole").value = settings.accountRole || "Instructor";
    document.getElementById("settingsDepartment").value = settings.department || "";
    document.getElementById("settingsCourse").value = settings.course || "";
    document.getElementById("settingsSection").value = settings.section || "";
    document.getElementById("settingsLMS").value = settings.lms || "";
    document.getElementById("settingsAIStrictness").value = settings.aiStrictness || "balanced";
    document.getElementById("settingsNotification").value = settings.notification || "all";
  } else {
    document.getElementById("settingsFullName").value = (user && user.fullName) || "Juan Dela Cruz";
    document.getElementById("settingsEmail").value = (user && user.email) || "juan.delacruz@school.edu";
    document.getElementById("settingsContact").value = "";
    document.getElementById("settingsUsername").value = (user && user.username) || "instructor";
    document.getElementById("settingsEmployeeId").value = "INS-2026-014";
    document.getElementById("settingsAccountRole").value = "Instructor";
    document.getElementById("settingsDepartment").value = "Information Technology";
    document.getElementById("settingsCourse").value = "BS Computer Science";
    document.getElementById("settingsSection").value = "";
    document.getElementById("settingsLMS").value = "";
    document.getElementById("settingsAIStrictness").value = "balanced";
    document.getElementById("settingsNotification").value = "all";
  }

  document.getElementById("settingsFullNameError").textContent = "";
  document.getElementById("settingsEmailError").textContent = "";
  document.getElementById("settingsSavedMsg").textContent = "";
}

function saveSettings(){
  const nameInput = document.getElementById("settingsFullName");
  const emailInput2 = document.getElementById("settingsEmail");
  const nameError = document.getElementById("settingsFullNameError");
  const emailError = document.getElementById("settingsEmailError");
  const savedMsg = document.getElementById("settingsSavedMsg");

  const nameValid = nameInput.value.trim().length > 0;
  const emailValid = emailInput2.checkValidity();

  nameError.textContent = nameValid ? "" : "Enter your full name.";
  emailError.textContent = emailValid ? "" : "Enter a valid email address.";
  savedMsg.textContent = "";

  if (!nameValid || !emailValid) return;

  const settings = {
    fullName: nameInput.value.trim(),
    email: emailInput2.value.trim(),
    contact: document.getElementById("settingsContact").value.trim(),
    username: document.getElementById("settingsUsername").value.trim(),
    employeeId: document.getElementById("settingsEmployeeId").value.trim(),
    accountRole: document.getElementById("settingsAccountRole").value,
    department: document.getElementById("settingsDepartment").value.trim(),
    course: document.getElementById("settingsCourse").value.trim(),
    section: document.getElementById("settingsSection").value.trim(),
    lms: document.getElementById("settingsLMS").value.trim(),
    aiStrictness: document.getElementById("settingsAIStrictness").value,
    notification: document.getElementById("settingsNotification").value
  };

  saveStoredSettings(settings);

  const user = getCurrentUser() || {id:"local", fullName:settings.fullName, email:settings.email, role:"instructor"};
  user.fullName = settings.fullName;
  user.email = settings.email;
  user.username = settings.username;
  setCurrentUser(user);
  updateUserHeader(user);

  savedMsg.textContent = "Settings saved successfully.";
  setTimeout(() => { savedMsg.textContent = ""; }, 2500);
}

function loadProfilePage(){
  const settings = getStoredSettings();
  if (!settings) return;

  const el = id => document.getElementById(id);

  if (el("profileName")) el("profileName").textContent = settings.fullName;
  if (el("profileEmail")) el("profileEmail").innerHTML = `<b>Email</b> ${escapeHtml(settings.email)}`;
  if (el("profileEmployeeId")) el("profileEmployeeId").innerHTML = `<b>Employee ID</b> ${escapeHtml(settings.employeeId || "—")}`;
  if (el("profileDepartment")) el("profileDepartment").innerHTML = `<b>Department</b> ${escapeHtml(settings.department || "—")}`;
}

/* ===== INIT ===== */
document.addEventListener("DOMContentLoaded", () => {
  updateLoginUI();
  initTheme();

  const btn = document.getElementById("saveSettingsBtn");
  if (btn) btn.addEventListener("click", saveSettings);

  if (!getStudentProfile()){
    saveStudentProfile({
      surname: "Dela Cruz",
      firstName: "Juan",
      middleInitial: "M",
      suffix: "",
      course: "BS Computer Science",
      yearLevel: "3rd Year",
      idNumber: "2026-001",
      schoolYear: "2026-2027",
      school: "Computer Communication Development Institute",
      location: "Sorsogon City",
      picture: null,
      examScores: []
    });
    syncStudentToTeacherList();
  }

  const user = getCurrentUser();
  if (user && user.role){
    updateUserHeader(user);
    renderNav(user.role);
    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    showPage(user.role === "student" ? "studentDashboard" : "dashboard");
  }
});