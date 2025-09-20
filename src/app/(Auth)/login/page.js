"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const togglePassword = () => setShowPassword(!showPassword);

const handleSubmit = (e) => {
  e.preventDefault();

  // Simulación de validación básica (puedes reemplazar esto por un fetch a una API si es necesario)
  if (email === "admin" && password === "123") {
    router.push("/inicio_ad"); // o la ruta que quieras para el admin
  } else if (email === "ti" && password === "123") {
    router.push("/inicio_ti"); // o la ruta para el usuario normal
  } else if (email === "situ" && password === "123"){
    router.push("/inicio_situ");
  } else {
    alert("Credenciales incorrectas. Intenta de nuevo.");
  }
};


  return (
<div className="flex h-screen min-h-[600px] w-full bg-[#454545]">
  {/* LADO IZQUIERDO: fondo amarillo + triángulo al borde derecho */}
  <div className="flex-1 min-w-[300px] bg-[#f89e1b] flex justify-end items-center">
    {/* TRIÁNGULO GRIS QUE APUNTA A LA IZQUIERDA */}
    <div className="w-0 h-0 border-y-[476px] border-y-transparent border-r-[400px] border-r-[#454545]"></div>
  </div>

  {/* LADO DERECHO: formulario */}
  <div className="flex-1 min-w-[300px] bg-[#454545] flex justify-center items-center">
        
        <div className="bg-[#454545] p-5 rounded-lg text-center w-4/5 max-w-[400px] flex flex-col justify-center max-h-[500px]">
          <h2 className="font-sans py-5 text-white text-2xl md:text-3xl bg-[#5c5c5c] mb-6 rounded-lg font-bold">
            INICIO DE SESION
          </h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="block text-white mb-2 text-left text-lg font-bold">
              Usuario (Correo electronico)
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              required
              className="p-3 border-2 border-gray-300 rounded-full text-base mb-4 w-full bg-white font-bold"
            />

            <label htmlFor="password" className="block text-white mb-2 text-left text-lg font-bold">
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

            {error && <p className="text-red-500 mb-4">{error}</p>}

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