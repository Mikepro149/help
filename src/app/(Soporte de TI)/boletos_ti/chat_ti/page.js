"use client";

import React from "react";
import { Ticket } from "lucide-react"; // 👈 icono
import { Input } from "@/components/ui/input"; // 👈 tu input de shadcn

export default function TicketCard() {
  return (
    <div className="bg-gray-100 min-h-screen overflow-hidden flex flex-col">
      {/* ✅ Header fuera y expandido */}
      <header className="w-full flex items-center justify-between px-6 py-4 border-b bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <Ticket className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-semibold">Tickets Activos</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-sm font-medium text-gray-700">
            Usuario: Alberto Pérez
          </span>
          <span className="text-xs text-gray-500">Soporte Técnico</span>
        </div>
      </header>

      {/* ✅ Card debajo del header */}
      <main className="flex-1 p-6">
        <div className="w-[500px] max-w-[95vw] max-h-[95vh] overflow-hidden border rounded-lg shadow-md bg-white p-6">
          {/* Encabezado Ticket */}
          <div className="flex justify-between items-start border-b pb-4 mb-4">
            <div>
              <p className="text-xl font-semibold">#T-00000001</p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Motivo:</span> Problema en el encendido
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Asunto:</span> Falla en el encendido de la Laptop
              </p>
            </div>
            <span className="px-3 py-1 text-sm rounded-full bg-gray-300 text-gray-700 font-semibold">
              Proceso
            </span>
          </div>

          {/* Información de Cliente */}
          <div className="border-b pb-4 mb-4">
            <h3 className="text-base font-semibold text-center mb-2">
              Información de Cliente
            </h3>
            <p className="text-sm">
              <span className="font-medium">Nombre Cliente:</span> Alberto Perez
            </p>
            <p className="text-sm">
              <span className="font-medium">Empresa:</span> YYYYY
            </p>
            <p className="text-sm">
              <span className="font-medium">Sucursal:</span> Jesus Maria
            </p>
            <p className="text-sm">
              <span className="font-medium">Área:</span> Administración
            </p>
          </div>

          {/* Equipo y prioridad */}
          <div className="border-b pb-4 mb-4">
            <p className="text-sm">
              <span className="font-medium">Equipo:</span> Laptop
            </p>
            <p className="text-sm flex items-center gap-2">
              <span className="font-medium">Prioridad:</span>
              <span className="w-3 h-3 bg-red-600 inline-block rounded-full"></span>
              <span className="text-red-600 font-semibold">Alta</span>
            </p>
          </div>

          {/* Pin de Usuario */}
          <div className="border-b pb-4 mb-4 text-center">
            <h3 className="text-base font-semibold mb-2">Pin de Usuario</h3>
            <p className="text-3xl font-bold tracking-widest">9876543</p>
          </div>

          {/* Botón Soporte */}
          <div className="mt-4">
            <button className="w-full bg-[#FF9500] text-white text-lg font-bold py-3 rounded-md hover:bg-[#e08600]">
              Soporte In Situ
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
