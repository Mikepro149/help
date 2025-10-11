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

  // 🔹 Función genérica para manejar cambios en inputs
  const handleChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Función unificada para agregar filas a tablas
  const agregarContacto = () => {
    const camposVacios = Object.values(nuevoContacto).some((v) => !v.trim());
    if (camposVacios) return alert('Completa todos los campos del contacto');
    
    setContactos([...contactos, { ...nuevoContacto, seleccionado: false }]);
    setNuevoContacto({ nombre: '', direccion: '', correo: '', telefono: '', cargo: '' });
    setMostrarFilaContacto(false);
  };

  const onSubmit = () => {
    if (!acceso.correo || !acceso.contraseña || acceso.contraseña !== acceso.confirmar)
      return alert('Verifica los datos de acceso antes de registrar.');

    console.log('Cliente registrado:', { datosPersonales, contactos, acceso });
    alert('Cliente registrado correctamente.');
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <section className="grid grid-cols-2 gap-4">
            {['nombre', 'dni', 'telefono', 'plan', 'correo'].map((field) => (
              <input
                key={field}
                name={field}
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={datosPersonales[field]}
                onChange={handleChange(setDatosPersonales)}
                className="w-full p-2 rounded border border-gray-300"
              />
            ))}
            <div className="col-span-2">
              <label className="block mb-2 font-semibold">Foto de Perfil:</label>
              <label 
                htmlFor="foto" 
                className="cursor-pointer bg-[#f5e9dc] px-4 py-2 rounded-lg font-medium shadow hover:bg-[#e8d7c3] transition inline-block"
              >
                📁 Seleccionar Archivo
              </label>
              <input
                id="foto"
                type="file"
                name="foto"
                accept="image/*"
                className="hidden"
                onChange={(e) => setDatosPersonales({ ...datosPersonales, foto: e.target.files[0] })}
              />
              <span className="ml-2 text-sm text-gray-500">
                {datosPersonales.foto ? datosPersonales.foto.name : 'No se ha seleccionado ningún archivo'}
              </span>
              {datosPersonales.foto && (
                <img 
                  src={URL.createObjectURL(datosPersonales.foto)} 
                  alt="Vista previa" 
                  className="mt-4 h-24 w-24 object-cover rounded-full border" 
                />
              )}
            </div>
          </section>
        );

      case 1:
        return (
          <TablaContactos
            contactos={contactos}
            setContactos={setContactos}
            nuevoContacto={nuevoContacto}
            setNuevoContacto={setNuevoContacto}
            mostrarFila={mostrarFilaContacto}
            setMostrarFila={setMostrarFilaContacto}
            onAgregar={agregarContacto}
          />
        );

      case 2:
        return (
          <section className="space-y-4">
            {['correo', 'contraseña', 'confirmar'].map((f) => (
              <input
                key={f}
                name={f}
                type={f.includes('contraseña') || f === 'confirmar' ? 'password' : 'text'}
                placeholder={f === 'confirmar' ? 'Confirmar Contraseña' : f.charAt(0).toUpperCase() + f.slice(1)}
                value={acceso[f]}
                onChange={handleChange(setAcceso)}
                className="w-full p-2 rounded border border-gray-300"
              />
            ))}
            {acceso.contraseña && acceso.confirmar && acceso.contraseña !== acceso.confirmar && (
              <p className="text-red-500 text-sm">Las contraseñas no coinciden.</p>
            )}
          </section>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-12 bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-center mb-6">
        Registrar Cliente - {steps[step]}
      </h2>
      
      <TabsCn steps={steps} currentStep={step} onStepChange={setStep} />
      
      <div className="mt-8">{renderStep()}</div>

      <div className="mt-8 flex justify-between">
        <button 
          onClick={() => window.location.href = "/cliente_ad?tipo=persona"} 
          className="px-6 py-2 bg-gray-300 rounded-lg font-bold hover:bg-gray-400"
        >
          Volver
        </button>
        <button
          onClick={step < steps.length - 1 ? () => setStep(step + 1) : onSubmit}
          className={`px-6 py-2 rounded-lg font-bold text-white ${
            step < steps.length - 1 ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {step < steps.length - 1 ? 'Siguiente' : 'Registrar'}
        </button>
      </div>
    </div>
  );
}

// 🔹 Componente separado para la tabla de contactos
function TablaContactos({ 
  contactos, 
  setContactos, 
  nuevoContacto, 
  setNuevoContacto, 
  mostrarFila, 
  setMostrarFila, 
  onAgregar 
}) {
  const campos = ['nombre', 'direccion', 'correo', 'telefono', 'cargo'];
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const handleCancelar = () => {
    setNuevoContacto({ nombre: '', direccion: '', correo: '', telefono: '', cargo: '' });
    setMostrarFila(false);
  };

  return (
    <section>
      <h3 className="text-lg font-semibold mb-4 text-[#1a3c34]">
        Contactos de referencia:
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-sm font-[Poppins]">
          <thead className="bg-gray-100 text-[#374151]">
            <tr>
              {campos.map((campo) => (
                <th key={campo} className="p-3 text-center border-b font-semibold">
                  {capitalize(campo)}
                </th>
              ))}
              <th className="p-3 text-center border-b font-semibold w-16">
                <button
                  onClick={() => setMostrarFila(true)}
                  disabled={mostrarFila}
                  className="bg-orange-400 text-white w-7 h-7 rounded hover:bg-orange-500 transition disabled:opacity-50"
                >
                  +
                </button>
              </th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {contactos.length === 0 && !mostrarFila && (
              <tr>
                <td colSpan={campos.length + 1} className="p-4 text-center text-gray-500 italic">
                  No hay contactos registrados
                </td>
              </tr>
            )}

            {contactos.map((c, i) => (
              <tr
                key={i}
                className={`border-t hover:bg-gray-50 transition ${
                  c.seleccionado ? 'bg-orange-50' : ''
                }`}
              >
                {campos.map((campo) => (
                  <td key={campo} className="p-3 text-center">
                    {c[campo]}
                  </td>
                ))}
                <td className="p-3 text-center">
                  <input
                    type="checkbox"
                    checked={c.seleccionado || false}
                    onChange={() => {
                      const copia = [...contactos];
                      copia[i].seleccionado = !copia[i].seleccionado;
                      setContactos(copia);
                    }}
                    className="w-5 h-5 accent-orange-400 cursor-pointer"
                  />
                </td>
              </tr>
            ))}

            {mostrarFila && (
              <tr className="bg-[#f0faff] border-t">
                {campos.map((campo) => (
                  <td key={campo} className="p-2">
                    <input
                      name={campo}
                      value={nuevoContacto[campo]}
                      onChange={(e) =>
                        setNuevoContacto({ ...nuevoContacto, [campo]: e.target.value })
                      }
                      placeholder={capitalize(campo)}
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                  </td>
                ))}
                <td className="p-2 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
                      onClick={onAgregar}
                    >
                      ✔
                    </button>
                    <button
                      className="bg-red-400 text-white px-2 py-1 rounded-md hover:bg-red-500"
                      onClick={handleCancelar}
                    >
                      ✖
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}