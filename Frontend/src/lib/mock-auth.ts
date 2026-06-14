/**
 * MOCK DATA FOR AUTHENTICATION
 * Remove when connecting to real backend API
 */

export type MockUser = {
  id: string;
  email: string;
  password: string;
  name: string;
  role: "student" | "mentor" | "admin";
  avatar: string;
};

export const MOCK_USERS = {
  // Student users
  students: [
    {
      id: "student_1",
      email: "student@bynixx.com",
      password: "password123",
      name: "John Student",
      role: "student",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
  ],
  // Mentor users
  mentors: [
    {
      id: "mentor_1",
      email: "mentor@bynixx.com",
      password: "password123",
      name: "Dr. Sarah Mentor",
      role: "mentor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
  ],
  // Admin users
  admins: [
    {
      id: "admin_1",
      email: "admin@bynixx.com",
      password: "admin123",
      name: "Admin User",
      role: "admin",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
    },
  ],
};

export const MOCK_LOGIN = async (
  email: string,
  password: string,
  role?: "student" | "mentor" | "admin"
): Promise
  | { success: true; user: MockUser; token: string }
  | { success: false; error: string } => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (role === "admin") {
    const admin = MOCK_USERS.admins.find((u) => u.email === email && u.password === password);
    if (admin) {
      return { success: true, user: admin, token: "mock_admin_token_" + Date.now() };
    }
  } else {
    const student = MOCK_USERS.students.find((u) => u.email === email && u.password === password);
    if (student) {
      return { success: true, user: student, token: "mock_student_token_" + Date.now() };
    }

    const mentor = MOCK_USERS.mentors.find((u) => u.email === email && u.password === password);
    if (mentor) {
      return { success: true, user: mentor, token: "mock_mentor_token_" + Date.now() };
    }
  }

  return { success: false, error: "Invalid email or password" };
};
