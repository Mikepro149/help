"use client";
import { useState } from "react";
import { Upload } from "lucide-react";
import DialogCn from "@/components/shared/dialogcn_prueba";
import { TabsCn } from "@/components/shared/tabscn";
import TicketsTable from "@/components/shared/tablecn_component";

export default function ModalPersona({
  openPersona,
  setOpenPersona,
  selectedRow,
}) {
  const [step, setStep] = useState(0);
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState(null);

  const stepsPersona = ["Datos Personales", "Referencias", "Acceso"];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <>  
      {/* ---------- MODAL PERSONA ---------- */}
      <DialogCn
        open={openPersona}
        onOpenChange={(isOpen) => {
          setOpenPersona(isOpen);
          if (!isOpen) {
            // ✅ Limpiar datos al cerrar
            setFileName("");
            setPreview(null);
            setStep(0); // volver al primer tab
          }
        }}
        title={selectedRow ? selectedRow.nombre : "Cliente Persona"}
        description=""
      >
        <div className="space-y-6">
          {/* ---------- TABS ---------- */}
          <TabsCn steps={stepsPersona} currentStep={step} onStepChange={setStep} />

          {/* ---------- CONTENIDO DEL STEP 0 ---------- */}
          {step === 0 && (
            <div className="space-y-6">
              {/* 🔶 Fila 1: Inputs */}
              <div className="grid grid-cols-3 gap-4">
                {/* Nombre */}
                <div className="flex flex-col">
                  <label htmlFor="persona" className="text-lg font-bold text-gray-700">
                    Nombre:
                  </label>
                  <input
                    id="nombre_per"
                    value="Ana Maria Cortez"
                    type="text"
                    className="p-2 border border-gray-300 rounded-md"
                    readOnly
                  />
                </div>

                {/* Teléfono */}
                <div className="flex flex-col">
                  <label htmlFor="tel_per" className="text-lg font-bold text-gray-700">
                    Teléfono:
                  </label>
                  <input
                    id="tel_per"
                    value="987654321"
                    type="number"
                    className="p-2 border border-gray-300 rounded-md"
                    readOnly
                  />
                </div>

                {/* Correo */}
                <div className="flex flex-col">
                  <label htmlFor="correo_per" className="text-lg font-bold text-gray-700">
                    Correo:
                  </label>
                  <input
                    id="correo_per"
                    value="asda@gmial.com"
                    type="text"
                    className="p-2 border border-gray-300 rounded-md"
                    readOnly
                  />
                </div>

                {/* DNI */}
                <div className="flex flex-col">
                  <label htmlFor="dni_per" className="text-lg font-bold text-gray-700">
                    DNI:
                  </label>
                  <input
                    id="dni_per"
                    value="87656798"
                    type="number"
                    className="p-2 border border-gray-300 rounded-md"
                    readOnly
                  />
                </div>

                {/* Foto de perfil */}
                <div className="flex flex-col">
                  <label htmlFor="foto_per" className="text-lg font-bold text-gray-700">
                    Foto de perfil:
                  </label>

                  <label htmlFor="foto_per" className="upload-button flex items-center gap-2 cursor-pointer text-blue-600">
                    <Upload className="upload-icon" />
                    <span>{fileName ? fileName : "Seleccionar archivo..."}</span>
                  </label>

                  <input
                    id="foto_per"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {preview && (
                    <img
                      src={preview}
                      alt="Vista previa"
                      className="mt-2 rounded-md w-32 h-32 object-cover border"
                    />
                  )}
                </div>
              </div>

              {/* 🔷 Fila 2: Tabla de contactos */}
              <div className="flex flex-col">
                <label className="text-lg font-bold text-gray-700">
                  Contactos de referencia
                </label>
                <div className="overflow-x-auto border rounded-md">
                  <table className="min-w-full text-sm border-collapse">
                    <tbody>
                      <tr>
                        <td className="px-4 py-2 border">Aaaaa</td>
                        <td className="px-4 py-2 border">Av. fffff</td>
                        <td className="px-4 py-2 border">tttt@gmail.com</td>
                        <td className="px-4 py-2 border">9123221345</td>
                        <td className="px-4 py-2 border">Atención Cliente</td>
                        <td className="px-4 py-2 border text-center">
                          <input type="checkbox" />
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border">Carlos Daniel</td>
                        <td className="px-4 py-2 border">
                          Av. Mexico con la unión dptm 1405
                        </td>
                        <td className="px-4 py-2 border">@@gmail.com</td>
                        <td className="px-4 py-2 border">987654321</td>
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
          )}

          {/* ---------- CONTENIDO DEL STEP 1 ---------- */}
          {step === 1 && (
            <TicketsTable
              data={[
                {
                  nombre: "Carlos Daniel",
                  direccion: "Av. Mexico con la union dptm 140",
                  correo: "@@gmail.com",
                  telefono: 987654321,
                  area: "Administración",
                },
                {
                  nombre: "Aaaaaa",
                  direccion: "Av. fffff",
                  correo: "ttt@gmail.com",
                  telefono: 987654543,
                  area: "Atención Cliente",
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
          )}

          {/* ---------- CONTENIDO DEL STEP 2 ---------- */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                {/* Correo de acceso */}
                <div className="flex flex-col">
                  <label
                    htmlFor="correo_acceso"
                    className="text-lg font-bold text-gray-700"
                  >
                    Correo Electrónico:
                  </label>
                  <input
                    id="correo_acceso"
                    placeholder="Correo electrónico"
                    type="text"
                    className="p-2 border border-gray-300 rounded-md"
                  />
                </div>

                {/* Contraseña */}
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

        {/* ---------- BOTONES DE NAVEGACIÓN ---------- */}
        <div className="flex justify-between mt-8">
          {/* Botón izquierdo */}
          {step === 0 ? (
            <button
              onClick={() => setOpenPersona(false)}
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

          {/* Botón derecho */}
          <button
            onClick={() =>
              setStep((prev) => Math.min(prev + 1, stepsPersona.length - 1))
            }
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Guardar
          </button>
        </div>
      </DialogCn>
    </>
  );
}
