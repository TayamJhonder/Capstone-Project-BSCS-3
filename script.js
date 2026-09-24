/* ===== CONFIG ===== */
const NAV_CONFIG = {
  instructor: [
    { page:"dashboard", label:"Dashboard" },
    { page:"checking", label:"Upload Exam Paper" },
    { page:"quizManager", label:"Quiz Manager" },
    { page:"subjects", label:"Subjects" },
    { page:"grades", label:"Grades Record" },
    { page:"studentsList", label:"Students" },
    { page:"analytics", label:"Analytics" },
    { page:"examHistory", label:"Exam History" },
    { page:"security", label:"Security & Integrity" },
    { page:"integrations", label:"Integrations" },
    { page:"questionBank", label:"Question Bank" },
    { page:"reports", label:"Reports" },
    { page:"feedback", label:"Feedback & Team" },
    { page:"profile", label:"Instructor Profile" },
    { page:"settings", label:"Profile Settings" }
  ],
  student: [
    { page:"studentDashboard" , label:"Dashboard" },
    { page:"studentUpload", label:"Upload Exam Paper" },
    { page:"studentQuizzes", label:"My Quizzes" },
    { page:"studentGrades", label:"My Grades" },
    { page:"studentPerformance", label:"My Performance" },
    { page:"studentExams", label:"My Exams" },
    { page:"feedback", label:"Feedback & Team" },
    { page:"studentProfile", label:"My Profile" }
  ]
};

const TITLES = {
  dashboard:["Dashboard","Welcome back, Instructor."],
  checking:["Exam Checking","Set up the answer key for this exam."],
  quizManager:["Quiz Manager","Create quizzes and set items for your students."],
  subjects:["Subjects","Manage subjects and their examinations."],
  grades:["Grades Record","View and manage automatically recorded grades."],
  studentsList:["Students","Click a student to view their profile and exam results."],
  analytics:["AI Performance Analytics","Grade trends, skill mastery, and predictive analytics."],
  examHistory:["Exam History & Repository","Completed exams logs and automated feedback."],
  security:["AI Security & Integrity","Proctoring logs, biometric profiles, and browser lock history."],
  integrations:["Integrations","LMS connections: Canvas, Moodle, Google Classroom."],
  questionBank:["Question Bank","AI-generated questions and test questionnaires."],
  reports:["Reports","Exportable reports and analytics summaries."],
  profile:["Instructor Profile","Your account information."],
  settings:["Profile Settings","Update your account preferences."],
  studentDashboard:["Student Dashboard","Welcome back."],
  studentUpload:["Upload Your Exam Paper Here","Take a clear photo and let AI check it."],
  studentQuizzes:["My Quizzes","Quizzes created by your instructors."],
  studentGrades:["My Grades","View all your recorded exam results."],
  studentPerformance:["My Performance","AI analysis of your progress."],
  studentExams:["My Exams & Subjects","All your completed exams and enrolled subjects."],
  studentProfile:["My Profile","View and manage your student information."],
  feedback:["Feedback & Team","Share your thoughts and meet the developers."]
};

const KEYS = {
  users:"examcheckUsers",
  current:"examcheckCurrentUser",
  settings:"examcheckSettings",
  studentProfile:"examcheckStudentProfile",
  studentsList:"examcheckStudentsList",
  answerKey:"examcheckAnswerKey",
  answerKeyType:"examcheckAnswerKeyType",
  answerKeyData:"examcheckAnswerKeyData",
  mixedItemTypes:"examcheckMixedItemTypes",
  passingScore:"examcheckPassingScore",
  totalItems:"examcheckTotalItems",
  instructorGrades:"examcheckInstructorGrades",
  instructorSubjects:"examcheckInstructorSubjects",
  quizzes:"examcheckQuizzes",
  quizAttempts:"examcheckQuizAttempts"
};

let currentRole = "instructor";

const EXAM_TYPES = ["Prelim", "Midterm", "Pre-final", "Final"];

const ANSWER_KEY_TYPES = {
  multipleChoice: "Multiple Choice",
  identification: "Identification",
  image: "Image",
  mixed: "Mixed"
};

const RANDOM_QUOTES = [
  "You did great, but you need to improve!",
  "Every mistake is a step closer to mastery.",
  "Progress, not perfection — keep going!",
  "You're building something great. Keep pushing.",
  "Small consistent efforts lead to big results.",
  "The expert in anything was once a beginner.",
  "Fall seven times, stand up eight.",
  "Your potential is greater than your current score.",
  "Learning is a marathon, not a sprint.",
  "Every exam is a chance to grow stronger.",
  "Don't compare your chapter 1 to someone else's chapter 20.",
  "Focus on progress, not on the grade.",
  "You are capable of amazing things.",
  "Success is the sum of small efforts repeated.",
  "Believe in yourself — you've come this far.",
  "Mistakes are proof that you are trying.",
  "Push yourself, because no one else is going to do it for you.",
  "The pain you feel today is the strength you feel tomorrow.",
  "Champions keep playing until they get it right.",
  "Study while others are sleeping; work while others are loafing.",
  "You don't have to be great to start, but you have to start to be great.",
  "The secret of getting ahead is getting started.",
  "It always seems impossible until it's done.",
  "Don't watch the clock; do what it does — keep going.",
  "The future belongs to those who prepare for it today.",
  "Learning never exhausts the mind; it only ignites it.",
  "Success doesn't come to you — you go to it.",
  "You are one exam away from a breakthrough.",
  "Your only limit is your mind.",
  "Great things never came from comfort zones.",
  "Work hard in silence; let your success be your noise.",
  "Dream big. Start small. Act now.",
  "The difference between ordinary and extraordinary is a little extra.",
  "Consistency is what transforms average into excellence.",
  "Study smarter, not just harder.",
  "You're not failing — you're learning what doesn't work yet.",
  "Embrace the challenge; it's making you stronger.",
  "Focus on the step in front of you, not the whole staircase.",
  "Believe you can, and you're halfway there.",
  "Your effort today is your success tomorrow."
];

const DEFAULT_SUBJECTS = [
  { id:"s1", code:"CS101", name:"Programming 1", instructor:"Prof. Juan Dela Cruz", schedule:"MWF 8:00-9:00 AM", units:"3" },
  { id:"s2", code:"IT204", name:"Database Systems", instructor:"Prof. Maria Santos", schedule:"TTh 9:30-11:00 AM", units:"3" },
  { id:"s3", code:"IT301", name:"Web Development", instructor:"Prof. Carlo Reyes", schedule:"MWF 1:00-2:00 PM", units:"3" },
  { id:"s4", code:"IT305", name:"Computer Networks", instructor:"Prof. Anna Cruz", schedule:"TTh 1:00-2:30 PM", units:"3" },
  { id:"s5", code:"GE101", name:"Understanding the Self", instructor:"Prof. Liza Ramos", schedule:"MW 3:00-4:30 PM", units:"3" },
  { id:"s6", code:"GE102", name:"Mathematics in the Modern World", instructor:"Prof. Mark Bautista", schedule:"TTh 3:00-4:30 PM", units:"3" },
  { id:"s7", code:"PE101", name:"Physical Education 1", instructor:"Coach Rico Villa", schedule:"Sat 8:00-10:00 AM", units:"2" },
  { id:"s8", code:"NSTP1", name:"National Service Training Program 1", instructor:"Prof. Grace Lim", schedule:"Sat 10:00-12:00 PM", units:"3" }
];

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

const getAnswerKey = () => readJSON(KEYS.answerKey, []);
const saveAnswerKey = (k) => writeJSON(KEYS.answerKey, k);

const getAnswerKeyType = () => readJSON(KEYS.answerKeyType, "multipleChoice");
const saveAnswerKeyType = (t) => writeJSON(KEYS.answerKeyType, t);
const getAnswerKeyData = () => readJSON(KEYS.answerKeyData, []);
const saveAnswerKeyData = (d) => writeJSON(KEYS.answerKeyData, d);

const getMixedItemTypes = () => readJSON(KEYS.mixedItemTypes, []);
const saveMixedItemTypes = (t) => writeJSON(KEYS.mixedItemTypes, t);

const getPassingScore = () => readJSON(KEYS.passingScore, 30);
const savePassingScore = (n) => writeJSON(KEYS.passingScore, n);
const getTotalItems = () => readJSON(KEYS.totalItems, 40);
const saveTotalItems = (n) => writeJSON(KEYS.totalItems, n);

const getInstructorGrades = () => readJSON(KEYS.instructorGrades, []);
const saveInstructorGrades = (g) => writeJSON(KEYS.instructorGrades, g);

const getInstructorSubjects = () => readJSON(KEYS.instructorSubjects, []);
const saveInstructorSubjects = (s) => writeJSON(KEYS.instructorSubjects, s);

function getInstructorStats(){
  const grades = getInstructorGrades();
  const subjects = getInstructorSubjects();
  const uniqueStudents = new Set(grades.map(g => g.studentId).filter(Boolean));
  const avg = grades.length
    ? Math.round(grades.reduce((sum, g) => sum + (parseFloat(g.percentage) || 0), 0) / grades.length)
    : 0;
  return {
    totalSubjects: subjects.length,
    examsChecked: grades.length,
    studentsGraded: uniqueStudents.size,
    averageScore: avg
  };
}

const getQuizzes = () => readJSON(KEYS.quizzes, []);
const saveQuizzes = (q) => writeJSON(KEYS.quizzes, q);
const getQuizAttempts = () => readJSON(KEYS.quizAttempts, []);
const saveQuizAttempts = (a) => writeJSON(KEYS.quizAttempts, a);

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

function randomQuote(){
  return RANDOM_QUOTES[Math.floor(Math.random() * RANDOM_QUOTES.length)];
}

function formatDate(dateStr){
  if (!dateStr) return "—";
  const d = new Date(dateStr + "T00:00:00");
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" });
}

function getStudentSubjects(){
  const p = getStudentProfile() || {};
  if (!p.subjects || !Array.isArray(p.subjects) || p.subjects.length === 0){
    p.subjects = JSON.parse(JSON.stringify(DEFAULT_SUBJECTS));
    saveStudentProfile(p);
  }
  return p.subjects;
}

function saveStudentSubjects(subjects){
  const p = getStudentProfile() || {};
  p.subjects = subjects;
  saveStudentProfile(p);
}

function populateSubjectDropdowns(){
  const instructorSubjects = getInstructorSubjects();
  const studentSubjects = getStudentSubjects();

  const studentSel = document.getElementById("studentSubjectSelect");
  if (studentSel){
    studentSel.innerHTML = studentSubjects.length
      ? studentSubjects.map(s => `<option value="${escapeHtml(s.name)}">${escapeHtml(s.code)} — ${escapeHtml(s.name)}</option>`).join("")
      : `<option value="">No subjects available</option>`;
  }

  const instructorSel = document.getElementById("subjectSelect");
  if (instructorSel){
    instructorSel.innerHTML = instructorSubjects.length
      ? instructorSubjects.map(s => `<option value="${escapeHtml(s.name)}">${escapeHtml(s.code)} — ${escapeHtml(s.name)}</option>`).join("")
      : `<option value="">No subjects yet — click + Add</option>`;
  }

  const quizSubjSel = document.getElementById("quizSubjectInput");
  if (quizSubjSel){
    quizSubjSel.innerHTML = instructorSubjects.length
      ? instructorSubjects.map(s => `<option value="${escapeHtml(s.name)}">${escapeHtml(s.code)} — ${escapeHtml(s.name)}</option>`).join("")
      : `<option value="">No subjects available</option>`;
  }
}

function populateExamDropdowns(){
  const options = EXAM_TYPES.map(t => `<option value="${t}">${t}</option>`).join("");
  const studentExam = document.getElementById("studentExamSelect");
  if (studentExam) studentExam.innerHTML = options;
  const instructorExam = document.getElementById("examSelect");
  if (instructorExam) instructorExam.innerHTML = options;
}

document.querySelectorAll(".role-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".role-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentRole = btn.dataset.role;
    updateLoginUI();
  });
});

function updateLoginUI(){
  const submit = document.getElementById("loginSubmitBtn");
  if (submit) submit.textContent = "Sign In";
  const idInput = document.getElementById("loginId");
  if (idInput) idInput.placeholder = "Enter email or username";
  const err = document.getElementById("loginError");
  if (err) err.textContent = "";
  const succ = document.getElementById("loginSuccess");
  if (succ) succ.textContent = "";
}

function renderNav(role){
  const nav = document.getElementById("sidebarNav");
  nav.innerHTML = NAV_CONFIG[role].map((item, i) => `
    <button class="nav-item${i === 0 ? " active" : ""}" data-page="${item.page}">
      <span>${item.label}</span>
    </button>
  `).join("");

  nav.querySelectorAll(".nav-item").forEach(btn => {
    btn.addEventListener("click", () => {
      showPage(btn.dataset.page);
      closeSidebar();
    });
  });

  document.getElementById("sidebarRole").textContent = role === "instructor" ? "Instructor Portal" : "Student Portal";
}

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
  if (name === "studentExams") renderStudentSubjects();
  if (name === "checking") renderAnswerKeyEditor();
  if (name === "quizManager") renderQuizManager();
  if (name === "studentQuizzes") renderStudentQuizzes();
  if (name === "dashboard") renderInstructorDashboard();
  if (name === "subjects") renderInstructorSubjects();
  if (name === "grades") renderInstructorGrades();
  if (name === "feedback"){ if (typeof initFeedbackPage === "function") initFeedbackPage(); }

  if (name === "studentUpload" || name === "checking"){
    populateSubjectDropdowns();
    populateExamDropdowns();
  }
}
window.showPage = showPage;

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

const sidebar = document.getElementById("sidebar");
const app = document.getElementById("app");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const globalBurgerBtn = document.getElementById("globalBurgerBtn");
const sidebarCloseBtn = document.getElementById("sidebarCloseBtn");

function openSidebar(){
  sidebar.classList.add("open");
  sidebarOverlay.classList.add("active");
  document.body.classList.add("sidebar-open");
  globalBurgerBtn.classList.add("is-active");
}

function closeSidebar(){
  sidebar.classList.remove("open");
  sidebarOverlay.classList.remove("active");
  document.body.classList.remove("sidebar-open");
  globalBurgerBtn.classList.remove("is-active");
}

function toggleSidebar(){
  if (sidebar.classList.contains("open")) closeSidebar();
  else openSidebar();
}

function createRipple(e, button){
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = (e.clientX || rect.left + rect.width/2) - rect.left - size/2;
  const y = (e.clientY || rect.top + rect.height/2) - rect.top - size/2;
  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = x + "px";
  ripple.style.top = y + "px";
  button.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

if (globalBurgerBtn){
  globalBurgerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    createRipple(e, globalBurgerBtn);
    openSidebar();
  });
}

if (sidebarCloseBtn){
  sidebarCloseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    createRipple(e, sidebarCloseBtn);
    closeSidebar();
  });
}

sidebarOverlay.addEventListener("click", closeSidebar);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && sidebar.classList.contains("open")) closeSidebar();
});

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
  const ls = document.getElementById("loginSuccess");
  const ss = document.getElementById("signupSuccess");
  if (ls) ls.textContent = "";
  if (ss) ss.textContent = "";
}

document.getElementById("showSignupBtn").addEventListener("click", () => setAuthMode("signup"));
document.getElementById("showLoginBtn").addEventListener("click", () => setAuthMode("login"));

/* ============================================
   LOGIN — API-BACKED
   ============================================ */
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const enteredId = loginIdInput.value.trim();
  const enteredPassword = passwordInput.value;

  const idValid = enteredId.length > 0;
  const passwordValid = enteredPassword.length > 0;

  document.getElementById("loginIdError").textContent = idValid ? "" : "Enter your email or username.";
  document.getElementById("passwordError").textContent = passwordValid ? "" : "Enter your password.";
  loginError.textContent = "";

  if (!idValid || !passwordValid) return;

  const submitBtn = document.getElementById("loginSubmitBtn");
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = "Signing in...";

  try {
    const result = await API.Auth.login(enteredId, enteredPassword, currentRole);

    const user = {
      id: result.user.id,
      fullName: result.user.full_name,
      username: result.user.username,
      email: result.user.email,
      role: result.user.role
    };

    enterApp(user);
  } catch (error) {
    console.error("Login error:", error);
    loginError.textContent = error.message || "Login failed. Please check your credentials.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
});

function enterApp(user){
  // Save user info to localStorage for UI
  if (typeof setAuthUser === "function") {
    setAuthUser({
      id: user.id,
      full_name: user.fullName,
      username: user.username,
      email: user.email,
      role: user.role
    });
  }

  // Keep legacy KEYS.current for backward compatibility
  setCurrentUser({
    id: user.id,
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    role: user.role
  });

  updateUserHeader(user);
  renderNav(user.role || "instructor");
  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  closeSidebar();
  const firstPage = (user.role === "student") ? "studentDashboard" : "dashboard";
  showPage(firstPage);
}

/* ============================================
   SIGNUP — API-BACKED
   ============================================ */
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullName = document.getElementById("signupFullName");
  const username = document.getElementById("signupUsername");
  const signupEmail = document.getElementById("signupEmail");
  const signupPassword = document.getElementById("signupPassword");
  const confirmPassword = document.getElementById("confirmPassword");

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
  document.getElementById("signupSuccess").textContent = "";

  if (!nameValid || !usernameValid || !emailValid || !passwordValid || !confirmValid) return;

  const submitBtn = signupForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = "Creating account...";

  try {
    await API.Auth.signup(
      fullName.value.trim(),
      username.value.trim(),
      signupEmail.value.trim(),
      signupPassword.value,
      currentRole
    );

    document.getElementById("signupSuccess").textContent = "Account created successfully!";
    signupForm.reset();

    setTimeout(() => {
      setAuthMode("login");
      loginIdInput.value = username.value.trim() || "";
      document.getElementById("loginSuccess").textContent = "Account created. Please sign in.";
    }, 1200);
  } catch (error) {
    console.error("Signup error:", error);
    signupError.textContent = error.message || "Signup failed. Please try again.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
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

/* ============================================
   LOGOUT — API-AWARE
   ============================================ */
document.getElementById("logout").addEventListener("click", () => {
  if (typeof API !== "undefined" && API.Auth && API.Auth.logout) {
    API.Auth.logout();
  }
  clearCurrentUser();
  localStorage.removeItem("examchecker_token");
  localStorage.removeItem("examchecker_user");

  document.getElementById("app").classList.add("hidden");
  document.getElementById("loginScreen").classList.remove("hidden");
  loginIdInput.value = "";
  passwordInput.value = "";
  loginError.textContent = "";
  signupForm.reset();
  setAuthMode("login");
  updateLoginUI();
  closeSidebar();
});

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

/* ============================================
   ANSWER KEY EDITOR (4 TYPES)
   ============================================ */
function renderAnswerKeyEditor(){
  const typeSel = document.getElementById("answerKeyType");
  const totalInput = document.getElementById("totalItems");
  const container = document.getElementById("answerKeyContainer");
  if (!typeSel || !container) return;

  typeSel.value = getAnswerKeyType();
  if (totalInput) totalInput.value = getTotalItems();
  const passingInput = document.getElementById("passingScore");
  if (passingInput) passingInput.value = getPassingScore();

  renderAnswerKeyGrid();
  updateAnswerKeyTypeLabel();
}

function updateAnswerKeyTypeLabel(){
  const type = getAnswerKeyType();
  const label = document.getElementById("answerKeyTypeLabel");
  if (!label) return;
  const labels = {
    multipleChoice: "Multiple Choice (A, B, C, D)",
    identification: "Identification (text answer)",
    image: "Image (upload per item)",
    mixed: "Mixed — set type per item below"
  };
  label.textContent = labels[type] || "";
}

function renderAnswerKeyGrid(){
  const container = document.getElementById("answerKeyContainer");
  if (!container) return;

  const type = getAnswerKeyType();
  const total = getTotalItems();
  let data = getAnswerKeyData();

  while (data.length < total) data.push(null);
  if (data.length > total) data.length = total;
  saveAnswerKeyData(data);

  if (type === "multipleChoice"){
    container.className = "answer-key answer-key-mc";
    container.innerHTML = data.map((ans, i) => `
      <div class="ak-item">
        <span class="ak-num">${i+1}</span>
        <div class="ak-choices">
          ${["A","B","C","D"].map(l => `
            <button type="button" class="ak-choice ${ans === l ? "active" : ""}"
              data-ak-index="${i}" data-ak-value="${l}">${l}</button>
          `).join("")}
        </div>
      </div>
    `).join("");
  } else if (type === "identification"){
    container.className = "answer-key answer-key-id";
    container.innerHTML = data.map((ans, i) => `
      <div class="ak-item ak-item-id">
        <span class="ak-num">${i+1}</span>
        <input type="text" class="ak-input" placeholder="Answer ${i+1}"
          data-ak-index="${i}" value="${ans ? escapeHtml(ans) : ""}">
      </div>
    `).join("");
  } else if (type === "image"){
    container.className = "answer-key answer-key-img";
    container.innerHTML = data.map((ans, i) => `
      <div class="ak-item ak-item-img">
        <span class="ak-num">${i+1}</span>
        <label class="ak-img-upload">
          ${ans ? `<img src="${ans}" alt="Answer ${i+1}">` : `<span>+</span>`}
          <input type="file" accept="image/*" data-ak-index="${i}" hidden>
        </label>
      </div>
    `).join("");
  } else if (type === "mixed"){
    const itemTypes = getMixedItemTypes();
    while (itemTypes.length < total) itemTypes.push("multipleChoice");
    if (itemTypes.length > total) itemTypes.length = total;
    saveMixedItemTypes(itemTypes);

    container.className = "answer-key answer-key-mixed";
    container.innerHTML = data.map((ans, i) => {
      const itemType = itemTypes[i] || "multipleChoice";
      let bodyHtml = "";

      if (itemType === "multipleChoice"){
        bodyHtml = `
          <div class="ak-choices">
            ${["A","B","C","D"].map(l => `
              <button type="button" class="ak-choice ${ans === l ? "active" : ""}"
                data-ak-index="${i}" data-ak-value="${l}">${l}</button>
            `).join("")}
          </div>
        `;
      } else if (itemType === "identification"){
        bodyHtml = `
          <input type="text" class="ak-input" placeholder="Answer ${i+1}"
            data-ak-index="${i}" value="${ans ? escapeHtml(ans) : ""}">
        `;
      } else if (itemType === "image"){
        bodyHtml = `
          <label class="ak-img-upload">
            ${ans && String(ans).startsWith("data:image") ? `<img src="${ans}" alt="Answer ${i+1}">` : `<span>+</span>`}
            <input type="file" accept="image/*" data-ak-index="${i}" hidden>
          </label>
        `;
      }

      return `
        <div class="ak-item ak-item-mixed" data-mixed-index="${i}">
          <div class="ak-mixed-header">
            <span class="ak-num">${i+1}</span>
            <select class="ak-type-select" data-mixed-type-index="${i}">
              <option value="multipleChoice" ${itemType === "multipleChoice" ? "selected" : ""}>Multiple Choice</option>
              <option value="identification" ${itemType === "identification" ? "selected" : ""}>Identification</option>
              <option value="image" ${itemType === "image" ? "selected" : ""}>Image</option>
            </select>
          </div>
          <div class="ak-mixed-body">${bodyHtml}</div>
        </div>
      `;
    }).join("");
  }
}

function renderAnswerKey(){ renderAnswerKeyEditor(); }

document.addEventListener("click", e => {
  const choiceBtn = e.target.closest("[data-ak-index][data-ak-value]");
  if (choiceBtn){
    const idx = parseInt(choiceBtn.dataset.akIndex, 10);
    const val = choiceBtn.dataset.akValue;
    const data = getAnswerKeyData();
    data[idx] = data[idx] === val ? null : val;
    saveAnswerKeyData(data);
    renderAnswerKeyGrid();
  }
});

document.addEventListener("input", e => {
  if (e.target.matches(".ak-input[data-ak-index]")){
    const idx = parseInt(e.target.dataset.akIndex, 10);
    const data = getAnswerKeyData();
    data[idx] = e.target.value;
    saveAnswerKeyData(data);
  }
});

document.addEventListener("change", e => {
  if (e.target.matches('input[type="file"][data-ak-index]')){
    const idx = parseInt(e.target.dataset.akIndex, 10);
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const data = getAnswerKeyData();
      data[idx] = ev.target.result;
      saveAnswerKeyData(data);
      renderAnswerKeyGrid();
    };
    reader.readAsDataURL(file);
  }
});

document.addEventListener("change", e => {
  if (e.target.matches("[data-mixed-type-index]")){
    const idx = parseInt(e.target.dataset.mixedTypeIndex, 10);
    const newType = e.target.value;
    const types = getMixedItemTypes();
    const data = getAnswerKeyData();

    data[idx] = null;
    types[idx] = newType;

    saveAnswerKeyData(data);
    saveMixedItemTypes(types);
    renderAnswerKeyGrid();
  }
});

document.addEventListener("change", e => {
  if (e.target.id === "answerKeyType"){
    const newType = e.target.value;
    if (!confirm(`Change answer key type to "${ANSWER_KEY_TYPES[newType] || newType}"? Current answers will be reset.`)) {
      e.target.value = getAnswerKeyType();
      return;
    }
    saveAnswerKeyType(newType);
    saveAnswerKeyData([]);
    saveMixedItemTypes([]);
    renderAnswerKeyGrid();
    updateAnswerKeyTypeLabel();
    showToast("Answer key type changed");
  }
});

document.addEventListener("change", e => {
  if (e.target.id === "totalItems"){
    let val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 1) val = 1;
    if (val > 100) val = 100;
    e.target.value = val;
    saveTotalItems(val);
    renderAnswerKeyGrid();
    showToast(`Total items set to ${val}`);
  }
});

document.addEventListener("change", e => {
  if (e.target.id === "passingScore"){
    let val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 1) val = 1;
    if (val > 100) val = 100;
    e.target.value = val;
    savePassingScore(val);
  }
});

window.renderAnswerKeyEditor = renderAnswerKeyEditor;
window.renderAnswerKey = renderAnswerKey;

/* ============================================
   INSTRUCTOR DASHBOARD
   ============================================ */
function renderInstructorDashboard(){
  const stats = getInstructorStats();
  const el = id => document.getElementById(id);
  if (el("statTotalSubjects")) el("statTotalSubjects").textContent = stats.totalSubjects;
  if (el("statExamsChecked")) el("statExamsChecked").textContent = stats.examsChecked;
  if (el("statStudentsGraded")) el("statStudentsGraded").textContent = stats.studentsGraded;
  if (el("statAvgScore")) el("statAvgScore").textContent = stats.averageScore + "%";

  const gradesRows = el("instructorRecentGrades");
  if (!gradesRows) return;

  const grades = getInstructorGrades().slice(-3).reverse();
  if (grades.length){
    gradesRows.innerHTML = grades.map(g => `
      <tr>
        <td>${escapeHtml(g.studentName || "—")}</td>
        <td>${escapeHtml(g.subject || "—")}</td>
        <td><span class="badge ${parseFloat(g.percentage) >= 85 ? "good" : "average"}">${escapeHtml(g.percentage || "0")}%</span></td>
      </tr>
    `).join("");
  } else {
    gradesRows.innerHTML = `<tr><td colspan="3" class="empty-row">No grades recorded yet.</td></tr>`;
  }
}

/* ============================================
   INSTRUCTOR SUBJECTS — EMPTY STATE
   ============================================ */
function renderInstructorSubjects(){
  const grid = document.getElementById("instructorSubjectGrid");
  if (!grid) return;
  const subjects = getInstructorSubjects();

  if (!subjects.length){
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;">
        <h3>No subjects yet</h3>
        <p>Click "Add Subject" to get started.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = subjects.map((s, i) => `
    <div class="subject-card">
      <span>${escapeHtml(s.code)}</span>
      <h3>${escapeHtml(s.name)}</h3>
      <p>${escapeHtml(s.instructor || "—")} / ${escapeHtml(s.schedule || "—")}</p>
      <div style="display:flex; gap:10px; margin-top:8px;">
        <button onclick="showPage('checking')">Check Exam</button>
        <button data-instructor-subject-edit="${i}" style="color:var(--text-3);">Edit</button>
        <button data-instructor-subject-delete="${i}" style="color:var(--danger);">Delete</button>
      </div>
    </div>
  `).join("");
}

/* ============================================
   INSTRUCTOR GRADES — EMPTY STATE
   ============================================ */
function renderInstructorGrades(){
  const tbody = document.getElementById("gradeRows");
  if (!tbody) return;
  const grades = getInstructorGrades();

  if (!grades.length){
    tbody.innerHTML = `<tr><td colspan="7" class="empty-row">No grades recorded yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = grades.slice().reverse().map(g => `
    <tr>
      <td>${escapeHtml(g.studentName || "—")}</td>
      <td>${escapeHtml(g.studentId || "—")}</td>
      <td>${escapeHtml(g.subject || "—")}</td>
      <td>${escapeHtml(g.exam || "—")}</td>
      <td>${escapeHtml(g.score || "—")}</td>
      <td><span class="badge ${parseFloat(g.percentage) >= 85 ? "good" : "average"}">${escapeHtml(g.percentage || "0")}%</span></td>
      <td>${escapeHtml(g.date || "—")}</td>
    </tr>
  `).join("");
}

/* ============================================
   STUDENT EXAM IMAGE
   ============================================ */
document.getElementById("studentExamImage").addEventListener("change", function(){
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    document.getElementById("studentPreview").src = e.target.result;
    document.getElementById("studentPreviewWrap").classList.remove("hidden");
    document.getElementById("studentDropZone").classList.add("hidden");
  };
  reader.readAsDataURL(file);
});

function clearStudentPhoto(){
  document.getElementById("studentExamImage").value = "";
  document.getElementById("studentPreviewWrap").classList.add("hidden");
  document.getElementById("studentDropZone").classList.remove("hidden");
}
window.clearStudentPhoto = clearStudentPhoto;

function processStudentExam(){
  const file = document.getElementById("studentExamImage").files[0];
  if (!file){ alert("Please upload your exam photo first."); return; }

  const user = getCurrentUser();
  const subjectSelect = document.getElementById("studentSubjectSelect");
  const examSelect = document.getElementById("studentExamSelect");

  if (!subjectSelect.value){
    alert("Please add a subject first in My Subjects.");
    return;
  }

  const subject = subjectSelect.value;
  const exam = examSelect.value;
  const total = getTotalItems();
  const passing = getPassingScore();

  const btn = document.getElementById("studentProcessBtn");
  btn.disabled = true; btn.textContent = "AI is checking your exam...";

  setTimeout(() => {
    const score = Math.floor(Math.random() * (total + 1));
    const percent = Math.round((score / total) * 100);
    const passed = score >= passing;
    const perfect = score === total;

    document.getElementById("studentResultScore").innerHTML = `${score}<span>/${total}</span><small>${percent}%</small>`;
    document.getElementById("studentResultStudent").textContent = user.fullName || user.username;
    document.getElementById("studentResultSubject").textContent = subject;
    document.getElementById("studentResultExam").textContent = exam;
    document.getElementById("studentResultStatus").textContent = perfect ? "PERFECT" : (passed ? "PASSED" : "FAILED");

    const animEl = document.getElementById("resultAnimation");
    const title = document.getElementById("studentResultTitle");
    const quoteEl = document.getElementById("studentResultQuote");

    animEl.className = "result-animation";
    animEl.innerHTML = "";

    if (perfect){
      title.textContent = "PERFECT SCORE!";
      quoteEl.textContent = "Absolute perfection. You are truly unstoppable!";
      fireConfetti(120);
    } else if (passed){
      title.textContent = "Congratulations! You passed!";
      quoteEl.textContent = "Congratulations! Your hard work paid off. Keep it up!";
      fireConfetti(70);
    } else {
      title.textContent = "Exam result is ready";
      quoteEl.textContent = randomQuote();
    }

    const p = getStudentProfile() || {};
    p.examScores = p.examScores || [];
    p.examScores.push({
      subject,
      exam,
      score: `${score}/${total}`,
      percentage: `${percent}%`,
      date: new Date().toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" })
    });
    saveStudentProfile(p);
    syncStudentToTeacherList();

    document.getElementById("studentResultPanel").classList.remove("hidden");
    document.getElementById("studentResultPanel").scrollIntoView({behavior:"smooth"});

    btn.disabled = false; btn.textContent = "Upload & Check Exam";
  }, 1200);
}
window.processStudentExam = processStudentExam;

/* ============================================
   QUIZ MANAGER
   ============================================ */
function generateAutoAnswerKey(total){
  const letters = ["A","B","C","D"];
  return Array.from({length: total}, (_, i) => letters[i % 4]);
}

let editingQuizId = null;
let quizImageData = null;

function renderQuizManager(){
  const user = getCurrentUser();
  if (!user || user.role !== "instructor") return;

  const quizzes = getQuizzes();
  const list = document.getElementById("quizList");
  if (!list) return;

  if (!quizzes.length){
    list.innerHTML = `<div class="empty-row" style="grid-column:1/-1;">No quizzes yet. Click "Create Quiz" to get started.</div>`;
    return;
  }

  list.innerHTML = quizzes.map((q) => `
    <div class="quiz-card">
      <div class="quiz-subject">${escapeHtml(q.subject)}</div>
      <h4>${escapeHtml(q.name)}</h4>
      <div class="quiz-meta">
        <span>Date: ${escapeHtml(formatDate(q.date))}</span>
        <span>Items: ${q.totalItems}</span>
        <span>Passing: ${q.passingScore}</span>
      </div>
      ${q.image ? `<img src="${q.image}" class="quiz-preview-thumb" alt="Quiz preview">` : ""}
      <div class="quiz-actions">
        <button data-quiz-answers="${q.id}">View Answer Key</button>
        <button data-quiz-edit="${q.id}">Edit</button>
        <button data-quiz-delete="${q.id}" class="danger">Delete</button>
      </div>
    </div>
  `).join("");
}

function openQuizModal(quizId = null){
  editingQuizId = quizId;
  quizImageData = null;

  const isEdit = quizId !== null;
  const quizzes = getQuizzes();
  const q = isEdit ? quizzes.find(x => x.id === quizId) : null;

  document.getElementById("quizModalTitle").textContent = isEdit ? "Edit Quiz" : "Create Quiz";
  populateSubjectDropdowns();

  document.getElementById("quizSubjectInput").value = q ? q.subject : "";
  document.getElementById("quizNameInput").value = q ? q.name : "";
  document.getElementById("quizDateInput").value = q ? q.date : new Date().toISOString().slice(0,10);
  document.getElementById("quizTotalItemsInput").value = q ? q.totalItems : 10;
  document.getElementById("quizPassingInput").value = q ? q.passingScore : 6;
  document.getElementById("quizImageInput").value = "";
  document.getElementById("quizModalError").textContent = "";

  const wrap = document.getElementById("quizImagePreviewWrap");
  const img = document.getElementById("quizImagePreview");
  if (q && q.image){
    quizImageData = q.image;
    img.src = q.image;
    wrap.classList.remove("hidden");
  } else {
    wrap.classList.add("hidden");
    img.src = "";
  }

  document.getElementById("quizModal").classList.remove("hidden");
}

function closeQuizModal(){
  document.getElementById("quizModal").classList.add("hidden");
  editingQuizId = null;
  quizImageData = null;
}

document.getElementById("quizImageInput").addEventListener("change", function(){
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    quizImageData = e.target.result;
    document.getElementById("quizImagePreview").src = e.target.result;
    document.getElementById("quizImagePreviewWrap").classList.remove("hidden");
  };
  reader.readAsDataURL(file);
});

function saveQuizFromModal(){
  const subject = document.getElementById("quizSubjectInput").value.trim();
  const name = document.getElementById("quizNameInput").value.trim();
  const date = document.getElementById("quizDateInput").value;
  const totalItems = parseInt(document.getElementById("quizTotalItemsInput").value) || 0;
  const passingScore = parseInt(document.getElementById("quizPassingInput").value) || 0;
  const errorEl = document.getElementById("quizModalError");

  if (!subject || !name || !date){
    errorEl.textContent = "Subject, Quiz Name, and Date are required.";
    return;
  }
  if (totalItems < 1 || totalItems > 100){
    errorEl.textContent = "Total items must be between 1 and 100.";
    return;
  }
  if (passingScore < 1 || passingScore > totalItems){
    errorEl.textContent = "Passing score must be between 1 and total items.";
    return;
  }

  const quizzes = getQuizzes();
  const answerKey = generateAutoAnswerKey(totalItems);

  if (editingQuizId !== null){
    const idx = quizzes.findIndex(x => x.id === editingQuizId);
    if (idx >= 0){
      quizzes[idx] = {
        ...quizzes[idx],
        subject, name, date, totalItems, passingScore,
        image: quizImageData,
        answerKey
      };
      showToast("Quiz updated successfully");
    }
  } else {
    quizzes.push({
      id: "q" + Date.now(),
      subject, name, date, totalItems, passingScore,
      image: quizImageData,
      answerKey,
      createdBy: (getCurrentUser() || {}).username || "instructor",
      createdAt: new Date().toISOString()
    });
    showToast("Quiz created successfully");
  }

  saveQuizzes(quizzes);
  renderQuizManager();
  closeQuizModal();
}

document.addEventListener("click", e => {
  if (e.target.id === "addQuizBtn"){ openQuizModal(null); }
  if (e.target.id === "closeQuizModal" || e.target.id === "cancelQuizBtn"){ closeQuizModal(); }
  if (e.target.id === "saveQuizBtn"){ saveQuizFromModal(); }
  if (e.target.id === "quizModal"){ closeQuizModal(); }
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !document.getElementById("quizModal").classList.contains("hidden")){
    closeQuizModal();
  }
});

document.addEventListener("click", e => {
  const viewKeyBtn = e.target.closest("[data-quiz-answers]");
  if (viewKeyBtn){
    const id = viewKeyBtn.dataset.quizAnswers;
    const q = getQuizzes().find(x => x.id === id);
    if (q){
      alert(`Answer Key for "${q.name}" (${q.subject}):\n\n` +
        q.answerKey.map((a, i) => `${i+1}. ${a}`).join("\n"));
    }
  }

  const editBtn = e.target.closest("[data-quiz-edit]");
  if (editBtn){ openQuizModal(editBtn.dataset.quizEdit); }

  const delBtn = e.target.closest("[data-quiz-delete]");
  if (delBtn){
    const id = delBtn.dataset.quizDelete;
    const q = getQuizzes().find(x => x.id === id);
    if (!q) return;
    if (!confirm(`Delete quiz "${q.name}"?`)) return;
    saveQuizzes(getQuizzes().filter(x => x.id !== id));
    renderQuizManager();
    showToast("Quiz deleted");
  }
});

/* ============================================
   STUDENT QUIZZES
   ============================================ */
let activeQuiz = null;
let studentQuizAnswers = {};

function renderStudentQuizzes(){
  const list = document.getElementById("studentQuizList");
  if (!list) return;

  const quizzes = getQuizzes();
  const attempts = getQuizAttempts();
  const user = getCurrentUser();
  const userId = user ? (user.id || user.username) : "guest";

  if (!quizzes.length){
    list.innerHTML = `<div class="empty-row" style="grid-column:1/-1;">No quizzes available yet.</div>`;
    return;
  }

  list.innerHTML = quizzes.map(q => {
    const myAttempt = attempts.find(a => a.quizId === q.id && a.userId === userId);
    const statusBadge = myAttempt
      ? `<span class="badge good">Taken: ${myAttempt.percentage}%</span>`
      : `<span class="badge average">Not taken</span>`;

    return `
      <div class="quiz-card">
        <div class="quiz-subject">${escapeHtml(q.subject)}</div>
        <h4>${escapeHtml(q.name)}</h4>
        <div class="quiz-meta">
          <span>Date: ${escapeHtml(formatDate(q.date))}</span>
          <span>Items: ${q.totalItems}</span>
          <span>Passing: ${q.passingScore}</span>
        </div>
        ${q.image ? `<img src="${q.image}" class="quiz-preview-thumb" alt="Quiz preview">` : ""}
        <div class="quiz-actions">
          ${myAttempt 
            ? `<button data-quiz-review="${q.id}">Review My Score</button>`
            : `<button data-quiz-take="${q.id}">Take Quiz</button>`}
          ${statusBadge}
        </div>
      </div>
    `;
  }).join("");
}

function startQuiz(quizId){
  const q = getQuizzes().find(x => x.id === quizId);
  if (!q) return;
  if (!q.answerKey || !q.answerKey.length){
    alert("This quiz has no answer key yet.");
    return;
  }

  activeQuiz = q;
  studentQuizAnswers = {};

  document.getElementById("quizTakingTitle").textContent = `${q.name} — ${q.subject}`;
  document.getElementById("quizTakingPanel").classList.remove("hidden");
  document.getElementById("quizResultPanel").classList.add("hidden");

  renderQuizQuestions();
  updateQuizProgress();

  document.getElementById("quizTakingPanel").scrollIntoView({behavior:"smooth"});
}

function renderQuizQuestions(){
  const container = document.getElementById("quizQuestionsContainer");
  const letters = ["A","B","C","D"];

  container.innerHTML = activeQuiz.answerKey.map((_, i) => `
    <div class="quiz-question" data-q-index="${i}">
      <div class="q-label">Question ${i+1}</div>
      <div class="q-text">Item ${i+1}</div>
      <div class="q-choices">
        ${letters.map(l => `
          <label>
            <input type="radio" name="quiz-q-${i}" value="${l}" data-q="${i}" data-a="${l}">
            <span>${l}</span>
          </label>
        `).join("")}
      </div>
    </div>
  `).join("");
}

function updateQuizProgress(){
  const total = activeQuiz ? activeQuiz.totalItems : 0;
  const answered = Object.keys(studentQuizAnswers).length;
  const percent = total ? Math.round((answered / total) * 100) : 0;

  document.getElementById("quizProgressText").textContent = `${answered} / ${total} answered`;
  document.getElementById("quizProgressPercent").textContent = `${percent}%`;
}

document.addEventListener("change", e => {
  if (e.target.matches('input[type="radio"][data-q]')){
    const qIdx = e.target.dataset.q;
    const ans = e.target.dataset.a;
    studentQuizAnswers[qIdx] = ans;

    document.querySelectorAll(`.quiz-question[data-q-index="${qIdx}"] .q-choices label`)
      .forEach(lbl => lbl.classList.remove("selected"));
    e.target.closest("label").classList.add("selected");

    updateQuizProgress();
  }
});

function cancelQuizTaking(){
  if (!confirm("Cancel this quiz? Your answers will not be saved.")) return;
  activeQuiz = null;
  studentQuizAnswers = {};
  document.getElementById("quizTakingPanel").classList.add("hidden");
}

function submitQuizAnswers(){
  if (!activeQuiz) return;

  const unanswered = activeQuiz.totalItems - Object.keys(studentQuizAnswers).length;
  if (unanswered > 0){
    if (!confirm(`You have ${unanswered} unanswered item(s). Submit anyway?`)) return;
  }

  let correct = 0;
  activeQuiz.answerKey.forEach((ans, i) => {
    const studentAns = studentQuizAnswers[i] || null;
    if (studentAns === ans) correct++;
  });

  const total = activeQuiz.totalItems;
  const percent = Math.round((correct / total) * 100);
  const passed = correct >= activeQuiz.passingScore;
  const perfect = correct === total;

  document.getElementById("quizResultSubject").textContent = activeQuiz.subject;
  document.getElementById("quizResultName").textContent = activeQuiz.name;
  document.getElementById("quizResultScoreText").textContent = `${correct}/${total}`;
  document.getElementById("quizResultStatus").textContent = perfect ? "PERFECT" : (passed ? "PASSED" : "FAILED");
  document.getElementById("quizResultScore").innerHTML = `${correct}<span>/${total}</span><small>${percent}%</small>`;
  document.getElementById("quizResultTitle").textContent = perfect
    ? "Perfect Score!"
    : (passed ? "Congratulations! You passed!" : "Quiz result is ready");

  const quoteEl = document.getElementById("quizResultQuote");
  if (perfect){
    quoteEl.textContent = "Absolute perfection. You are truly unstoppable!";
    fireConfetti(120);
  } else if (passed){
    quoteEl.textContent = "Congratulations! Your hard work paid off. Keep it up!";
    fireConfetti(70);
  } else {
    quoteEl.textContent = randomQuote();
  }

  const user = getCurrentUser();
  const userId = user ? (user.id || user.username) : "guest";
  const attempts = getQuizAttempts();
  attempts.push({
    quizId: activeQuiz.id,
    userId,
    userName: user ? (user.fullName || user.username) : "Guest",
    subject: activeQuiz.subject,
    quizName: activeQuiz.name,
    score: correct,
    total,
    percentage: `${percent}%`,
    passed,
    date: new Date().toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" })
  });
  saveQuizAttempts(attempts);

  document.getElementById("quizTakingPanel").classList.add("hidden");
  document.getElementById("quizResultPanel").classList.remove("hidden");
  document.getElementById("quizResultPanel").scrollIntoView({behavior:"smooth"});

  activeQuiz = null;
  studentQuizAnswers = {};
}

function closeQuizResult(){
  document.getElementById("quizResultPanel").classList.add("hidden");
  renderStudentQuizzes();
}

document.addEventListener("click", e => {
  const takeBtn = e.target.closest("[data-quiz-take]");
  if (takeBtn){ startQuiz(takeBtn.dataset.quizTake); }
  const reviewBtn = e.target.closest("[data-quiz-review]");
  if (reviewBtn){
    const id = reviewBtn.dataset.quizReview;
    const q = getQuizzes().find(x => x.id === id);
    const user = getCurrentUser();
    const userId = user ? (user.id || user.username) : "guest";
    const attempt = getQuizAttempts().find(a => a.quizId === id && a.userId === userId);
    if (q && attempt){
      document.getElementById("quizResultSubject").textContent = q.subject;
      document.getElementById("quizResultName").textContent = q.name;
      document.getElementById("quizResultScoreText").textContent = `${attempt.score}/${attempt.total}`;
      document.getElementById("quizResultStatus").textContent = attempt.passed ? "PASSED" : "FAILED";
      document.getElementById("quizResultScore").innerHTML = `${attempt.score}<span>/${attempt.total}</span><small>${attempt.percentage}</small>`;
      document.getElementById("quizResultTitle").textContent = `You scored ${attempt.percentage}`;
      document.getElementById("quizResultQuote").textContent = attempt.passed
        ? "Great job! Keep up the excellent work."
        : randomQuote();
      document.getElementById("quizResultPanel").classList.remove("hidden");
      document.getElementById("quizResultPanel").scrollIntoView({behavior:"smooth"});
    }
  }
});

/* ============================================
   CONFETTI
   ============================================ */
function fireConfetti(count){
  const container = document.getElementById("confettiContainer");
  const colors = ["#0f1729", "#2a3a5c", "#4a5a7c", "#6b7a9c", "#8a9abc", "#a0b0d0", "#c0d0e0"];

  for (let i = 0; i < count; i++){
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "%";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = (2 + Math.random() * 2) + "s";
    piece.style.animationDelay = (Math.random() * 0.5) + "s";
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    container.appendChild(piece);
    setTimeout(() => piece.remove(), 4500);
  }
}

/* ============================================
   STUDENT DASHBOARD
   ============================================ */
function renderStudentDashboard(){
  const user = getCurrentUser();
  const p = getStudentProfile();
  const displayName = getDisplayName(user);

  const welcome = document.getElementById("studentWelcomeName");
  if (welcome) welcome.textContent = `Welcome, ${displayName}`;

  const scores = (p && p.examScores) ? p.examScores : [];
  const percentages = scores.map(s => parseInt(s.percentage) || 0);
  const avg = percentages.length ? Math.round(percentages.reduce((a,b)=>a+b,0) / percentages.length) : 0;
  const highest = percentages.length ? Math.max(...percentages) : 0;

  document.getElementById("studentExamsTaken").textContent = scores.length;
  document.getElementById("studentAvgScore").textContent = avg + "%";
  document.getElementById("studentHighestScore").textContent = highest + "%";
  
  const subjects = getStudentSubjects();
  document.getElementById("studentSubjectCount").textContent = subjects.length;

  const recent = document.getElementById("studentRecentGrades");
  if (scores.length){
    recent.innerHTML = scores.slice(-3).reverse().map(s => `
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

function renderStudentSubjects(){
  const tbody = document.getElementById("subjectsRows");
  if (!tbody) return;
  const subjects = getStudentSubjects();

  tbody.innerHTML = subjects.length ? subjects.map((s, i) => `
    <tr>
      <td><b>${escapeHtml(s.code)}</b></td>
      <td>${escapeHtml(s.name)}</td>
      <td>${escapeHtml(s.instructor || "—")}</td>
      <td>${escapeHtml(s.schedule || "—")}</td>
      <td>${escapeHtml(s.units || "—")}</td>
      <td>
        <button class="text-btn" data-subject-edit="${i}" style="margin-right:8px;">Edit</button>
        <button class="text-btn" data-subject-delete="${i}" style="color:var(--danger);">Delete</button>
      </td>
    </tr>
  `).join("") : `<tr><td colspan="6" class="empty-row">No subjects yet. Click "Add Subject" to start.</td></tr>`;
}

let editingSubjectIndex = -1;
let editingInstructorSubjectIndex = -1;
let editingInstructorMode = false;

function openSubjectModal(index = -1){
  const isEdit = index >= 0;
  const subjects = getStudentSubjects();
  const s = isEdit ? subjects[index] : { code:"", name:"", instructor:"", schedule:"", units:"3" };

  editingSubjectIndex = index;
  editingInstructorSubjectIndex = -1;
  editingInstructorMode = false;

  document.getElementById("subjectModalTitle").textContent = isEdit ? "Edit Subject" : "Add Subject";
  document.getElementById("subjectCodeInput").value = s.code || "";
  document.getElementById("subjectNameInput").value = s.name || "";
  document.getElementById("subjectInstructorInput").value = s.instructor || "";
  document.getElementById("subjectScheduleInput").value = s.schedule || "";
  document.getElementById("subjectUnitsInput").value = s.units || "3";
  document.getElementById("subjectModalError").textContent = "";

  document.getElementById("subjectModal").classList.remove("hidden");
}

function openInstructorSubjectModal(index = -1){
  const isEdit = index >= 0;
  const subjects = getInstructorSubjects();
  const s = isEdit ? subjects[index] : { code:"", name:"", instructor:"", schedule:"", units:"3" };

  editingInstructorSubjectIndex = index;
  editingSubjectIndex = -1;
  editingInstructorMode = true;

  document.getElementById("subjectModalTitle").textContent = isEdit ? "Edit Subject" : "Add Subject";
  document.getElementById("subjectCodeInput").value = s.code || "";
  document.getElementById("subjectNameInput").value = s.name || "";
  document.getElementById("subjectInstructorInput").value = s.instructor || "";
  document.getElementById("subjectScheduleInput").value = s.schedule || "";
  document.getElementById("subjectUnitsInput").value = s.units || "3";
  document.getElementById("subjectModalError").textContent = "";

  document.getElementById("subjectModal").classList.remove("hidden");
}
window.openInstructorSubjectModal = openInstructorSubjectModal;

function closeSubjectModal(){
  document.getElementById("subjectModal").classList.add("hidden");
  editingSubjectIndex = -1;
  editingInstructorSubjectIndex = -1;
  editingInstructorMode = false;
}

function saveSubjectFromModal(){
  const code = document.getElementById("subjectCodeInput").value.trim();
  const name = document.getElementById("subjectNameInput").value.trim();
  const instructor = document.getElementById("subjectInstructorInput").value.trim();
  const schedule = document.getElementById("subjectScheduleInput").value.trim();
  const units = document.getElementById("subjectUnitsInput").value.trim() || "3";
  const errorEl = document.getElementById("subjectModalError");

  if (!code || !name){
    errorEl.textContent = "Subject Code and Subject Name are required.";
    return;
  }

  if (editingInstructorMode){
    const subjects = getInstructorSubjects();
    const newSubject = {
      id: editingInstructorSubjectIndex >= 0 ? subjects[editingInstructorSubjectIndex].id : "is" + Date.now(),
      code, name, instructor, schedule, units
    };

    if (editingInstructorSubjectIndex >= 0){
      subjects[editingInstructorSubjectIndex] = newSubject;
      showToast("Subject updated");
    } else {
      subjects.push(newSubject);
      showToast("Subject added");
    }

    saveInstructorSubjects(subjects);
    renderInstructorSubjects();
    populateSubjectDropdowns();
  } else {
    const subjects = getStudentSubjects();
    const newSubject = {
      id: editingSubjectIndex >= 0 ? subjects[editingSubjectIndex].id : "s" + Date.now(),
      code, name, instructor, schedule, units
    };

    if (editingSubjectIndex >= 0){
      subjects[editingSubjectIndex] = newSubject;
      showToast("Subject updated");
    } else {
      subjects.push(newSubject);
      showToast("Subject added");
    }

    saveStudentSubjects(subjects);
    renderStudentSubjects();
    populateSubjectDropdowns();
  }

  closeSubjectModal();
}

document.addEventListener("click", e => {
  if (e.target.id === "closeSubjectModal" || e.target.id === "cancelSubjectBtn"){
    closeSubjectModal();
  }
  if (e.target.id === "saveSubjectBtn"){
    saveSubjectFromModal();
  }
  if (e.target.id === "subjectModal"){
    closeSubjectModal();
  }
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !document.getElementById("subjectModal").classList.contains("hidden")){
    closeSubjectModal();
  }
});

document.addEventListener("click", e => {
  if (e.target.id === "addSubjectBtn"){ openSubjectModal(-1); }

  const editBtn = e.target.closest("[data-subject-edit]");
  if (editBtn){
    const idx = parseInt(editBtn.dataset.subjectEdit, 10);
    openSubjectModal(idx);
  }

  const delBtn = e.target.closest("[data-subject-delete]");
  if (delBtn){
    const idx = parseInt(delBtn.dataset.subjectDelete, 10);
    const subjects = getStudentSubjects();
    if (!subjects[idx]) return;
    if (!confirm(`Delete subject "${subjects[idx].name}"?`)) return;
    subjects.splice(idx, 1);
    saveStudentSubjects(subjects);
    renderStudentSubjects();
    populateSubjectDropdowns();
    showToast("Subject deleted");
  }

  const editInsBtn = e.target.closest("[data-instructor-subject-edit]");
  if (editInsBtn){
    const idx = parseInt(editInsBtn.dataset.instructorSubjectEdit, 10);
    openInstructorSubjectModal(idx);
  }

  const delInsBtn = e.target.closest("[data-instructor-subject-delete]");
  if (delInsBtn){
    const idx = parseInt(delInsBtn.dataset.instructorSubjectDelete, 10);
    const subjects = getInstructorSubjects();
    if (!subjects[idx]) return;
    if (!confirm(`Delete subject "${subjects[idx].name}"?`)) return;
    subjects.splice(idx, 1);
    saveInstructorSubjects(subjects);
    renderInstructorSubjects();
    populateSubjectDropdowns();
    showToast("Subject deleted");
  }
});

/* ============================================
   STUDENT PROFILE
   ============================================ */
function renderStudentProfile(){
  const p = getStudentProfile();
  if (!p) return;

  const fullName = getFullName(p);
  const el = id => document.getElementById(id);

  const avatarEl = el("studentProfileAvatar");
  if (avatarEl){
    if (p.picture){
      avatarEl.innerHTML = `<img src="${p.picture}" alt="Profile">`;
    } else {
      avatarEl.innerHTML = "";
      avatarEl.textContent = computeInitials(fullName);
    }
  }

  if (el("studentFullName")) el("studentFullName").textContent = fullName || "Student Name";
  if (el("studentCourseYear")) el("studentCourseYear").textContent = `${p.course || "—"} / ${p.yearLevel || "—"}`;
  if (el("studentIdDisplay")) el("studentIdDisplay").textContent = p.idNumber || "—";
  if (el("studentCourseDisplay")) el("studentCourseDisplay").textContent = p.course || "—";
  if (el("studentYearDisplay")) el("studentYearDisplay").textContent = p.yearLevel || "—";
  if (el("studentSchoolDisplay")) el("studentSchoolDisplay").textContent = p.school || "Computer Communication Development Institute";
  if (el("studentLocationDisplay")) el("studentLocationDisplay").textContent = p.location || "Sorsogon City";
  if (el("studentSYDisplay")) el("studentSYDisplay").textContent = p.schoolYear || "2026-2027";

  if (el("editSurname")) el("editSurname").value = p.surname || "";
  if (el("editFirstName")) el("editFirstName").value = p.firstName || "";
  if (el("editMiddleInitial")) el("editMiddleInitial").value = p.middleInitial || "";
  if (el("editSuffix")) el("editSuffix").value = p.suffix || "";
  if (el("editCourse")) el("editCourse").value = p.course || "";
  if (el("editYearLevel")) el("editYearLevel").value = p.yearLevel || "1st Year";
  if (el("editIdNumber")) el("editIdNumber").value = p.idNumber || "";
  if (el("editSchoolYear")) el("editSchoolYear").value = p.schoolYear || "2026-2027";
  if (el("editSchool")) el("editSchool").value = p.school || "Computer Communication Development Institute";
  if (el("editLocation")) el("editLocation").value = p.location || "Sorsogon City";
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

function syncStudentToTeacherList(){
  const p = getStudentProfile();
  if (!p) return;
  const fullName = getFullName(p);
  const list = getStudentsList();
  const idx = list.findIndex(s => s.idNumber === p.idNumber);
  const record = {
    ...p,
    fullName,
    examScores: (idx >= 0 && list[idx].examScores) ? list[idx].examScores : (p.examScores || [])
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
      <td>${s.examScores && s.examScores.length ? escapeHtml(s.examScores[s.examScores.length-1].percentage) : "—"}</td>
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
  el("modalCourseYear").textContent = `${s.course || "—"} / ${s.yearLevel || "—"}`;
  el("modalId").textContent = s.idNumber || "—";
  el("modalSurname").textContent = s.surname || "—";
  el("modalFirstName").textContent = s.firstName || "—";
  el("modalMI").textContent = s.middleInitial || "—";
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

function showToast(msg){
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2200);
}

document.addEventListener("click", e => {
  if (e.target.id === "editProfileBtn") toggleStudentEdit(true);
  if (e.target.id === "cancelStudentEditBtn") toggleStudentEdit(false);

  if (e.target.id === "saveStudentProfileBtn"){
    const old = getStudentProfile() || {};
    const profile = {
      surname: document.getElementById("editSurname").value.trim(),
      firstName: document.getElementById("editFirstName").value.trim(),
      middleInitial: document.getElementById("editMiddleInitial").value.trim(),
      suffix: document.getElementById("editSuffix").value.trim(),
      course: document.getElementById("editCourse").value.trim(),
      yearLevel: document.getElementById("editYearLevel").value,
      idNumber: document.getElementById("editIdNumber").value.trim(),
      schoolYear: document.getElementById("editSchoolYear").value.trim() || "2026-2027",
      school: document.getElementById("editSchool").value.trim() || "Computer Communication Development Institute",
      location: document.getElementById("editLocation").value.trim() || "Sorsogon City",
      picture: old.picture || null,
      examScores: old.examScores || [],
      subjects: old.subjects || JSON.parse(JSON.stringify(DEFAULT_SUBJECTS))
    };

    const msg = document.getElementById("studentSaveMsg");

    if (!profile.surname || !profile.firstName){
      msg.style.color = "var(--danger)";
      msg.textContent = "Surname and First Name are required.";
      return;
    }

    saveStudentProfile(profile);
    syncStudentToTeacherList();
    renderStudentProfile();
    toggleStudentEdit(false);
    msg.style.color = "var(--good-text)";
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
});

/* ============================================
   SETTINGS & PROFILE
   ============================================ */
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
    document.getElementById("settingsDepartment").value = settings.department || "";
    document.getElementById("settingsCourse").value = settings.course || "";
    document.getElementById("settingsNotification").value = settings.notification || "all";
  } else {
    document.getElementById("settingsFullName").value = (user && user.fullName) || "Juan Dela Cruz";
    document.getElementById("settingsEmail").value = (user && user.email) || "juan.delacruz@school.edu";
    document.getElementById("settingsContact").value = "";
    document.getElementById("settingsUsername").value = (user && user.username) || "instructor";
    document.getElementById("settingsEmployeeId").value = "INS-2026-014";
    document.getElementById("settingsDepartment").value = "Information Technology";
    document.getElementById("settingsCourse").value = "BS Computer Science";
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
  const emailValid = emailInput2.value.trim().length > 0;

  nameError.textContent = nameValid ? "" : "Enter your full name.";
  emailError.textContent = emailValid ? "" : "Enter your email address.";
  savedMsg.textContent = "";

  if (!nameValid || !emailValid) return;

  const settings = {
    fullName: nameInput.value.trim(),
    email: emailInput2.value.trim(),
    contact: document.getElementById("settingsContact").value.trim(),
    username: document.getElementById("settingsUsername").value.trim(),
    employeeId: document.getElementById("settingsEmployeeId").value.trim(),
    department: document.getElementById("settingsDepartment").value.trim(),
    course: document.getElementById("settingsCourse").value.trim(),
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

/* ============================================
   INIT — API-BACKED AUTO-LOGIN
   ============================================ */
document.addEventListener("DOMContentLoaded", () => {
  updateLoginUI();
  populateSubjectDropdowns();
  populateExamDropdowns();

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
      examScores: [],
      subjects: JSON.parse(JSON.stringify(DEFAULT_SUBJECTS))
    });
    syncStudentToTeacherList();
  }

  populateSubjectDropdowns();
  populateExamDropdowns();

  // ✅ Auto-login kung may valid token pa
  const token = (typeof API !== "undefined" && API.getToken) ? API.getToken() : null;
  const authUser = (typeof API !== "undefined" && API.getAuthUser) ? API.getAuthUser() : null;

  if (token && authUser) {
    const user = {
      id: authUser.id,
      fullName: authUser.full_name,
      username: authUser.username,
      email: authUser.email,
      role: authUser.role
    };

    setCurrentUser(user);
    updateUserHeader(user);
    renderNav(user.role);
    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    closeSidebar();
    showPage(user.role === "student" ? "studentDashboard" : "dashboard");
  }
});

/* ===== EXPOSE HELPERS FOR FEEDBACK.JS ===== */
window.fireConfetti = fireConfetti;
window.showToast = showToast;