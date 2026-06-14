/**
 * ENVIRONMENT CONFIGURATION
 * Access environment variables with type safety
 * Usage: import { API_URL, API_BASE_PATH } from '@/lib/config'
 */

// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
export const API_BASE_PATH = import.meta.env.VITE_API_BASE_PATH || "/api";

// Full API base URL
export const API_BASE_URL = `${API_URL}${API_BASE_PATH}`;

// Endpoint Paths
export const ENDPOINTS = {
  AUTH: import.meta.env.VITE_AUTH_ENDPOINT || "/api/auth",
  USERS: import.meta.env.VITE_USERS_ENDPOINT || "/api/users",
  COURSES: import.meta.env.VITE_COURSES_ENDPOINT || "/api/courses",
  TASKS: import.meta.env.VITE_TASKS_ENDPOINT || "/api/tasks",
  SESSIONS: import.meta.env.VITE_SESSIONS_ENDPOINT || "/api/sessions",
  ANALYTICS: import.meta.env.VITE_ANALYTICS_ENDPOINT || "/api/analytics",
};

// Dev Configuration
export const IS_DEV = import.meta.env.DEV;
export const IS_PROD = import.meta.env.PROD;
export const DEBUG = import.meta.env.VITE_DEBUG === "true";

// Port (for reference, not used in browser)
export const VITE_PORT = import.meta.env.VITE_PORT || "5173";

// Log config in development
if (DEBUG) {
  console.log("🔧 Frontend Configuration:", {
    API_URL,
    API_BASE_URL,
    ENDPOINTS,
    IS_DEV,
    IS_PROD,
    DEBUG,
  });
}
