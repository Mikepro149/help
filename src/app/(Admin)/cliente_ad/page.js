"use client"

import * as React from "react"
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"

import { FaUsers } from "react-icons/fa"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import DialogCn from "@/components/shared/dialogcn_prueba";
import { TabsCn } from "@/components/shared/tabscn";
import { useState } from "react";
import TicketsTable from "@/components/shared/tablecn_prueba1";
import { Users, FileSearch } from 'lucide-react'
import Link from "next/link";
import EditableTable from "@/components/shared/edittablecn";

const empresaData = [
  {
    id: "emp001",
    ruc: "316",
    empresa: "Tech Solutions",
    direccion: "Av. Siempre Viva 123",
    nombre: "Juan Pérez",
    telefono: "987654321",
    correo: "juanperez@company.com",
    plan: "Premium",
    equipos: 5,
  },
  {
    id: "emp002",
    ruc: "210",
    empresa: "Servicios Globales",
    direccion: "Calle Falsa 456",
    nombre: "María López",
    telefono: "912345678",
    correo: "maria@services.com",
    plan: "Básico",
    equipos: 2,
  },
]

const personaData = [
  {
    id: "pn001",
    dni: "45678912",
    nombre: "Alberto Pérez",
    direccion: "Av. Los Olivos 321",
    telefono: "987654321",
    correo: "alberto@gmail.com",
    pais: "Perú",
    equipos: 3,
  },
  {
    id: "pn002",
    dni: "78945612",
    nombre: "Ana María Contreras",
    direccion: "Jr. Las Flores 123",
    telefono: "912345678",
    correo: "ana@gmail.com",
    pais: "Perú",
    equipos: 1,
  },
]

export default function Clientes() {
  const [tipoCliente, setTipoCliente] = React.useState("empresa")

  const steps_empresa = ['Empresa', 'Contactos', 'Sucursal', 'Áreas', 'Datos de acceso'];
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

  const columns = tipoCliente === "empresa"
    ? [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "ruc", header: "RUC" },
        { accessorKey: "empresa", header: "Empresa" },
        { accessorKey: "direccion", header: "Dirección" },
        { accessorKey: "nombre", header: "Nombre" },
        { accessorKey: "telefono", header: "Teléfono" },
        { accessorKey: "correo", header: "Correo" },
        { accessorKey: "plan", header: "Plan" },
        { accessorKey: "equipos", header: "N° de equipos" },
        {
          id: "acciones",
          header: "Acciones",
          cell: ({ row }) => (
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() =>
                  window.location.href = `/cliente_ad/registro_empresa?id=${row.original.id}`
                }
                className="text-blue-600 hover:text-blue-800"
                title="Editar empresa"
              >
                ✏️
              </button>
            </div>
          ),
        },
      ]
    : [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "dni", header: "DNI" },
        { accessorKey: "nombre", header: "Nombre" },
        { accessorKey: "direccion", header: "Dirección" },
        { accessorKey: "telefono", header: "Teléfono" },
        { accessorKey: "correo", header: "Correo" },
        { accessorKey: "pais", header: "País" },
        { accessorKey: "equipos", header: "N° de equipos" },
        {
          id: "acciones",
          header: "Acciones",
          cell: ({ row }) => (
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() =>
                  window.location.href = `/cliente_ad/persona_ad?id=${row.original.id}`
                }
                className="text-blue-600 hover:text-blue-800"
                title="Editar persona"
              >
                ✏️
              </button>
            </div>
          ),
        },
      ]

  const data = tipoCliente === "empresa" ? empresaData : personaData

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="p-4 font-[Poppins]">
      {/* Encabezado */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "30px 20px 0 20px",
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 2px 8px #0001",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "30px"
      }}>
        <div style={{ display: "flex", alignItems: "center", padding:"5px"}}>
          <FaUsers size={64} color="#000" style={{ marginRight: "10px", marginBottom:"10px"}} />
          <span style={{ fontSize: "24px", fontWeight: "bold" }}>Clientes</span>
        </div>
        <div style={{ textAlign: "right", fontSize: "16px", color: "#333" }}>
          <span style={{ fontWeight: "bold" }}>Empresa</span> | Juan Pérez &nbsp;
          <span style={{ color: "#888" }}>Cargo: Administrador</span>
        </div>
      </div>

      {/* Cuadros de selección */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "flex-start",
        gap: "20px",
        marginBottom: "20px",
      }}>
        <div
          onClick={() => setTipoCliente("empresa")}
          style={{
            width: "160px",
            background: "#f3f4f6",
            borderRadius: "12px",
            padding: "16px",
            textAlign: "center",
            cursor: "pointer",
            border: tipoCliente === "empresa" ? "2px solid #f59e0b" : "2px solid #f3f4f6",
          }}
        >
          <span style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: tipoCliente === "empresa" ? "#f59e0b" : "#374151"
          }}>Empresa</span>
        </div>

        <div
          onClick={() => setTipoCliente("persona")}
          style={{
            width: "160px",
            background: "#f3f4f6",
            borderRadius: "12px",
            padding: "16px",
            textAlign: "center",
            cursor: "pointer",
            border: tipoCliente === "persona" ? "2px solid #f59e0b" : "2px solid #f3f4f6",
          }}
        >
          <span style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: tipoCliente === "persona" ? "#f59e0b" : "#374151"
          }}>Persona Natural</span>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto border border-gray-300 rounded-lg bg-white">
        <Table className="min-w-[800px] text-center bg-white">
          <TableHeader className="sticky top-0 z-10 bg-orange-300">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="px-4 py-3 font-semibold text-gray-700">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="px-4 py-3 border-b border-gray-300 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      
    </div>
  )
}
