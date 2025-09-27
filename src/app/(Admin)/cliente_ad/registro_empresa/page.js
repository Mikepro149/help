"use client";

import DialogCn from "@/components/shared/dialogcn_prueba";
import { TabsCn } from "@/components/shared/tabscn";
import { useState } from "react";
import TicketsTable from "@/components/shared/tablecn_prueba1";
import { Users, FileSearch } from 'lucide-react'
import Link from "next/link";
import EditableTable from "@/components/shared/edittablecn";

// -----------------
// DATA
// -----------------
const data = [
  {
    id: 123,
    ruc: 2083746443,
    empresa: "Alberto PC",
    direccion: "Jr. Los Jazmines 123",
    nombre: "Alberto Perez",
    telefono: 928938446,
    correo: "alberto@gmail.com",
    n_plan: 3,
  },
  {
    id: 456,
    ruc: 1012343244,
    empresa: "Leon Computo",
    direccion: "Jr. Andahuaylas 321",
    nombre: "Marco Lopez",
    telefono: 958473567,
    correo: "marco@gmail.com",
    n_plan: 1,
  }
];

// -----------------
// COMPONENTE PRINCIPAL
// -----------------
export default function EditarEquipoEmpresaAD() {
  const steps = ['Empresa', 'Contactos', 'Sucursal', 'Áreas', 'Datos de acceso'];
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [secondTableData, setSecondTableData] = useState([]);
  const [secondTableColumns, setSecondTableColumns] = useState([]);

   // Estados
  const [empresa, setEmpresa] = useState({ nombre: "", ruc: "", direccion: "", plan: "" });
  const [contactos, setContactos] = useState([]);
  const [nuevoContacto, setNuevoContacto] = useState({ nombre: "", direccion: "", correo: "", telefono: "", cargo: "" });

  const [sucursales, setSucursales] = useState([]);
  const [nuevaSucursal, setNuevaSucursal] = useState({ sucursal: "", direccion: "", contacto: "", telefono: "", correo: "" });

  const [areas, setAreas] = useState([]);
  const [nuevaArea, setNuevaArea] = useState({ area: "", contacto: "", telefono: "", correo: "" });

  const [acceso, setAcceso] = useState({ usuario: "", contraseña: "", confirmar: "" });
  const [mostrarFilaContacto, setMostrarFilaContacto] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);

  // -----------------
  // COLUMNS
  // -----------------
  const columns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "ruc", header: "RUC" },
    { accessorKey: "empresa", header: "Empresa" },
    { accessorKey: "direccion", header: "Direccion" },
    { accessorKey: "nombre", header: "Nombre" },
    { accessorKey: "telefono", header: "Telefono" },
    { accessorKey: "correo", header: "Correo" },
    { accessorKey: "n_plan", header: "Plan" }
  ];

  const onSubmit = () => {
    if (!acceso.usuario || !acceso.contraseña || acceso.contraseña !== acceso.confirmar) {
      alert('Verifica los datos de acceso antes de registrar.');
      return;
    }

    const datos = { empresa, sucursales, areas, acceso };
    console.log('Datos enviados:', datos);
    alert('Empresa registrada correctamente.');
  };

  return (
    <div>

    {/* ✅ Header */}
      <div
        style={{
          maxWidth: "window",
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
          <Users size={50} style={{ marginRight: "15px", marginLeft: "10px" }} />
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
      <TicketsTable data={data} columns={columns} 
      onRowClick={(row) => { 
        setSelectedRow(row)
        setOpen(true) }} />

        {/* Modal secundario con la segunda tabla */}
        <DialogCn
        open={secondOpen}
        onOpenChange={(isOpen) => setSecondOpen(isOpen)}
        title="Jesus Maria" //modificar para el area
        description=""
        >
        <TicketsTable 
            data={secondTableData} 
            columns={secondTableColumns} 
        />
        </DialogCn>

      {/* Modal global */}
      <DialogCn
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            setStep(0); // 🔑 cada vez que se abre vuelve al primer tab
          }
        }}
        title={selectedRow ? selectedRow.empresa : "Empresa"} //enlazar a la base de datos
        description=""
      >
        <div className="space-y-6">
          {/* Tabs */}
          <TabsCn
            steps={steps}
            currentStep={step}
            onStepChange={(newIndex) => setStep(newIndex)}
          />

        {/* Paso 0: Empresa */}
        {step === 0 && (
          <section className="grid grid-cols-2 gap-4">
            {['nombre', 'ruc', 'direccion', 'plan'].map((field) => (
              <input
                key={field}
                name={field}
                className="p-2 rounded border border-gray-300"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                //value={empresa[field]}
                onChange={(e) => setEmpresa({ ...empresa, [field]: e.target.value })}
              />
            ))}
          </section>
        )}

        {/* Paso 1: Contactos */}
        {step === 1 && (
          <EditableTable
            title="Contactos"
            columns={["nombre", "direccion", "correo", "telefono", "cargo"]}
            data={contactos}
            setData={setContactos}
            newRow={nuevoContacto}
            setNewRow={setNuevoContacto}
          />
        )}

        {/* Paso 2: Sucursales */}
        {step === 2 && (
          <EditableTable
            title="Sucursales"
            columns={["sucursal", "direccion", "contacto", "telefono", "correo"]}
            data={sucursales}
            setData={setSucursales}
            newRow={nuevaSucursal}
            setNewRow={setNuevaSucursal}
          />
        )}

        {/* Paso 3: Áreas */}
        {step === 3 && (
          <EditableTable
            title="Áreas"
            columns={["area", "contacto", "telefono", "correo"]}
            data={areas}
            setData={setAreas}
            newRow={nuevaArea}
            setNewRow={setNuevaArea}
          />
        )}

        {/* Paso 4: DATOS DE ACCESO */}
        {step === 4 && (
          <section className="space-y-4">
            <input
              name="usuario"
              className="w-full p-2 rounded border border-gray-300"
              placeholder="Usuario"
              //value={acceso.usuario}
              onChange={(e) => setAcceso({ ...acceso, usuario: e.target.value })}
            />
            <input
              name="contraseña"
              type="password"
              className="w-full p-2 rounded border border-gray-300"
              placeholder="Contraseña"
              //value={acceso.contraseña}
              onChange={(e) => setAcceso({ ...acceso, contraseña: e.target.value })}
            />
            <input
              name="confirmar"
              type="password"
              className="w-full p-2 rounded border border-gray-300"
              placeholder="Confirmar Contraseña"
              //value={acceso.confirmar}
              onChange={(e) => setAcceso({ ...acceso, confirmar: e.target.value })}
            />
          </section>
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
