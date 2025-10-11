"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axiosInstance from "@/lib/axiosInstance";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const token = sessionStorage.getItem("access_token");
      if (!token) {
        setChecking(false);
        return;
      }

      try {
        const response = await axiosInstance.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const userData = response.data.user;

          const redirectUrl =
            userData.role === "ADMIN"
              ? "/inicio_ad"
              : userData.role === "SUPPORT_TI"
              ? "/inicio_ti"
              : userData.role === "SUPPORT_SITU"
              ? "/inicio_situ"
              : "/inicio";

          window.location.replace(redirectUrl);
        }
      } catch (error) {
        // No hay sesión o error, continuar con el login
      } finally {
        setChecking(false);
      }
    }

    checkAuth();
  }, []);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      const { accessToken, user } = response.data;

      // Guárdalo solo temporalmente
      sessionStorage.setItem("access_token", accessToken);

      let redirectUrl;
      switch (user.role) {
        case "ADMIN":
          redirectUrl = "/inicio_ad";
          break;
        case "SUPPORT_TI":
          redirectUrl = "/inicio_ti";
          break;
        case "SUPPORT_SITU":
          redirectUrl = "/inicio_situ";
          break;
        default:
          redirectUrl = "/inicio";
      }

      window.location.replace(redirectUrl);
    } catch (err) {
      console.error("💥 Error de conexión:", err);
      setError(err.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#454545]">
        <div className="text-white">Verificando sesión...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen min-h-[600px] w-full bg-[#454545]">
      {/* LADO IZQUIERDO */}
      <div className="flex-1 min-w-[300px] bg-[#f89e1b] flex justify-end items-center">
        <div className="w-0 h-0 border-y-[476px] border-y-transparent border-r-[400px] border-r-[#454545]"></div>
      </div>

      {/* LADO DERECHO */}
      <div className="flex-1 min-w-[300px] bg-[#454545] flex justify-center items-center">
        <div className="bg-[#454545] p-5 rounded-lg text-center w-4/5 max-w-[400px] flex flex-col justify-center max-h-[500px]">
          <h2 className="font-sans py-5 text-white text-2xl md:text-3xl bg-[#5c5c5c] mb-6 rounded-lg font-bold">
            INICIO DE SESION
          </h2>
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="email"
              className="block text-white mb-2 text-left text-lg font-bold"
            >
              Usuario (Correo electronico)
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              required
              className="p-3 border-2 border-gray-300 rounded-full text-base mb-4 w-full bg-white font-bold"
            />

            <label
              htmlFor="password"
              className="block text-white mb-2 text-left text-lg font-bold"
            >
              Contraseña
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="p-3 border-2 border-gray-300 rounded-full text-base mb-4 w-full pr-10 bg-white font-bold"
              />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-lg"
                onClick={togglePassword}
              >
                👁
              </span>
            </div>

            <div className="flex items-center text-white text-base mb-5 gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="accent-[#fca326]"
              />
              <label htmlFor="remember" className="text-base m-0">
                Recordar contraseña
              </label>
            </div>

            {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

            <Button type="submit" variant="login" disabled={isLoading}>
              {isLoading ? "Iniciando..." : "Iniciar Sesión"}
            </Button>

            <div className="text-white text-base mt-4">
              <p>
                ¿Olvidaste tu contraseña?
                <br />
                <Link
                  href="/forgotpassword"
                  className="text-[#f89e1b] font-bold hover:underline"
                >
                  Te ayudamos
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
