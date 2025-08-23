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
        className="bg-gray-200 text-gray-800 hover:bg-gray-300 px-2 py-1 rounded-md text-sm min-w-[32px] h-[32px] flex items-center justify-center"
        onClick={() => {
          window.location.href = `/cliente_ad/registro_empresa`;
        }}
      >
        <Plus className="w-4 h-4" />
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
    <div className="w-full overflow-hidden font-[Poppins]">
      <div className="overflow-x-auto border border-gray-300 rounded-lg bg-white">
        <Table className="min-w-[800px] text-center bg-white">
          <TableHeader className="sticky top-0 z-10 bg-orange-300">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-gray-300">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-4 py-3 font-semibold text-gray-700 whitespace-nowrap"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                className={`transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                } hover:bg-blue-100`}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="px-4 py-3 border-b border-gray-300 text-sm overflow-hidden text-ellipsis whitespace-nowrap min-w-[100px]"
                  >
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


export default function Clientes() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>
      <DataTableDemo />
    </div>
  )
}
