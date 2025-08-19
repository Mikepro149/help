"use client";

import { ButtonCn } from "@/components/shared/buttoncn";
import TableCn  from "@/components/shared/tablecn";
import DialogCn  from "@/components/shared/dialogcn";
import DropdownCn from "@/components/shared/dropdowncn";

import { useState } from "react";
import PaginationCn from "@/components/shared/paginationcn";

export default function planSoporte() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;


  const handleEdit = () => alert("Editar seleccionado");
  const handleDelete = () => alert("Eliminar seleccionado");

  const dropdownItems = [
    { label: "Editar", onSelect: handleEdit },
    { label: "Eliminar", onSelect: handleDelete },
  ];



    const columns = [
    { header: "Nombre", accessor: "name" },
    { header: "Correo", accessor: "email" },
    { header: "Rol", accessor: "role" },
  ];

  const data = [
    { name: "Juan", email: "juan@example.com", role: "Admin" },
    { name: "Ana", email: "ana@example.com", role: "Usuario" },
    { name: "Luis", email: "luis@example.com", role: "Soporte" },
  ];
  return (
    <div>
      <h1>Plan Soporte</h1>
      
      <ButtonCn
        label="Haz clic"
        onClick={() => alert("¡Hola desde el botón!")}
        variant="outline"
      />

      <TableCn columns={columns} data={data} />

      <DialogCn
        triggerLabel="Abrir modal"
        title="Título del modal"
        description="Esta es una descripción del diálogo"
      >
        <p>Este es el contenido dentro del modal.</p>
        <p>Puedes poner formularios, texto, botones, etc.</p>
      </DialogCn>

      <DropdownCn
        triggerLabel="Acciones"
        label="Opciones"
        items={dropdownItems}
      />


      <div className="mb-4">
        <p>Mostrando datos de la página {currentPage}...</p>
      </div>

      <PaginationCn
        page={currentPage}
        totalPages={totalPages}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
    </div>
  );
}