import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // 🔒 Envía y recibe cookies HTTP-only
});

// Opcional pero recomendado: manejo global de errores
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Sesión expirada o no autorizada.");
      // Aquí podrías limpiar sessionStorage y redirigir al login si lo deseas
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
