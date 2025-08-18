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
  ArrowUpDown, 
  ChevronDown, 
  MoreHorizontal,
  Mail,
  Search,
  Ticket,
  Check,
  ChevronsUpDown,
 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

// ---------------------
// DATA DEMO
// ---------------------
const data = [
  {
    id: "1",
    ticket: "wbndjhdfjk",
    pin: "12345",
    incidente: "asjkajs",
    usuario: "Alberto Perez",
    empresa: "A",
    area: "TI",
    sucursal: "Independencia",
    estado: "Activo",
    fecha: "04 Ago 2024",
  },
  {
    id: "2",
    ticket: "wbndjhdfjk",
    pin: "12345",
    incidente: "asjkajs2",
    usuario: "Alberto Perez",
    empresa: "A",
    area: "TI",
    sucursal: "Independencia",
    estado: "Inactivo",
    fecha: "04 Ago 2024",
  },
]

// ---------------------
// COMBOBOX
// ---------------------
const frameworks = [
  { value: "area1", label: "Area 1" },
  { value: "area2", label: "Area 2" },
  { value: "area3", label: "Area 3" },
]

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Seleccionar tipo..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar..." className="h-9" />
          <CommandList>
            <CommandEmpty>No encontrado.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

// ---------------------
// COLUMNS
// ---------------------
export const columns = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "pin",
    header: "Pin",
    cell: ({ row }) => <div>{row.getValue("pin")}</div>,
  },
  {
    accessorKey: "ticket",
    header: "Ticket",
    cell: ({ row }) => <div>{row.getValue("ticket")}</div>,
  },
  {
    accessorKey: "incidente",
    header: "Tipo de incidente",
    cell: ({ row }) => <div>{row.getValue("incidente")}</div>,
  },
    {
    accessorKey: "usuario",
    header: "Usuario",
    cell: ({ row }) => <div>{row.getValue("usuario")}</div>,
  },
    {
    accessorKey: "empresa",
    header: "Empresa",
    cell: ({ row }) => <div>{row.getValue("empresa")}</div>,
  },
    {
    accessorKey: "area",
    header: "Area",
    cell: ({ row }) => <div>{row.getValue("area")}</div>,
  },
    {
    accessorKey: "sucursal",
    header: "Sucursal",
    cell: ({ row }) => <div>{row.getValue("sucursal")}</div>,
  },
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
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[estado] || "bg-gray-100 text-gray-800"}`}>
        {row.getValue("estado")}
      </span>
    )
  },
},
{
  accessorKey: "fecha",
  header: "Fecha de Reg.",
  cell: ({ row }) => <span className="capitalize">{row.getValue("fecha")}</span>,
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
]

// ---------------------
// PAGE
// ---------------------
export default function Page() {
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
      {/* Header */}
      <div className="w-full flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-2">
          <Ticket className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-semibold">Tickets Activos</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-sm font-medium text-gray-700">
            Usuario: Alberto Pérez
          </span>
          <span className="text-xs text-gray-500">Soporte Técnico</span>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-4 py-4 px-6">
        {/* Input con lupa */}
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar Tipo de Incidente"
            value={table.getColumn("incidente")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("incidente")?.setFilterValue(event.target.value)
            }
            className="pl-8"
          />
        </div>

        {/* Combobox */}
        <ComboboxDemo />
      </div>

      {/* Tabla */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
