"use client";
/*  ____ ___  __  __ ____  _     _____ _____  _    ____   ___  
 / ___/ _ \|  \/  |  _ \| |   | ____|_   _|/ \  |  _ \ / _ \ 
| |  | | | | |\/| | |_) | |   |  _|   | | / _ \ | | | | | | |
| |__| |_| | |  | |  __/| |___| |___  | |/ ___ \| |_| | |_| |
 \____\___/|_|  |_|_|   |_____|_____| |_/_/   \_\____/ \___/ */
import DialogCn from "@/components/shared/dialogcn";
import { TabsCn } from "@/components/shared/tabscn";
import { useState } from "react";

export default function EditarEquipoEmpresaTI() {
  const steps = ['Usuario', 'Hardware', 'Software'];
  const [step, setStep] = useState(0);

  return (
    <DialogCn
      triggerLabel="Abrir modal"
      title="Registrar Equipo"
      description=""
    >
      <div className="space-y-6">
        {/* Tabs */}
        <TabsCn
          steps={steps}
          currentStep={step}
          onStepChange={(newIndex) => setStep(newIndex)}
        />

        {/* Contenido dinámico */}
        {step === 0 && (
          <div className="space-y-6">
            {/* 🔶 Fila 1: Selects */}
            <div className="grid grid-cols-3 gap-4">
              {/* Usuario */}
              <div className="flex flex-col">
                <label htmlFor="usuario" className="text-lg font-bold text-gray-700 ">Usuario</label>
                <select
                  id="usuario"
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option>Opción 1</option>
                  <option>Opción 2</option>
                  <option>Opción 3</option>
                </select>
              </div>

              {/* Sucursal */}
              <div className="flex flex-col">
                <label htmlFor="sucursal" className="text-lg font-bold text-gray-700">Sucursal</label>
                <select
                  id="sucursal"
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option>Opción 1</option>
                  <option>Opción 2</option>
                  <option>Opción 3</option>
                </select>
              </div>

              {/* Área */}
              <div className="flex flex-col">
                <label htmlFor="area" className="text-lg font-bold text-gray-700">Área</label>
                <select
                  id="area"
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option>Opción 1</option>
                  <option>Opción 2</option>
                  <option>Opción 3</option>
                </select>
              </div>
            </div>

          </div>
        )}




        {step === 1 && (
          <div className="space-y-6">
            {/* 🔶 Fila 1: Selects */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label htmlFor="Tipo del equipo:" className="text-lg font-bold text-gray-700">Tipo del equipo:</label>
                <input
                  id="correo"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="Nº Serie:" className="text-lg font-bold text-gray-700">Nº Serie:</label>
                <input
                  id="correo"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="Fecha de Compra" className="text-lg font-bold text-gray-700">Fecha de Compra:</label>
                <input
                  id="correo"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            {/* 🔷 Fila 2: Inputs */}
            <div className="grid grid-cols-3 gap-4">

              <div className="flex flex-col">
                <label htmlFor="Marca:" className="text-lg font-bold text-gray-700">Marca:</label>
                <input
                  id="clave"
                  type="password"
                  placeholder="••••••"
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="Proveedor" className="text-lg font-bold text-gray-700">Proveedor:</label>
                <input
                  id="clave"
                  type="password"
                  placeholder="••••••"
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="Prioridad" className="text-lg font-bold text-gray-700 ">Prioridad:</label>
                <select
                  id="Prioridad"
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option>Opción 1</option>
                  <option>Opción 2</option>
                  <option>Opción 3</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col">
                <label htmlFor="Plan" className="text-lg font-bold text-gray-700">Plan:</label>
                <input
                    id="casilla"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
            {/* 🔶 Fila 3: Otros Inputs (ejemplo) */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="text-lg font-bold text-gray-700">Descrición del equipo:</label>
                <input className="p-2 border border-gray-300 rounded-md" />
              </div>

            </div>

            {/* 🟠 Fila 4: Tabla con 6 columnas */}
            <div className="overflow-x-auto border rounded-md">
              <table className="min-w-full text-left text-sm border-collapse">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 border">Tipo</th>
                    <th className="px-4 py-2 border">Fecha de Instalación</th>
                    <th className="px-4 py-2 border">Descripción</th>
                    <th className="px-4 py-2 border">Serie</th>
                    <th className="px-4 py-2 border">Proveedor</th>
                    <th className="px-4 py-2 border"><button>+</button></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border">SSD</td>
                    <td className="px-4 py-2 border">5 May 2024</td>
                    <td className="px-4 py-2 border">Almacenamiento de...</td>
                    <td className="px-4 py-2 border">1234</td>
                    <td className="px-4 py-2 border">Tienda X</td>
                    <td className="px-4 py-2 border">/ O</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}




        {step === 2 &&  (
            <div className="overflow-x-auto border rounded-md">
              <table className="min-w-full text-left text-sm border-collapse">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 border">Nombre</th>
                    <th className="px-4 py-2 border">Licencia</th>
                    <th className="px-4 py-2 border">Correo</th>
                    <th className="px-4 py-2 border">Contraseña</th>
                    <th className="px-4 py-2 border">Fecha de Instalación</th>
                    <th className="px-4 py-2 border">Fecha de Caducidad</th>
                    <th className="px-4 py-2 border">Proveedor</th>
                    <th className="px-4 py-2 border"><button>+</button></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border">Antivirus</td>
                    <td className="px-4 py-2 border">38247981283</td>
                    <td className="px-4 py-2 border">wawa@gmail.com</td>
                    <td className="px-4 py-2 border">popopopo</td>
                    <td className="px-4 py-2 border">25 May 2023</td>
                    <td className="px-4 py-2 border">25 may 2026</td>
                    <td className="px-4 py-2 border">info tec</td>
                    <td className="px-4 py-2 border">/ O</td>
                  </tr>
                </tbody>
              </table>
              </div>
        )}
      </div>
      <div className="flex justify-between mt-8">
  <button
    onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
    className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
  >
    Atrás
  </button>

  <button
    onClick={() => setStep((prev) => Math.min(prev + 1, steps.length - 1))}
    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
  >
    Guardar
  </button>
</div>
    </DialogCn>
  );
}
