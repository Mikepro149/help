"use client";
/*  ____ ___  __  __ ____  _     _____ _____  _    ____   ___  
 / ___/ _ \|  \/  |  _ \| |   | ____|_   _|/ \  |  _ \ / _ \ 
| |  | | | | |\/| | |_) | |   |  _|   | | / _ \ | | | | | | |
| |__| |_| | |  | |  __/| |___| |___  | |/ ___ \| |_| | |_| |
 \____\___/|_|  |_|_|   |_____|_____| |_/_/   \_\____/ \___/ */
import DialogCn from "@/components/shared/dialogcn";
import { TabsCn } from "@/components/shared/tabscn";
import { useState } from "react";

export default function EditarEmpresaAD() {
  const steps = ['Empresa', 'Contacto', 'Sucursal', 'Datos de acceso'];
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
                <label htmlFor="usuario" className="text-lg font-bold text-gray-700 ">Nombre Empresa:</label>
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
                <label htmlFor="sucursal" className="text-lg font-bold text-gray-700">Ruc:</label>
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
                <label htmlFor="area" className="text-lg font-bold text-gray-700">Dirección:</label>
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
              <div className="overflow-x-auto border rounded-md"> 
                <label htmlFor="area" className="text-lg font-bold text-gray-700">Contactos de Referencia:</label>
              <table className="min-w-full text-left text-sm border-collapse">

                <tbody>
                  <tr>
                    <td className="px-4 py-2 border">Jimena Gomez</td>
                    <td className="px-4 py-2 border">Calle Arquitecto Eduardo Orgoñez 260, San Borja 15036</td>
                    <td className="px-4 py-2 border">jime@gmail.com</td>
                    <td className="px-4 py-2 border">94358568</td>
                    <td className="px-4 py-2 border">Atención Cliente</td>
                    <td className="px-4 py-2 border">X</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}




        {step === 1 && (
          <div className="space-y-6">
            {/* 🟠 Fila 4: Tabla con 6 columnas */}
            <div className="overflow-x-auto border rounded-md">
              <table className="min-w-full text-left text-sm border-collapse">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 border">Nombre</th>
                    <th className="px-4 py-2 border">Dirección</th>
                    <th className="px-4 py-2 border">Correo</th>
                    <th className="px-4 py-2 border">Telefono</th>
                    <th className="px-4 py-2 border">Cargo</th>
                    <th className="px-4 py-2 border"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border">SSD</td>
                    <td className="px-4 py-2 border">5 May 2024</td>
                    <td className="px-4 py-2 border">Almacenamiento de...</td>
                    <td className="px-4 py-2 border">1234</td>
                    <td className="px-4 py-2 border">Tienda X</td>
                    <td className="px-4 py-2 border">[X]</td>
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
                    <th className="px-4 py-2 border">Sucursal</th>
                    <th className="px-4 py-2 border">Dirección</th>
                    <th className="px-4 py-2 border">Contacto</th>
                    <th className="px-4 py-2 border">Teléfono</th>
                    <th className="px-4 py-2 border">Correo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border">San Isidro</td>
                    <td className="px-4 py-2 border">Av.Javier Prado Este 2465, San Borja 15021</td>
                    <td className="px-4 py-2 border">Ing Carlos</td>
                    <td className="px-4 py-2 border">981272323</td>
                    <td className="px-4 py-2 border">@@@@gmail.com</td>
                  </tr>
                </tbody>
              </table>
              </div>
        )}
        {step === 3 && (
        <div className="space-y-6">
          <div className="flex flex-col">
                <label htmlFor="Tipo del equipo:" className="text-lg font-bold text-gray-700">Correo Electrónico:</label>
                <input
                  id="correo"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
            <div className="flex flex-col">
                <label htmlFor="Tipo del equipo:" className="text-lg font-bold text-gray-700">Contraseña:</label>
                <input
                  id="correo"
                  type="email"
                  placeholder="*******"
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
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
