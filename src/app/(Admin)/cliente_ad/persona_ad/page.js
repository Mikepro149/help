"use client";

import { useState } from "react";
import DialogCn from "@/components/shared/dialogcn_prueba";
import { TabsCn } from "@/components/shared/tabscn";
import EditableTable from "@/components/shared/edittablecn";
import { Users } from "lucide-react";

export default function RegistrarClienteNatural() {
  const steps = ["Datos Personales", "Contactos", "Datos de acceso"];

  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(true); // 🔑 se abre el modal al iniciar

  // -----------------
  // ESTADOS
  // -----------------
  const [datosPersonales, setDatosPersonales] = useState({
    nombre: "",
    dni: "",
    telefono: "",
    plan: "",
    correo: "",
    foto: null,
  });

  const [contactos, setContactos] = useState([]);
  const [nuevoContacto, setNuevoContacto] = useState({
    nombre: "",
    direccion: "",
    correo: "",
    telefono: "",
    cargo: "",
  });

  const [acceso, setAcceso] = useState({
    correo: "",
    contraseña: "",
    confirmar: "",
  });

  // -----------------
  // FUNCIONES
  // -----------------
  const onSubmit = () => {
    if (!acceso.correo || !acceso.contraseña || acceso.contraseña !== acceso.confirmar) {
      alert("⚠️ Verifica los datos de acceso antes de registrar.");
      return;
    }

    const datos = { datosPersonales, contactos, acceso };
    console.log("Cliente natural registrado:", datos);
    alert("✅ Cliente registrado correctamente.");
    setOpen(false);
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{
          maxWidth: "window",
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
          <span style={{ fontWeight: "bold" }}>J&P PERIFERICOS</span> | Carlos Manuel, Perez Diaz &nbsp;
          <span style={{ color: "#888" }}>Administrador</span>
        </div>
      </div>

      {/* Modal principal */}
      <DialogCn
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) setStep(0);
        }}
        title="Registrar Persona Natural"
        description=""
      >
        <div className="space-y-6">
          {/* Tabs */}
          <TabsCn steps={steps} currentStep={step} onStepChange={setStep} />

          {/* Paso 0: Datos Personales */}
          {step === 0 && (
            <section className="grid grid-cols-2 gap-4">
              {["nombre", "dni", "telefono", "plan", "correo"].map((field) => (
                <input
                  key={field}
                  name={field}
                  className="p-2 rounded border border-gray-300"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={datosPersonales[field]}
                  onChange={(e) =>
                    setDatosPersonales({ ...datosPersonales, [field]: e.target.value })
                  }
                />
              ))}

          {/* Foto */}
<div className="col-span-2">
  <label className="block mb-2 text-sm font-semibold text-gray-700">
    Foto de Perfil
  </label>
  <div className="flex items-center gap-4">
    {/* Botón personalizado */}
    <label
      htmlFor="foto"
      className="cursor-pointer bg-orange-100 text-gray-800 px-4 py-2 rounded-lg font-medium shadow hover:bg-orange-200 transition"
    >
      📁 Seleccionar Archivo
    </label>
    <span className="text-sm text-gray-500">
      {datosPersonales.foto ? datosPersonales.foto.name : "No se ha seleccionado ningún archivo"}
    </span>
  </div>

  {/* Input oculto */}
  <input
    id="foto"
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) =>
      setDatosPersonales({ ...datosPersonales, foto: e.target.files[0] })
    }
  />

  {/* Vista previa */}
  {datosPersonales.foto && (
    <div className="mt-4">
      <img
        src={URL.createObjectURL(datosPersonales.foto)}
        alt="Vista previa"
        className="h-24 w-24 object-cover rounded-full border border-gray-300 shadow-sm"
      />
    </div>
  )}
</div>

            </section>
          )}

          {/* Paso 1: Contactos */}
          {step === 1 && (
            <EditableTable
              title="Contactos"
              columns={["nombre", "direccion", "correo", "telefono", "cargo"]}
              data={contactos}
              setData={setContactos}
              newRow={nuevoContacto}
              setNewRow={setNuevoContacto}
            />
          )}

          {/* Paso 2: Acceso */}
          {step === 2 && (
            <section className="space-y-4">
              <input
                name="correo"
                className="w-full p-2 rounded border border-gray-300"
                placeholder="Correo"
                value={acceso.correo}
                onChange={(e) => setAcceso({ ...acceso, correo: e.target.value })}
              />
              <input
                name="contraseña"
                type="password"
                className="w-full p-2 rounded border border-gray-300"
                placeholder="Contraseña"
                value={acceso.contraseña}
                onChange={(e) => setAcceso({ ...acceso, contraseña: e.target.value })}
              />
              <input
                name="confirmar"
                type="password"
                className="w-full p-2 rounded border border-gray-300"
                placeholder="Confirmar Contraseña"
                value={acceso.confirmar}
                onChange={(e) => setAcceso({ ...acceso, confirmar: e.target.value })}
              />
              {acceso.contraseña &&
                acceso.confirmar &&
                acceso.contraseña !== acceso.confirmar && (
                  <p className="text-red-500 text-sm">Las contraseñas no coinciden.</p>
                )}
            </section>
          )}
        </div>

        {/* Footer botones */}
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

          {step < steps.length - 1 ? (
            <button
              onClick={() => setStep((prev) => Math.min(prev + 1, steps.length - 1))}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Siguiente
            </button>
          ) : (
            <button
              onClick={onSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Registrar
            </button>
          )}
        </div>
      </DialogCn>
    </div>
  );
}
