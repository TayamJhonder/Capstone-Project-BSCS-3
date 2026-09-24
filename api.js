/* ============================================
   API HELPER — ExamChecker Backend
   ============================================ */

// ⚠️ Palitan mo ito ng Render URL mo
const API_BASE_URL = "https://examchecker-backend.onrender.com";

/* ============================================
   TOKEN MANAGEMENT
   ============================================ */
function getToken() {
  return localStorage.getItem("examchecker_token");
}

function setToken(token) {
  localStorage.setItem("examchecker_token", token);
}

function clearToken() {
  localStorage.removeItem("examchecker_token");
  localStorage.removeItem("examchecker_user");
}

function getAuthUser() {
  const userStr = localStorage.getItem("examchecker_user");
  try {
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
}

function setAuthUser(user) {
  localStorage.setItem("examchecker_user", JSON.stringify(user));
}

/* ============================================
   FETCH WRAPPER
   ============================================ */
async function apiFetch(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.detail || data.message || `HTTP ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

/* ============================================
   AUTH API
   ============================================ */
const AuthAPI = {
  async signup(fullName, username, email, password, role) {
    const data = await apiFetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        full_name: fullName,
        username: username,
        email: email,
        password: password,
        role: role
      })
    });
    setToken(data.access_token);
    setAuthUser(data.user);
    return data;
  },

  async login(emailOrUsername, password, role) {
    const data = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email_or_username: emailOrUsername,
        password: password,
        role: role
      })
    });
    setToken(data.access_token);
    setAuthUser(data.user);
    return data;
  },

  async getMe() {
    return await apiFetch("/auth/me");
  },

  logout() {
    clearToken();
  }
};

/* ============================================
   SUBJECTS API
   ============================================ */
const SubjectsAPI = {
  async getInstructorSubjects() {
    return await apiFetch("/subjects/instructor");
  },

  async createInstructorSubject(data) {
    return await apiFetch("/subjects/instructor", {
      method: "POST",
      body: JSON.stringify(data)
    });
  },

  async updateInstructorSubject(id, data) {
    return await apiFetch(`/subjects/instructor/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    });
  },

  async deleteInstructorSubject(id) {
    return await apiFetch(`/subjects/instructor/${id}`, {
      method: "DELETE"
    });
  },

  async getStudentSubjects() {
    return await apiFetch("/subjects/student");
  },

  async createStudentSubject(data) {
    return await apiFetch("/subjects/student", {
      method: "POST",
      body: JSON.stringify(data)
    });
  },

  async updateStudentSubject(id, data) {
    return await apiFetch(`/subjects/student/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    });
  },

  async deleteStudentSubject(id) {
    return await apiFetch(`/subjects/student/${id}`, {
      method: "DELETE"
    });
  }
};

/* ============================================
   EXAMS API
   ============================================ */
const ExamsAPI = {
  async getInstructorGrades() {
    return await apiFetch("/exams/instructor-grades");
  },

  async createInstructorGrade(data) {
    return await apiFetch("/exams/instructor-grades", {
      method: "POST",
      body: JSON.stringify(data)
    });
  },

  async getStudentGrades() {
    return await apiFetch("/exams/student-grades");
  },

  async createStudentGrade(data) {
    return await apiFetch("/exams/student-grades", {
      method: "POST",
      body: JSON.stringify(data)
    });
  },

  async getAnswerKey() {
    return await apiFetch("/exams/answer-key");
  },

  async saveAnswerKey(data) {
    return await apiFetch("/exams/answer-key", {
      method: "POST",
      body: JSON.stringify(data)
    });
  }
};

/* ============================================
   QUIZZES API
   ============================================ */
const QuizzesAPI = {
  async getQuizzes() {
    return await apiFetch("/quizzes");
  },

  async createQuiz(data) {
    return await apiFetch("/quizzes", {
      method: "POST",
      body: JSON.stringify(data)
    });
  },

  async deleteQuiz(id) {
    return await apiFetch(`/quizzes/${id}`, {
      method: "DELETE"
    });
  },

  async getMyAttempts() {
    return await apiFetch("/quizzes/attempts");
  },

  async submitAttempt(data) {
    return await apiFetch("/quizzes/attempts", {
      method: "POST",
      body: JSON.stringify(data)
    });
  }
};

/* ============================================
   FEEDBACK API
   ============================================ */
const FeedbackAPI = {
  async submit(data) {
    return await apiFetch("/feedback", {
      method: "POST",
      body: JSON.stringify(data)
    });
  },

  async getAll() {
    return await apiFetch("/feedback");
  }
};

/* ============================================
   EXPOSE
   ============================================ */
window.API = {
  Auth: AuthAPI,
  Subjects: SubjectsAPI,
  Exams: ExamsAPI,
  Quizzes: QuizzesAPI,
  Feedback: FeedbackAPI,
  getToken,
  setToken,
  clearToken,
  getAuthUser,
  setAuthUser
};