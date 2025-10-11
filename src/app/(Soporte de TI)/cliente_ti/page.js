"use client";

import { useState } from "react";
import TicketsTable from "@/components/shared/tablecn_component";
import { Users } from "lucide-react";
import ModalEmpresa from "./modals/Modalempresa";
import ModalPersona from "./modals/Modalpersona";
import DialogCn from "@/components/shared/dialogcn_prueba";

const dataEmpresa = [
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
  },
];

const dataPersona = [
  {
    id: 1,
    dni: 987654321,
    nombre: "Ana Maria Corteza",
    telefono: 987456321,
    correo: "asda@gmail.com",
  },
  {
    id: 2,
    dni: 75642312,
    nombre: "Luis Torres",
    telefono: 954123654,
    correo: "luis@gmail.com",
  },
];

export default function EditarEquipoEmpresaAD() {
  const [openEmpresa, setOpenEmpresa] = useState(false);
  const [openPersona, setOpenPersona] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [secondOpen, setSecondOpen] = useState(false);
  const [secondTableData, setSecondTableData] = useState([]);
  const [secondTableColumns, setSecondTableColumns] = useState([]);
  const [secondTitle, setSecondTitle] = useState(""); // 👈 nuevo

  const [tipoTabla, setTipoTabla] = useState("empresa");

  const columnsEmpresa = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "ruc", header: "RUC" },
    { accessorKey: "empresa", header: "Empresa" },
    { accessorKey: "direccion", header: "Dirección" },
    { accessorKey: "nombre", header: "Nombre" },
    { accessorKey: "telefono", header: "Teléfono" },
    { accessorKey: "correo", header: "Correo" },
    { accessorKey: "n_plan", header: "Plan" },
  ];

  const columnsPersona = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "dni", header: "DNI" },
    { accessorKey: "nombre", header: "Nombre" },
    { accessorKey: "telefono", header: "Teléfono" },
    { accessorKey: "correo", header: "Correo" },
  ];

  return (
    <div>
      {/* Header */}
      <div
        style={{
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
          <Users size={50} style={{ marginRight: "15px", marginLeft: "10px" }} />
          <span style={{ fontSize: "24px", fontWeight: "bold" }}>Clientes</span>
        </div>

        <div style={{ textAlign: "right", fontSize: "16px", color: "#333" }}>
          <span style={{ fontWeight: "bold" }}>J&P PERIFERICOS</span> | Carlos
          Manuel, Perez Diaz &nbsp;
          <span style={{ color: "#888" }}>Administrador</span>
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-4 mb-4 px-6">
        <button
          onClick={() => setTipoTabla("empresa")}
          className={`px-4 py-2 rounded-md text-white ${
            tipoTabla === "empresa"
              ? "bg-blue-600"
              : "bg-gray-400 hover:bg-gray-500"
          }`}
        >
          Empresa
        </button>

        <button
          onClick={() => setTipoTabla("persona")}
          className={`px-4 py-2 rounded-md text-white ${
            tipoTabla === "persona"
              ? "bg-blue-600"
              : "bg-gray-400 hover:bg-gray-500"
          }`}
        >
          Persona
        </button>
      </div>

      {/* Tabla principal */}
      <TicketsTable
        data={tipoTabla === "empresa" ? dataEmpresa : dataPersona}
        columns={tipoTabla === "empresa" ? columnsEmpresa : columnsPersona}
        onRowClick={(row) => {
          setSelectedRow(row);
          tipoTabla === "empresa"
            ? setOpenEmpresa(true)
            : setOpenPersona(true);
        }}
      />

      {/* Modal secundario dinámico */}
      <DialogCn
        open={secondOpen}
        onOpenChange={(isOpen) => setSecondOpen(isOpen)}
        title={secondTitle || "Detalles de sucursal"} // 👈 dinámico
        description=""
      >
        <TicketsTable data={secondTableData} columns={secondTableColumns} />
      </DialogCn>

      {/* Modales principales */}
      <ModalEmpresa
        open={openEmpresa}
        setOpen={setOpenEmpresa}
        selectedRow={selectedRow}
        setSecondTableData={setSecondTableData}
        setSecondTableColumns={setSecondTableColumns}
        setSecondOpen={setSecondOpen}
      />

      <ModalPersona
        openPersona={openPersona}
        setOpenPersona={setOpenPersona}
        selectedRow={selectedRow}
      />
    </div>
  );
}
