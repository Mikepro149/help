"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaUsers } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import EmpresaAd from "./registro_empresa/page";
import PersonaAd from "./persona_ad/page";

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
];

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
];

export default function Clientes() {
  const [tipoCliente, setTipoCliente] = React.useState("empresa");
  const [modalAbierto, setModalAbierto] = React.useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = React.useState(null);

  // Función para abrir el modal directamente desde el lápiz
  const handleEditar = (cliente) => {
    setClienteSeleccionado(cliente);
    setModalAbierto(true);
  };

  const columns =
    tipoCliente === "empresa"
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
                  onClick={() => handleEditar(row.original)}
                  className="text-yellow-600 hover:text-yellow-700"
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
                  onClick={() => handleEditar(row.original)}
                  className="text-yellow-600 hover:text-yellow-700"
                  title="Editar persona"
                >
                  ✏️
                </button>
              </div>
            ),
          },
        ];

  const data = tipoCliente === "empresa" ? empresaData : personaData;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4 font-[Poppins]">
      {/* Encabezado */}
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
        <div style={{ display: "flex", alignItems: "center", padding: "5px" }}>
          <FaUsers
            size={64}
            color="#000"
            style={{ marginRight: "10px", marginBottom: "10px" }}
          />
          <span style={{ fontSize: "24px", fontWeight: "bold" }}>Clientes</span>
        </div>
        <div style={{ textAlign: "right", fontSize: "16px", color: "#333" }}>
          <span style={{ fontWeight: "bold" }}>Empresa</span> | Juan Pérez &nbsp;
          <span style={{ color: "#888" }}>Cargo: Administrador</span>
        </div>
      </div>

      {/* Selector de tipo de cliente */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "flex-start",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        {["empresa", "persona"].map((tipo) => (
          <div
            key={tipo}
            onClick={() => setTipoCliente(tipo)}
            style={{
              width: "160px",
              background: "#f3f4f6",
              borderRadius: "12px",
              padding: "16px",
              textAlign: "center",
              cursor: "pointer",
              border:
                tipoCliente === tipo ? "2px solid #f59e0b" : "2px solid #f3f4f6",
            }}
          >
            <span
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: tipoCliente === tipo ? "#f59e0b" : "#374151",
              }}
            >
              {tipo === "empresa" ? "Empresa" : "Persona Natural"}
            </span>
          </div>
        ))}
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto border border-gray-300 rounded-lg bg-white">
        <Table className="min-w-[800px] text-center bg-white">
          <TableHeader className="sticky top-0 z-10 bg-orange-300">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-4 py-3 font-semibold text-gray-700"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="hover:bg-orange-50 transition">
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="px-4 py-3 border-b border-gray-300 text-sm"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal SIN trigger - Se controla solo con el estado */}
      <Dialog open={modalAbierto} onOpenChange={setModalAbierto}>
        <DialogContent className="max-w-4xl">
          <DialogHeader className="text-center">
            <DialogTitle className="text-center text-xl font-bold">
              {tipoCliente === "empresa"
                ? "Editar Empresa"
                : "Editar Persona Natural"}
            </DialogTitle>
          </DialogHeader>
          <div className="p-4">
            {tipoCliente === "empresa" ? (
              <EmpresaAd cliente={clienteSeleccionado} />
            ) : (
              <PersonaAd cliente={clienteSeleccionado} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}