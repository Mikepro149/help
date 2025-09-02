"use client";

import React from "react";
import { Ticket } from "lucide-react"; // 👈 icono
import { Input } from "@/components/ui/input"; // 👈 tu input de shadcn
import { FaEnvelope } from 'react-icons/fa';
import { TextareaCn } from "@/components/shared/textareacn";

import { useState } from "react";

export default function TicketCard() {

  const [text, setText] = useState("");

  return (
    <div className="bg-gray-100 min-h-screen overflow-hidden flex flex-col">
      {/* ✅ Header fuera y expandido */}
      <header className="w-full flex items-center justify-between px-6 py-4 border-b bg-white shadow-sm">

              {/* Contenedor principal con Flexbox */}
              <div style={{ display: "flex", alignItems: "center", padding:"5px"}}>
                <FaEnvelope size={64} color="#000" style={{ marginRight: "10px", display:"flex", marginBottom:"10px"}} />
                <span style={{ fontSize: "24px", fontWeight: "bold" }}>Chat</span>
              </div>
      
              {/* Contenedor Derecho: Empresa y Usuario */}
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* Nombre de la empresa */}
                <span style={{ fontSize: "16px", color: "#555", fontWeight: "500", marginRight: "25px" }}>
                  J&P PERIFERICOS S.A.C.
                </span>
      
                {/* Información del usuario */}
                
              </div>
   
      </header>
      

      {/* ✅ Card debajo del header */}
      <main className="flex-1 p-6">
        <div className="flex gap-6 flex-wrap">
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
         {/* Textarea a la derecha */}
        <div className="flex-1 min-w-[300px]">
          <div className="bg-[#d4efff] p-4">
            <div className="mb-2">
              <span className="text-black">Mensaje:</span>
            </div>
            <TextareaCn
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Escribe algo..."
            />
          </div>
        </div>
        </div>
      </main>

    </div>
  );
}
