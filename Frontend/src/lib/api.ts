/**
 * API CLIENT (Axios)
 * Configured with interceptors for auth and error handling
 * Usage: import { api } from '@/lib/api'
 */

import axios, { AxiosInstance, AxiosError } from "axios";
import { API_BASE_URL } from "./config";
import { useAuthStore } from "@/hooks/useAuth";

// Create axios instance
export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor - Add auth token
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle 401 Unauthorized - Logout user
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }

    // Log errors in development
    if (import.meta.env.DEV) {
      console.error("API Error:", {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
      });
    }

    return Promise.reject(error);
  }
);

export default api;
