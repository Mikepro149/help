"use client";

import DialogCn from "@/components/shared/dialogcn_prueba";
import { TabsCn } from "@/components/shared/tabscn";
import { useState } from "react";
import TicketsTable from "@/components/shared/tablecn_component";
import { Building2, FileSearch } from 'lucide-react'
import Link from "next/link";

// -----------------
// DATA
// -----------------
const data = [
  {
    ruc: "19283746443",
    nombre: "Maco Lopez",
    n_sucursales: "6",
    n_trabajadores: "12",
    equipos_registro: "10",
    n_plan: "1",
  },
  {
    ruc: "203838474",
    nombre: "Maco Lopez 1",
    n_sucursales: "3",
    n_trabajadores: "2",
    equipos_registro: "7",
    n_plan: "3",
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
    { accessorKey: "ruc", header: "RUC" },
    { accessorKey: "nombre", header: "Nombre" },
    { accessorKey: "n_sucursales", header: "N° Sucursales" },
    { accessorKey: "n_trabajadores", header: "N° Trabajadores" },
    { accessorKey: "equipos_registro", header: "Equipos Registrados" },
    { accessorKey: "n_plan", header: "N° Plan" },
    {
    accessorKey: "acciones",
    header: "",
    cell: () => (
        <div className="flex justify-center">
        <Link
            href="emp_ti_emp/equipo_emp_ti" // 👈 tu ruta simple
            className="text-black-600 hover:text-black-800"
        >
            <FileSearch size={20} />
        </Link>
        </div>
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
          <Building2 size={32} style={{ marginRight: "15px" }} />
          <span style={{ fontSize: "24px", fontWeight: "bold" }}>
            Empresa
          </span>
        </div>
        <div style={{ textAlign: "right", fontSize: "16px", color: "#333" }}>
          <span style={{ fontWeight: "bold" }}>J&P PERIFERICOS</span> | Carlos Manuel, Perez Diaz &nbsp;
          <span style={{ color: "#888" }}>Administrador</span>
        </div>
      </div>

      {/* Tabla */}
      <TicketsTable data={data} columns={columns} />
    </div>
  );
}
