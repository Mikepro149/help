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
    id: "chat",
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

  // Estados para cada filtro
  const [search, setSearch] = React.useState("");
  const [estado, setEstado] = React.useState("todos");
  const [id, setId] = React.useState("todos");
  const [tipo, setTipo] = React.useState("todos");
  const [area, setArea] = React.useState("todos");
  const [prioridad, setPrioridad] = React.useState("todos");
  const [soporte, setSoporte] = React.useState("todos");

  // Opciones para los selects
  const idOptions = ["todos", ...data.map(d => d.id)];
  const tipoOptions = ["todos", "red", "impresoras", "licencias", "laptops", "mantenimiento", "asesoria"];
  const areaOptions = ["todos", ...Array.from(new Set(data.map(d => d.area)))];
  const prioridadOptions = ["todos", "Alta", "Media", "Baja"];
  const soporteOptions = ["todos", "sí", "no"];

  // Filtro de datos
  const filteredData = data.filter((row) => {
    // Filtro de búsqueda global
    const matchesSearch = Object.values(row)
      .some((val) => val?.toString().toLowerCase().includes(search.toLowerCase()));

    // Filtros individuales
    const matchesId = id === "todos" ? true : row.id === id;
    const matchesTipo = tipo === "todos" ? true : row.tipo.toLowerCase() === tipo.toLowerCase();
    const matchesArea = area === "todos" ? true : row.area.toLowerCase() === area.toLowerCase();
    const matchesEstado = estado === "todos" ? true : row.estado.toLowerCase() === estado.toLowerCase();
    const matchesPrioridad = prioridad === "todos" ? true : row.prioridad.toLowerCase() === prioridad.toLowerCase();
    const matchesSoporte = soporte === "todos" ? true : (soporte === "sí" ? row.soporte === true : row.soporte === false);

    return matchesSearch && matchesId && matchesTipo && matchesArea && matchesEstado && matchesPrioridad && matchesSoporte;
  });

  return (
    <div className="w-full overflow-hidden font-[Poppins]">
      {/* Barra de búsqueda y filtros avanzados */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-1/4 min-w-[180px]"
        />
        <select value={id} onChange={e => setId(e.target.value)} className="border border-gray-300 rounded px-3 py-2">
          {idOptions.map(opt => <option key={opt} value={opt}>{opt === "todos" ? "Todos los ID" : opt}</option>)}
        </select>
        <select value={tipo} onChange={e => setTipo(e.target.value)} className="border border-gray-300 rounded px-3 py-2">
          {tipoOptions.map(opt => <option key={opt} value={opt}>{opt === "todos" ? "Todos los tipos" : opt.charAt(0).toUpperCase() + opt.slice(1)}</option>)}
        </select>
        <select value={area} onChange={e => setArea(e.target.value)} className="border border-gray-300 rounded px-3 py-2">
          {areaOptions.map(opt => <option key={opt} value={opt}>{opt === "todos" ? "Todas las áreas" : opt}</option>)}
        </select>
        <select value={estado} onChange={e => setEstado(e.target.value)} className="border border-gray-300 rounded px-3 py-2">
          <option value="todos">Todos los estados</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
        <select value={prioridad} onChange={e => setPrioridad(e.target.value)} className="border border-gray-300 rounded px-3 py-2">
          {prioridadOptions.map(opt => <option key={opt} value={opt}>{opt === "todos" ? "Todas las prioridades" : opt}</option>)}
        </select>
        <select value={soporte} onChange={e => setSoporte(e.target.value)} className="border border-gray-300 rounded px-3 py-2">
          {soporteOptions.map(opt => <option key={opt} value={opt}>{opt === "todos" ? "Soporte in Situ" : opt.charAt(0).toUpperCase() + opt.slice(1)}</option>)}
        </select>
      </div>

      {/* Tabla */}
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
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <TableRow key={row.id} className={`transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-blue-100`}>
                  {columns.map((col) => (
                    <TableCell key={col.header} className="px-4 py-3 border-b border-gray-300 text-sm text-center">
                      {col.cell
                        ? col.cell({ row })
                        : row[col.accessorKey] !== undefined
                          ? row[col.accessorKey].toString()
                          : ""}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-4 text-gray-500">
                  No se encontraron resultados
                </TableCell>
              </TableRow>
            )}
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
