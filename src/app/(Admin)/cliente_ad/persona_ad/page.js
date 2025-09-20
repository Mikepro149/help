'use client';

import { useState } from 'react';
import { TabsCn } from '@/components/shared/tabscn';

const steps = ['Datos Personales', 'Contactos', 'Datos de acceso'];

export default function RegistrarClienteNatural() {
  const [step, setStep] = useState(0);

  const [datosPersonales, setDatosPersonales] = useState({
    nombre: '', dni: '', telefono: '', plan: '', correo: '', foto: null,
  });

  const [contactos, setContactos] = useState([]);
  const [nuevoContacto, setNuevoContacto] = useState({
    nombre: '', direccion: '', correo: '', telefono: '', cargo: '',
  });
  const [mostrarFilaContacto, setMostrarFilaContacto] = useState(false);

  const [acceso, setAcceso] = useState({ correo: '', contraseña: '', confirmar: '' });

  const onNext = () => step < steps.length - 1 && setStep(step + 1);
  const onPrev = () => step > 0 && setStep(step - 1);

  const onSubmit = () => {
    if (!acceso.correo || !acceso.contraseña || acceso.contraseña !== acceso.confirmar) {
      alert('Verifica los datos de acceso antes de registrar.');
      return;
    }

    const datos = { datosPersonales, contactos, acceso };
    console.log('Cliente registrado:', datos);
    alert('Cliente registrado correctamente.');
  };

  return (
    <div className="max-w-4xl mx-auto my-12 bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-center mb-6">Registrar Cliente - {steps[step]}</h2>

      <TabsCn steps={steps} currentStep={step} onStepChange={setStep} />

      <div className="mt-8">
        {/* Paso 0: Datos Personales */}
      {step === 0 && (
  <section className="grid grid-cols-2 gap-4">
    {['nombre', 'dni', 'telefono', 'plan', 'correo'].map((field) => (
      <input
        key={field}
        name={field}
        className="p-2 rounded border border-gray-300"
        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
        value={datosPersonales[field]}
        onChange={(e) => setDatosPersonales({ ...datosPersonales, [field]: e.target.value })}
      />
    ))}

    {/* Campo personalizado para Foto de Perfil */}
    <div className="col-span-2">
      <label className="block mb-2 text-sm font-semibold text-gray-700">Foto de Perfil:</label>
      <div className="flex items-center gap-4">
        <label
          htmlFor="foto"
          className="cursor-pointer bg-[#f5e9dc] text-gray-800 px-4 py-2 rounded-lg font-medium shadow hover:bg-[#e8d7c3] transition"
        >
          📁 Seleccionar Archivo
        </label>
        <span className="text-sm text-gray-500">
          {datosPersonales.foto ? datosPersonales.foto.name : 'No se ha seleccionado ningún archivo'}
        </span>
      </div>
      <input
        id="foto"
        type="file"
        name="foto"
        accept="image/*"
        className="hidden"
        onChange={(e) => setDatosPersonales({ ...datosPersonales, foto: e.target.files[0] })}
      />
      {datosPersonales.foto && (
        <img
          src={URL.createObjectURL(datosPersonales.foto)}
          alt="Vista previa"
          className="mt-4 h-24 w-24 object-cover rounded-full border border-gray-300"
        />
      )}
    </div>
  </section>
)}


        {/* Paso 1: Contactos */}
{step === 1 && (
  <section>
    <h3 className="text-lg font-semibold mb-4 text-[#1a3c34]">Contactos de referencia</h3>
    <table className="w-full table-auto border border-gray-300 rounded-lg overflow-hidden text-sm font-[Poppins]">
      <thead className="bg-[#f3f4f6] text-[#374151]">
        <tr>
          <th className="p-3">Nombre</th>
          <th className="p-3">Dirección</th>
          <th className="p-3">Correo</th>
          <th className="p-3">Teléfono</th>
          <th className="p-3">Cargo</th>
          <th className="p-3 text-center">Seleccionar</th>
          <th className="p-3 text-right">
            <button
              className="bg-[#34d399] text-white px-2 py-1 rounded font-bold text-sm hover:bg-[#2bbf89]"
              onClick={() => setMostrarFilaContacto(true)}
            >
              ➕
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {contactos.map((c, index) => (
          <tr key={index} className="border-t">
            <td className="p-3">{c.nombre}</td>
            <td className="p-3">{c.direccion}</td>
            <td className="p-3">{c.correo}</td>
            <td className="p-3">{c.telefono}</td>
            <td className="p-3">{c.cargo}</td>
            <td className="p-3 text-center">
              <input
                type="checkbox"
                checked={c.seleccionado || false}
                onChange={() => {
                  const actualizados = [...contactos]
                  actualizados[index].seleccionado = !actualizados[index].seleccionado
                  setContactos(actualizados)
                }}
                className="w-5 h-5 accent-[#34d399]"
              />
            </td>
            <td className="p-3 text-center text-gray-400">—</td>
          </tr>
        ))}

        {mostrarFilaContacto && (
          <tr className="border-t bg-[#f0faff] transition-all duration-300">
            {['nombre', 'direccion', 'correo', 'telefono', 'cargo'].map((field) => (
              <td key={field} className="p-3">
                <input
                  name={field}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a8d9ce] bg-white text-sm"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={nuevoContacto[field]}
                  onChange={(e) =>
                    setNuevoContacto({ ...nuevoContacto, [field]: e.target.value })
                  }
                />
              </td>
            ))}
            <td className="p-3 text-center">
              <input
                type="checkbox"
                checked={nuevoContacto.seleccionado || false}
                onChange={(e) =>
                  setNuevoContacto({ ...nuevoContacto, seleccionado: e.target.checked })
                }
                className="w-5 h-5 accent-[#34d399]"
              />
            </td>
            <td className="p-3">
              <div className="flex gap-2 justify-center">
                <button
                  className="bg-[#34d399] text-white px-3 py-1 rounded-md font-semibold hover:bg-[#2bbf89] transition"
                  onClick={() => {
                    const incompleto = ['nombre', 'direccion', 'correo', 'telefono', 'cargo']
                      .some((campo) => nuevoContacto[campo].trim() === '')
                    if (incompleto) return alert('Completa todos los campos del contacto')
                    setContactos([...contactos, nuevoContacto])
                    setNuevoContacto({
                      nombre: '',
                      direccion: '',
                      correo: '',
                      telefono: '',
                      cargo: '',
                      seleccionado: false
                    })
                    setMostrarFilaContacto(false)
                  }}
                >
                  Guardar
                </button>
                <button
                  className="bg-[#f87171] text-white px-3 py-1 rounded-md font-semibold hover:bg-[#ef4444] transition"
                  onClick={() => {
                    setNuevoContacto({
                      nombre: '',
                      direccion: '',
                      correo: '',
                      telefono: '',
                      cargo: '',
                      seleccionado: false
                    })
                    setMostrarFilaContacto(false)
                  }}
                >
                  Cancelar
                </button>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </section>
)}

        {/* Paso 2: Datos de acceso */}
        {step === 2 && (
          <section className="space-y-4">
            <input
              name="correo"
              className="w-full p-2 rounded border"
              placeholder="Correo"
              value={acceso.correo}
              onChange={(e) => setAcceso({ ...acceso, correo: e.target.value })}
            />
            <input
              name="contraseña"
              type="password"
              className="w-full p-2 rounded border"
              placeholder="Contraseña"
              value={acceso.contraseña}
              onChange={(e) => setAcceso({ ...acceso, contraseña: e.target.value })}
            />
            <input
              name="confirmar"
              type="password"
              className="w-full p-2 rounded border"
              placeholder="Confirmar Contraseña"
              value={acceso.confirmar}
              onChange={(e) => setAcceso({ ...acceso, confirmar: e.target.value })}
            />
            {acceso.contraseña && acceso.confirmar && acceso.contraseña !== acceso.confirmar && (
              <p className="text-red-500 text-sm">Las contraseñas no coinciden.</p>
            )}
          </section>
        )}
      </div>

      <div className="mt-8 flex justify-between">
       <button
  type="button"
  onClick={() => window.location.href = "/cliente_ad?tipo=persona"}
  className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg font-bold hover:bg-gray-400"
>
  Volver
</button>
        {step < steps.length - 1 ? (
          <button onClick={onNext} className="px-6 py-2 bg-orange-500 text-white rounded-lg font-bold">
            Siguiente
          </button>
        ) : (
          <button onClick={onSubmit} className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold">
            Registrar
          </button>
        )}
      </div>
    </div>
  );
}
