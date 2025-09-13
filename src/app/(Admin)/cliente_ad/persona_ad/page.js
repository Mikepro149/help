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
            <h3 className="text-lg font-semibold mb-2">Contactos de referencia</h3>
            <table className="w-full table-auto border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-2">Nombre</th>
                  <th className="p-2">Dirección</th>
                  <th className="p-2">Correo</th>
                  <th className="p-2">Teléfono</th>
                  <th className="p-2 flex items-center justify-between">
                    <span>Cargo</span>
                    <button
                      className="bg-blue-600 text-white px-2 py-1 rounded font-bold text-sm"
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
                    <td className="p-2">{c.nombre}</td>
                    <td className="p-2">{c.direccion}</td>
                    <td className="p-2">{c.correo}</td>
                    <td className="p-2">{c.telefono}</td>
                    <td className="p-2">{c.cargo}</td>
                  </tr>
                ))}

                {mostrarFilaContacto && (
                  <tr className="border-t bg-[#f0faff]">
                    {['nombre', 'direccion', 'correo', 'telefono', 'cargo'].map((field) => (
                      <td key={field} className="p-2">
                        <input
                          name={field}
                          className="w-full p-1 rounded border border-gray-300"
                          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                          value={nuevoContacto[field]}
                          onChange={(e) => setNuevoContacto({ ...nuevoContacto, [field]: e.target.value })}
                        />
                      </td>
                    ))}
                    <td className="p-2 flex gap-2 items-end">
                      <button
                        className="bg-green-600 text-white px-3 py-1 rounded font-semibold"
                        onClick={() => {
                          const incompleto = Object.values(nuevoContacto).some((v) => v.trim() === '');
                          if (incompleto) return alert('Completa todos los campos del contacto');
                          setContactos([...contactos, nuevoContacto]);
                          setNuevoContacto({ nombre: '', direccion: '', correo: '', telefono: '', cargo: '' });
                          setMostrarFilaContacto(false);
                        }}
                      >
                        Guardar
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded font-semibold"
                        onClick={() => {
                          setNuevoContacto({ nombre: '', direccion: '', correo: '', telefono: '', cargo: '' });
                          setMostrarFilaContacto(false);
                        }}
                      >
                        Cancelar
                      </button>
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
          onClick={onPrev}
          disabled={step === 0}
          className={`px-6 py-2 rounded-lg font-bold ${step === 0 ? 'bg-gray-300' : 'bg-orange-500 text-white'}`}
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
