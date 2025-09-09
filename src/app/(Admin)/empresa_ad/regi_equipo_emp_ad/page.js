"use client";

import DialogCn from "@/components/shared/dialogcn";
import { TabsCn } from "@/components/shared/tabscn";
import { useState } from "react";

export default function RegistroEquipoEmpresaAD() {
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

            {/* 🔷 Fila 2: Inputs */}
            <div className="grid grid-cols-2 gap-4">
              {/* Correo */}
              <div className="flex flex-col">
                <label htmlFor="correo" className="text-lg font-bold text-gray-700">Correo</label>
                <input
                  id="correo"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Contraseña */}
              <div className="flex flex-col">
                <label htmlFor="clave" className="text-lg font-bold text-gray-700">Contraseña</label>
                <input
                  id="clave"
                  type="password"
                  placeholder="••••••"
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        )}




        {step === 1 && (
          <div className="space-y-6">
            {/* 🔶 Fila 1: Selects */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label htmlFor="usuario" className="text-lg font-bold text-gray-700">Usuario</label>
                <input
                  id="correo"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="sucursal" className="text-lg font-bold text-gray-700">Sucursal</label>
                <input
                  id="correo"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="area" className="text-lg font-bold text-gray-700">Área</label>
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
                <label htmlFor="correo" className="text-lg font-bold text-gray-700">Correo</label>
                <input
                  id="correo"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="clave" className="text-lg font-bold text-gray-700">Contraseña</label>
                <input
                  id="clave"
                  type="password"
                  placeholder="••••••"
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="clave" className="text-lg font-bold text-gray-700">Contraseña</label>
                <input
                  id="clave"
                  type="password"
                  placeholder="••••••"
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            {/* 🔶 Fila 3: Otros Inputs (ejemplo) */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="text-lg font-bold text-gray-700">Departamento</label>
                <input className="p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="flex flex-col">
                <label className="text-lg font-bold text-gray-700">Cargo</label>
                <input className="p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="flex flex-col">
                <label className="text-lg font-bold text-gray-700">Teléfono</label>
                <input className="p-2 border border-gray-300 rounded-md" />
              </div>
            </div>

            {/* 🟠 Fila 4: Tabla con 6 columnas */}
            <div className="overflow-x-auto border rounded-md">
              <table className="min-w-full text-left text-sm border-collapse">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 border">Columna 1</th>
                    <th className="px-4 py-2 border">Columna 2</th>
                    <th className="px-4 py-2 border">Columna 3</th>
                    <th className="px-4 py-2 border">Columna 4</th>
                    <th className="px-4 py-2 border">Columna 5</th>
                    <th className="px-4 py-2 border">Columna 6</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border">Dato 1</td>
                    <td className="px-4 py-2 border">Dato 2</td>
                    <td className="px-4 py-2 border">Dato 3</td>
                    <td className="px-4 py-2 border">Dato 4</td>
                    <td className="px-4 py-2 border">Dato 5</td>
                    <td className="px-4 py-2 border">Dato 6</td>
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
                    <th className="px-4 py-2 border">Columna 1</th>
                    <th className="px-4 py-2 border">Columna 2</th>
                    <th className="px-4 py-2 border">Columna 3</th>
                    <th className="px-4 py-2 border">Columna 4</th>
                    <th className="px-4 py-2 border">Columna 5</th>
                    <th className="px-4 py-2 border">Columna 6</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border">Dato 1</td>
                    <td className="px-4 py-2 border">Dato 2</td>
                    <td className="px-4 py-2 border">Dato 3</td>
                    <td className="px-4 py-2 border">Dato 4</td>
                    <td className="px-4 py-2 border">Dato 5</td>
                    <td className="px-4 py-2 border">Dato 6</td>
                  </tr>
                </tbody>
              </table>
              </div>
        )}
      </div>
    </DialogCn>
  );
}
