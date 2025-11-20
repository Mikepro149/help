"use client"

import * as React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FaTicketAlt} from 'react-icons/fa';

import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const data = [
  {
    id: "INC001",
    tipo: "Red",
    usuario: "Juan Pérez",
    empresa: "Tech Solutions",
    area: "TI",
    sucursal: "Principal",
    estado: "activo",
    fecha: "2025-08-25",
    prioridad: "Alta",
    soporte: true,
  },
  {
    id: "INC002",
    tipo: "Software",
    usuario: "María López",
    empresa: "Servicios Globales",
    area: "Soporte",
    sucursal: "Secundaria",
    estado: "inactivo",
    fecha: "2025-08-24",
    prioridad: "Media",
    soporte: false,
  },
];
////
const columns = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "tipo", header: "Tipo de incidente" },
  { accessorKey: "usuario", header: "Usuario" },
  { accessorKey: "empresa", header: "Empresa" },
  { accessorKey: "area", header: "Área" },
  { accessorKey: "sucursal", header: "Sucursal" },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => (
      <span style={{
        color: row.estado === "activo" ? "#22c55e" : "#ef4444",
        fontWeight: "bold"
      }}>
        {row.estado}
      </span>
    ),
  },
  { accessorKey: "fecha", header: "Fecha de registro" },
  { accessorKey: "prioridad", header: "Prioridad" },
  {
    id: "chat", // falta ver el enlazar una visual del chat de este ticket................................
    header: "Chat",
    cell: ({ row }) => (
      <Button size="sm" variant="ghost" onClick={() => alert(`Abrir chat de ${row.id}`)}>
        <Mail className="w-5 h-5 text-blue-500" />
      </Button>
    ),
  },
  {
    accessorKey: "soporte",
    header: "Soporte in Situ",
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.soporte}
        onChange={() => {}}
        style={{ width: "20px", height: "20px" }}
      />
    ),
  },
];

function DataTableTickets() {
  // Para demo, no se usa react-table, solo renderizado simple
  return (
    <div className="w-full overflow-hidden font-[Poppins]">
      <div className="overflow-x-auto border border-gray-300 rounded-lg bg-white">
        <Table className="min-w-[900px] text-center bg-white">
          <TableHeader className="sticky top-0 z-10 bg-orange-300">
            <TableRow className="border-b border-gray-300">
              {columns.map((col) => (
                <TableHead key={col.header} className="px-4 py-3 font-semibold text-gray-700 whitespace-nowrap text-center">
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={row.id} className={`transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-blue-100`}>
                {columns.map((col, i) => (
                  <TableCell key={col.header} className="px-4 py-3 border-b border-gray-300 text-sm overflow-hidden text-ellipsis whitespace-nowrap min-w-[100px] text-center">
                    {col.cell
                      ? col.cell({ row })
                      : row[col.accessorKey] !== undefined
                        ? row[col.accessorKey].toString()
                        : ""}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default function ListaTickets() {
  return (
    <div className="p-4">
      {/* Container superior */}
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
          <FaTicketAlt size={64} color="#000" style={{ marginRight: "10px", display:"flex", marginBottom:"10px"}} />
          <span style={{ fontSize: "24px", fontWeight: "bold" }}>Lista de Tickets</span>
        </div>
        <div style={{ textAlign: "right", fontSize: "16px", color: "#333" }}>
          <span style={{ fontWeight: "bold" }}>Empresa</span> | Juan Pérez &nbsp;
          <span style={{ color: "#888" }}>Cargo: Administrador</span>
        </div>
      </div>
      <DataTableTickets />
    </div>
  );
}