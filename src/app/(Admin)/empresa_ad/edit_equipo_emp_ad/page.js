"use client";

import DialogCn from "@/components/shared/dialogcn_prueba";
import { TabsCn } from "@/components/shared/tabscn";
import { useState } from "react";
import TicketsTable from "@/components/shared/tablecn_component";
import { User } from 'lucide-react'

// -----------------
// DATA
// -----------------
const data = [
  {
    tipo: "laptop",
    marca: "Asus",
    n_serie: "736463748585856",
    usuario: "Alberto Perez",
    area: "Administracion",
    revision: "04 May 2023",
    programada: "04 Jun 2024",
  },
  {
    tipo: "Pc",
    marca: "HP",
    n_serie: "283737547586677",
    usuario: "Alberto Perez 2",
    area: "TI",
    revision: "06 May 2023",
    programada: "10 Jun 2024",
  },
];

// -----------------
// COMPONENTE PRINCIPAL
// -----------------
export default function EditarEquipoEmpresaAD() {
  const steps = ["Usuario", "Hardware", "Software"];
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // -----------------
  // COLUMNS
  // -----------------
  const columns = [
    { accessorKey: "tipo", header: "Tipo" },
    { accessorKey: "marca", header: "Marca" },
    { accessorKey: "n_serie", header: "N° Serie" },
    { accessorKey: "usuario", header: "Usuario" },
    { accessorKey: "area", header: "Área" },
    { accessorKey: "revision", header: "Última Revisión" },
    { accessorKey: "programada", header: "Revisión Programada" },
    {
      accessorKey: "acciones",
      header: "Acciones",
      cell: ({ row }) => (
        <button
          onClick={() => {
            setSelectedRow(row.original);
            setStep(0); // reinicia siempre en "Usuario"
            setOpen(true);
          }}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Editar
        </button>
      ),
    },
  ];

  return (
    <div>

    {/* ✅ Header */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "30px 20px 0 20px",
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 2px 8px #0001",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
        {/* 👇 Aquí reemplazamos el emoji por el ícono User */}
        <User size={32} style={{ marginRight: "15px" }} />
        <span style={{ fontSize: "24px", fontWeight: "bold" }}>
          Clientes
        </span>
      </div>
        <div style={{ textAlign: "right", fontSize: "16px", color: "#333" }}>
          <span style={{ fontWeight: "bold" }}>J&P PERIFERICOS</span> | Carlos Manuel, Perez Diaz &nbsp;
          <span style={{ color: "#888" }}>Administrador</span>
        </div>
      </div>

      {/* Tabla */}
      <TicketsTable data={data} columns={columns} />

      {/* Modal global */}
      <DialogCn
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (isOpen) {
            setStep(0); // 🔑 cada vez que se abre vuelve al primer tab
          }
        }}
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
                  <label htmlFor="Plan" className="text-lg font-bold text-gray-700">Plan:</label>
                  <input
                    id="correo"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="p-2 border border-gray-300 rounded-md"
                  />
                </div>
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
              </div>

              {/* 🔶 Fila 3: Otros Inputs */}
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <label className="text-lg font-bold text-gray-700">Descrición del equipo:</label>
                  <input className="p-2 border border-gray-300 rounded-md" />
                </div>
                <div className="flex flex-col">
                  <label className="text-lg font-bold text-gray-700">Última Revisión:</label>
                  <input className="p-2 border border-gray-300 rounded-md" />
                </div>
                <div className="flex flex-col">
                  <label className="text-lg font-bold text-gray-700">Revisión Programada:</label>
                  <input className="p-2 border border-gray-300 rounded-md" />
                </div>
              </div>

              {/* 🟠 Fila 4: Tabla */}
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

          {step === 2 && (
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
          {/* Botón izquierdo: depende del step */}
          {step === 0 ? (
            <button
              onClick={() => setOpen(false)} // Cierra el modal
              className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Cancelar
            </button>
          ) : (
            <button
              onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
              className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
            >
              Atrás
            </button>
          )}

          {/* Botón derecho: avanzar o guardar */}
          <button
            onClick={() => setStep((prev) => Math.min(prev + 1, steps.length - 1))}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Guardar
          </button>
        </div>
      </DialogCn>
    </div>
  );
}
