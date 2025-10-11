"use client";
import { useState } from "react";
import DialogCn from "@/components/shared/dialogcn_prueba";
import { TabsCn } from "@/components/shared/tabscn";
import TicketsTable from "@/components/shared/tablecn_component";

export default function ModalEmpresa({
  open,
  setOpen,
  selectedRow,
  setSecondTableData,
  setSecondTableColumns,
  setSecondOpen,
}) {
  const steps = ["Empresa", "Contacto", "Sucursal", "Datos de Acceso"];
  const [step, setStep] = useState(0);

  return (
    <>
      {/* Modal global */}
      <DialogCn
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) setStep(0); // 🔑 cada vez que se cierra vuelve al primer tab
        }}
        title={selectedRow ? selectedRow.empresa : "Empresa"} // enlazar a la base de datos
        description=""
      >
        <div className="space-y-6">
          {/* Tabs */}
          <TabsCn
            steps={steps}
            currentStep={step}
            onStepChange={(newIndex) => setStep(newIndex)}
          />

          {/* Contenido dinámico */}
          {step === 0 && (
            <div className="space-y-6">
              {/* 🔶 Fila 1: Inputs */}
              <div className="grid grid-cols-3 gap-4">
                {/* Empresa */}
                <div className="flex flex-col">
                  <label
                    htmlFor="empresa"
                    className="text-lg font-bold text-gray-700"
                  >
                    Nombre Empresa:
                  </label>
                  <input
                    id="nombre_emp"
                    value="Alberto PC"
                    type="text"
                    className="p-2 border border-gray-300 rounded-md"
                    readOnly
                  />
                </div>

                {/* RUC */}
                <div className="flex flex-col">
                  <label
                    htmlFor="ruc_emp"
                    className="text-lg font-bold text-gray-700"
                  >
                    RUC:
                  </label>
                  <input
                    id="ruc_emp"
                    value="2083746443"
                    type="number"
                    className="p-2 border border-gray-300 rounded-md"
                    readOnly
                  />
                </div>

                {/* Direccion */}
                <div className="flex flex-col">
                  <label
                    htmlFor="direccion_emp"
                    className="text-lg font-bold text-gray-700"
                  >
                    Direccion:
                  </label>
                  <input
                    id="direccion_emp"
                    value="Jr. Los Jazmines 123"
                    type="text"
                    className="p-2 border border-gray-300 rounded-md"
                    readOnly
                  />
                </div>
              </div>

              {/* 🔷 Fila 2: Tabla */}
              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="contactos_emp"
                    className="text-lg font-bold text-gray-700"
                  >
                    Contactos de referencia
                  </label>
                  <div className="overflow-x-auto border rounded-md">
                    <table className="min-w-full text-sm border-collapse">
                      <tbody>
                        <tr>
                          <td className="px-4 py-2 border">Jimena Gomez</td>
                          <td className="px-4 py-2 border">
                            Calle Arquitecto Eduardo Ordoñez 260, San Borja
                            15306
                          </td>
                          <td className="px-4 py-2 border">jime@gmail.com</td>
                          <td className="px-4 py-2 border">987654543</td>
                          <td className="px-4 py-2 border">
                            Atencion Cliente
                          </td>
                          <td className="px-4 py-2 border text-center">
                            <input type="checkbox" />
                          </td>
                        </tr>
                      </tbody>
                      <tbody>
                        <tr>
                          <td className="px-4 py-2 border">Aaaaa</td>
                          <td className="px-4 py-2 border">Av. fffff</td>
                          <td className="px-4 py-2 border">tttt@gmail.com</td>
                          <td className="px-4 py-2 border">9123221345</td>
                          <td className="px-4 py-2 border">Administración</td>
                          <td className="px-4 py-2 border text-center">
                            <input type="checkbox" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <TicketsTable
                data={[
                  {
                    nombre: "Jimena Gomez",
                    direccion:
                      "Calle Arquitecto Eduardo Ordoñez 260, San Borja 15306",
                    correo: "jime@gmail.com",
                    telefono: 987654321,
                    area: "Atencion Cliente",
                  },
                  {
                    nombre: "Aaaaaa",
                    direccion: "Av. fffff",
                    correo: "ttt@gmail.com",
                    telefono: 987654543,
                    area: "Administración",
                  },
                ]}
                columns={[
                  { accessorKey: "nombre", header: "Nombre" },
                  { accessorKey: "direccion", header: "Dirección" },
                  { accessorKey: "correo", header: "Correo" },
                  { accessorKey: "telefono", header: "Teléfono" },
                  { accessorKey: "area", header: "Área" },
                ]}
              />
            </div>
          )}

          {step === 2 && (
            <div className="overflow-x-auto border rounded-md">
              <TicketsTable
                data={[
                  {
                    id: 1,
                    sucursal: "San Isidro",
                    direccion: "Av. Javier Prado Este 2465, San Borja 15021",
                    contacto: "Ing Carlos",
                    telefono: 987654321,
                    correo: "@@gmail.com",
                  },
                  {
                    id: 2,
                    sucursal: "Jesus María",
                    direccion:
                      "Av. de la Arqueología 206, San Luis Lima 30",
                    contacto: "Daniela",
                    telefono: 912345678,
                    correo: "ttt@gmail.com",
                  },
                ]}
                columns={[
                  { accessorKey: "sucursal", header: "Sucursal" },
                  { accessorKey: "direccion", header: "Direccion" },
                  { accessorKey: "contacto", header: "Contacto" },
                  { accessorKey: "telefono", header: "Telefono" },
                  { accessorKey: "correo", header: "Correo" },
                ]}
                onRowClick={(row) => {
                  if (row.id === 2) {
                    setSecondTableData([
                      {
                        area: "Administración",
                        contacto: "Adrian",
                        telefono: 975645321,
                        correo: "aaaa@",
                      },
                      {
                        area: "Diseño",
                        contacto: "Maria",
                        telefono: 964532121,
                        correo: "aaaa@",
                      },
                    ]);
                    setSecondTableColumns([
                      { accessorKey: "area", header: "Area" },
                      { accessorKey: "contacto", header: "Contacto" },
                      { accessorKey: "telefono", header: "Telefono" },
                      { accessorKey: "correo", header: "Correo" },
                    ]);
                  } else {
                    setSecondTableData([
                      { empleado: "Juan Pérez", cargo: "Vendedor" },
                      { empleado: "Ana Torres", cargo: "Soporte" },
                    ]);
                    setSecondTableColumns([
                      { accessorKey: "empleado", header: "Empleado" },
                      { accessorKey: "cargo", header: "Cargo" },
                    ]);
                  }
                  setSecondOpen(true);
                }}
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="correo_acceso"
                    className="text-lg font-bold text-gray-700"
                  >
                    Correo Electrónico:
                  </label>
                  <input
                    id="correo_acceso"
                    placeholder="Correo electronico"
                    type="text"
                    className="p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="contra_acceso"
                    className="text-lg font-bold text-gray-700"
                  >
                    Contraseña:
                  </label>
                  <input
                    id="contra_acceso"
                    placeholder="************"
                    type="password"
                    className="p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-8">
          {step === 0 ? (
            <button
              onClick={() => setOpen(false)}
              className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Cancelar
            </button>
          ) : (
            <button
              onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
              className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
            >
              Atrás
            </button>
          )}

          <button
            onClick={() => setStep((prev) => Math.min(prev + 1, steps.length - 1))}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Guardar
          </button>
        </div>
      </DialogCn>
    </>
  );
}
