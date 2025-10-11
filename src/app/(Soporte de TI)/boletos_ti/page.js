"use client"

import { Search, Mail, ArrowUp } from "lucide-react"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import TicketsTable from "@/components/shared/tablecn_component"

// -----------------
// DATA
// -----------------
const data = [
  {
    id: "1",
    ticket: "wbndjhdfjk",
    pin: "12345",
    incidente: "Error en sistema",
    usuario: "Alberto Perez",
    empresa: "A",
    area: "TI",
    sucursal: "Independencia",
    estado: "Activo",
    fecha: "04 Ago 2024",
  },
  {
    id: "2",
    ticket: "asdasdasd",
    pin: "67890",
    incidente: "Falla de red",
    usuario: "María López",
    empresa: "B",
    area: "Ventas",
    sucursal: "San Isidro",
    estado: "Inactivo",
    fecha: "05 Ago 2024",
  },
]

// -----------------
// COLUMNS
// -----------------
const columns = [
  { accessorKey: "id", header: "Id" },
  { accessorKey: "pin", header: "Pin" },
  { accessorKey: "ticket", header: "Ticket" },
  { accessorKey: "incidente", header: "Tipo de incidente" },
  { accessorKey: "usuario", header: "Usuario" },
  { accessorKey: "empresa", header: "Empresa" },
  { accessorKey: "area", header: "Área" },
  { accessorKey: "sucursal", header: "Sucursal" },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      const estado = String(row.getValue("estado") || "").toLowerCase()
      const colors = {
        activo: "bg-green-100 text-green-800",
        inactivo: "bg-red-100 text-red-800",
        proceso: "bg-gray-100 text-blue-800",
      }
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            colors[estado] || "bg-gray-100 text-gray-800"
          }`}
        >
          {row.getValue("estado")}
        </span>
      )
    },
  },
  { accessorKey: "fecha", header: "Fecha de Reg." },
  {
    accessorKey: "prioridad",
    header: "Prioridad",
    cell: () => <ArrowUp className="h-5 w-5 text-red-600" />,
  },
  {
    accessorKey: "chat",
    header: "",
    cell: () => (
      <Link href="/boletos_ti/chat_ti">
        <Mail className="h-5 w-5 text-blue-600 cursor-pointer hover:text-blue-800" />
      </Link>
    ),
  },
  {
    accessorKey: "seleccion",
    header: (
      <div
        style={{
          lineHeight: "1.1",   // más compacto que el normal (~1.4)
          textAlign: "center", // opcional: centrado
        }}
      >
        Soporte <br /> In Situ
      </div>
    ),
    cell: () => (
      <Checkbox
        defaultChecked
        className="
          border-[#FFCA7F]
          bg-[#FFCA7F]
          text-black
          data-[state=unchecked]:bg-[#FFCA7F]
          data-[state=unchecked]:border-[#FFCA7F]
          data-[state=checked]:bg-[#FFCA7F]
          data-[state=checked]:border-[#FFCA7F]
          data-[state=checked]:text-black
        "
      />
    ),
  },
]

// -----------------
// PAGE
// -----------------
export default function Page() {
  return (
    <div
      style={{
        background: "#f7f7f7",
        minHeight: "100vh",
        fontFamily: "Poppins, sans-serif",
      }}
    >
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
          <span style={{ fontSize: "32px", marginRight: "15px" }}>🎫</span>
          <span style={{ fontSize: "24px", fontWeight: "bold" }}>
            Tickets Activos
          </span>
        </div>
        <div style={{ textAlign: "right", fontSize: "16px", color: "#333" }}>
          <span style={{ fontWeight: "bold" }}>Usuario</span> | Alberto Pérez &nbsp;
          <span style={{ color: "#888" }}>Cargo: Soporte Técnico</span>
        </div>
      </div>

      {/* Filtro */}
      <div className="flex items-center gap-4 py-4 px-6 max-w-[1200px] mx-auto">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input placeholder="Buscar Tipo de Incidente" className="pl-8" />
        </div>
      </div>

      {/* Tabla reutilizable */}
      <div className="px-6 max-w-[1600px] mx-auto">
        <TicketsTable data={data} columns={columns} />
      </div>
    </div>
  )
}