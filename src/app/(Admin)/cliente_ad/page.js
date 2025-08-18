"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const data = [
  {
    id: "m5gr84i9",
    ruc: 316,
    empresa: "Tech Solutions",
    direccion: "Av. Siempre Viva 123",
    nombre: "Juan Pérez",
    telefono: "987654321",
    correo: "juanperez@empresa.com",
    plan: "Premium",
    equipos: 15,
  },
  {
    id: "k2jh12f0",
    ruc: 120,
    empresa: "Servicios Globales",
    direccion: "Calle Falsa 456",
    nombre: "María López",
    telefono: "912345678",
    correo: "maria@servicios.com",
    plan: "Básico",
    equipos: 5,
  },
]

const columns = [
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
      <Button
        size="sm"
        className="bg-green-600 text-white hover:bg-green-700"
        onClick={() => {
          window.location.href = `/cliente_ad/${row.original.id}`;
        }}
      >
        <Plus className="w-4 h-4 mr-1" />
        Agregar
      </Button>
    ),
  },
];

function DataTableDemo() {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
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
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default function Clientes() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>
      <DataTableDemo />
    </div>
  )
}
