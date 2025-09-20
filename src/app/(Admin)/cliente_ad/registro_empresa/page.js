'use client';

import { useState } from 'react';
import { TabsCn } from '@/components/shared/tabscn';
import TableCn from '@/components/shared/tablecn';
import DialogCn from '@/components/shared/dialogcn';

const steps = ['Empresa', 'Contactos', 'Sucursal', 'Áreas', 'Datos de acceso'];



export default function EmpresaAd() {
  const [step, setStep] = useState(0);

  const [empresa, setEmpresa] = useState({ nombre: '', ruc: '', direccion: '', plan: '' });

  const [sucursales, setSucursales] = useState([
    { sucursal: 'Sucursal Lima', direccion: 'Av. Arequipa 123', contacto: 'Ana Torres', telefono: '987123456', correo: 'ana@example.com' },
  ]);
  const [nuevaSucursal, setNuevaSucursal] = useState({ sucursal: '', direccion: '', contacto: '', telefono: '', correo: '' });
 const [mostrarFormularioSucursal, setMostrarFormularioSucursal] = useState(false);

//////////
const [mostrarFilaSucursal, setMostrarFilaSucursal] = useState(false);
///////////////////////


  const [areas, setAreas] = useState([
    { area: 'Administración', contacto: 'Luis Vega', telefono: '981234567', correo: 'luis@example.com' },
  ]);
  const [nuevaArea, setNuevaArea] = useState({ area: '', contacto: '', telefono: '', correo: '' });
//////
const [mostrarFilaArea, setMostrarFilaArea] = useState(false);
////////
const [contactos, setContactos] = useState([]);

const [nuevoContacto, setNuevoContacto] = useState({ nombre: '', direccion: '', correo: '', telefono: '', cargo: '' });
const [mostrarFilaContacto, setMostrarFilaContacto] = useState(false);
////



  const [acceso, setAcceso] = useState({ usuario: '', contraseña: '', confirmar: '' });

  const sucursalColumns = [
    { header: 'Sucursal', accessor: 'sucursal' },
    { header: 'Dirección', accessor: 'direccion' },
    { header: 'Contacto', accessor: 'contacto' },
    { header: 'Teléfono', accessor: 'telefono' },
    { header: 'Correo', accessor: 'correo' },
  ];

  const areaColumns = [
    { header: 'Área', accessor: 'area' },
    { header: 'Contacto', accessor: 'contacto' },
    { header: 'Teléfono', accessor: 'telefono' },
    { header: 'Correo', accessor: 'correo' },
  ];

  const onNext = () => step < steps.length - 1 && setStep(step + 1);
  const onPrev = () => step > 0 && setStep(step - 1);

  const onSubmit = () => {
    if (!acceso.usuario || !acceso.contraseña || acceso.contraseña !== acceso.confirmar) {
      alert('Verifica los datos de acceso antes de registrar.');
      return;
    }

    const datos = { empresa, sucursales, areas, acceso };
    console.log('Datos enviados:', datos);
    alert('Empresa registrada correctamente.');
  };

  return (
    <div className="max-w-5xl mx-auto my-12 bg-[#fff8f0] p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-center mb-6">Registrar Empresa - {steps[step]}</h2>

      <TabsCn steps={steps} currentStep={step} onStepChange={setStep} />

      <div className="mt-8">
        {/* Paso 0: Empresa */}
        {step === 0 && (
          <section className="grid grid-cols-2 gap-4">
            {['nombre', 'ruc', 'direccion', 'plan'].map((field) => (
              <input
                key={field}
                name={field}
                className="p-2 rounded border border-gray-300"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={empresa[field]}
                onChange={(e) => setEmpresa({ ...empresa, [field]: e.target.value })}
              />
            ))}
          </section>
        )}

{/* Paso 1: Contactos */}
{step === 1 && (
  <section>
    <h3 className="text-lg font-semibold mb-2">Contactos de referencia</h3>
    <table className="w-full table-fixed border border-gray-300 rounded-lg overflow-hidden text-sm font-[Poppins]">
      <thead className="bg-gray-100 text-left">
        <tr>
          <th className="p-2 w-[140px]">Nombre</th>
          <th className="p-2 w-[180px]">Dirección</th>
          <th className="p-2 w-[180px]">Correo</th>
          <th className="p-2 w-[140px]">Teléfono</th>
          <th className="p-2 w-[180px]">Cargo</th>
          <th className="p-2 w-[160px] text-right">
          <button
            className={`bg-blue-600 text-white px-2 py-1 rounded font-bold text-sm hover:bg-blue-700 transition ${
              mostrarFilaContacto ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => setMostrarFilaContacto(true)}
            disabled={mostrarFilaContacto}
          >
            ➕
          </button>
        </th>
        </tr>
      </thead>
      <tbody>
        {contactos.length === 0 && !mostrarFilaContacto && (
          <tr>
            <td colSpan={6} className="p-4 text-center text-gray-500 italic">
              No hay contactos registrados
            </td>
          </tr>
        )}

        {contactos.map((c, index) => (
          <tr key={index} className="border-t">
            <td className="p-2 w-[140px]">{c.nombre}</td>
            <td className="p-2 w-[180px]">{c.direccion}</td>
            <td className="p-2 w-[180px]">{c.correo}</td>
            <td className="p-2 w-[140px]">{c.telefono}</td>
            <td className="p-2 w-[180px]">{c.cargo}</td>
            <td className="p-2 w-[160px] text-right">
              <input
                type="checkbox"
                checked={c.seleccionado || false}
                onChange={() => {
                  const actualizados = [...contactos];
                  actualizados[index].seleccionado = !actualizados[index].seleccionado;
                  setContactos(actualizados);
                }}
                className="w-5 h-5 accent-[#34d399] "
              />
            </td>
          </tr>
        ))}

        {mostrarFilaContacto && (
          <tr className="border-t bg-[#f0faff] transition-all duration-300 ease-in-out">
            {['nombre', 'direccion', 'correo', 'telefono', 'cargo'].map((field, i) => (
              <td key={field} className={`p-2 ${i === 0 ? 'w-[140px]' : i === 1 || i === 2 ? 'w-[180px]' : i === 3 ? 'w-[140px]' : 'w-[180px]'}`}>
                <input
                  name={field}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a8d9ce] bg-white text-sm font-[Poppins]"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={nuevoContacto[field]}
                  onChange={(e) =>
                    setNuevoContacto({ ...nuevoContacto, [field]: e.target.value })
                  }
                />
              </td>
            ))}
            <td className="p-2 w-[160px] align-top">
              <div className="flex flex-col items-end gap-2">
                <div>

                </div>
                <div className="flex gap-2">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded font-semibold hover:bg-green-700 transition"
                    onClick={() => {
                      const incompleto = Object.values(nuevoContacto).some((v) => v.trim() === '');
                      if (incompleto) return alert('Completa todos los campos del contacto');
                      setContactos([...contactos, { ...nuevoContacto, seleccionado: false }]);
                      setNuevoContacto({ nombre: '', direccion: '', correo: '', telefono: '', cargo: '' });
                      setMostrarFilaContacto(false);
                    }}
                  >
                    Guardar
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded font-semibold hover:bg-red-600 transition"
                    onClick={() => {
                      setNuevoContacto({ nombre: '', direccion: '', correo: '', telefono: '', cargo: '' });
                      setMostrarFilaContacto(false);
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </section>
)}



{/* Paso 1: Sucursales */}
{step === 2&& (
  <section>
    <h3 className="text-lg font-semibold mb-2">Agregar Sucursales</h3>
    <table className="w-full table-auto border border-gray-300 rounded-lg overflow-hidden">
      <thead className="bg-[#f3f4f6] text-left">
        <tr>
          <th className="p-2">Sucursal</th>
          <th className="p-2">Dirección</th>
          <th className="p-2">Contacto</th>
          <th className="p-2">Teléfono</th>
          <th className="p-2 flex items-center justify-between">
            <span>Correo</span>
            <button
              className="bg-blue-600 text-white px-2 py-1 rounded font-bold text-sm"
              onClick={() => setMostrarFilaSucursal(true)}
            >
              ➕
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {sucursales.map((s, index) => (
          <tr key={index} className="border-t">
            <td className="p-2">{s.sucursal}</td>
            <td className="p-2">{s.direccion}</td>
            <td className="p-2">{s.contacto}</td>
            <td className="p-2">{s.telefono}</td>
            <td className="p-2">{s.correo}</td>
          </tr>
        ))}

        {/* Fila editable para nueva sucursal */}
        {mostrarFilaSucursal && (
          <tr className="border-t bg-[#fffaf0]">
            <td className="p-2">
              <input
                name="sucursal"
                className="w-full p-1 rounded border border-gray-300"
                placeholder="Sucursal"
                value={nuevaSucursal.sucursal}
                onChange={(e) => setNuevaSucursal({ ...nuevaSucursal, sucursal: e.target.value })}
              />
            </td>
            <td className="p-2">
              <input
                name="direccion"
                className="w-full p-1 rounded border border-gray-300"
                placeholder="Dirección"
                value={nuevaSucursal.direccion}
                onChange={(e) => setNuevaSucursal({ ...nuevaSucursal, direccion: e.target.value })}
              />
            </td>
            <td className="p-2">
              <input
                name="contacto"
                className="w-full p-1 rounded border border-gray-300"
                placeholder="Contacto"
                value={nuevaSucursal.contacto}
                onChange={(e) => setNuevaSucursal({ ...nuevaSucursal, contacto: e.target.value })}
              />
            </td>
            <td className="p-2">
              <input
                name="telefono"
                className="w-full p-1 rounded border border-gray-300"
                placeholder="Teléfono"
                value={nuevaSucursal.telefono}
                onChange={(e) => setNuevaSucursal({ ...nuevaSucursal, telefono: e.target.value })}
              />
            </td>
            <td className="p-2 flex gap-2 items-end">
              <input
                name="correo"
                className="flex-1 p-1 rounded border border-gray-300"
                placeholder="Correo"
                value={nuevaSucursal.correo}
                onChange={(e) => setNuevaSucursal({ ...nuevaSucursal, correo: e.target.value })}
              />
              <button
                className="bg-green-600 text-white px-3 py-1 rounded font-semibold"
                onClick={() => {
                  const incompleto = Object.values(nuevaSucursal).some((v) => v.trim() === '');
                  if (incompleto) return alert('Completa todos los campos de la sucursal');
                  setSucursales([...sucursales, nuevaSucursal]);
                  setNuevaSucursal({ sucursal: '', direccion: '', contacto: '', telefono: '', correo: '' });
                  setMostrarFilaSucursal(false);
                }}
              >
                Guardar
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded font-semibold"
                onClick={() => {
                  setNuevaSucursal({ sucursal: '', direccion: '', contacto: '', telefono: '', correo: '' });
                  setMostrarFilaSucursal(false);
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

    {/* Paso 2: Áreas */}
{step === 3 && (
  <section>
    <h3 className="text-lg font-semibold mb-2">Agregar Áreas</h3>
    <table className="w-full table-auto border border-gray-300 rounded-lg overflow-hidden">
      <thead className="bg-[#f3f4f6] text-left">
        <tr>
          <th className="p-2">Área</th>
          <th className="p-2">Contacto</th>
          <th className="p-2">Teléfono</th>
          <th className="p-2 flex items-center justify-between">
            <span>Correo</span>
            <button
              className="bg-blue-600 text-white px-2 py-1 rounded font-bold text-sm"
              onClick={() => setMostrarFilaArea(true)}
            >
              ➕
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {areas.map((a, index) => (
          <tr key={index} className="border-t">
            <td className="p-2">{a.area}</td>
            <td className="p-2">{a.contacto}</td>
            <td className="p-2">{a.telefono}</td>
            <td className="p-2">{a.correo}</td>
          </tr>
        ))}

        {/* FILA QUE MUESTRA EL PROCESO DE EDITAR DE CADA FILA*/}
        {mostrarFilaArea && (
          <tr className="border-t bg-[#fff0f5]">
            <td className="p-2">
              <input
                name="area"
                className="w-full p-1 rounded border border-gray-300"
                placeholder="Área"
                value={nuevaArea.area}
                onChange={(e) => setNuevaArea({ ...nuevaArea, area: e.target.value })}
              />
            </td>
            <td className="p-2">
              <input
                name="contacto"
                className="w-full p-1 rounded border border-gray-300"
                placeholder="Contacto"
                value={nuevaArea.contacto}
                onChange={(e) => setNuevaArea({ ...nuevaArea, contacto: e.target.value })}
              />
            </td>
            <td className="p-2">
              <input
                name="telefono"
                className="w-full p-1 rounded border border-gray-300"
                placeholder="Teléfono"
                value={nuevaArea.telefono}
                onChange={(e) => setNuevaArea({ ...nuevaArea, telefono: e.target.value })}
              />
            </td>
            <td className="p-2 flex gap-2 items-end">
              <input
                name="correo"
                className="flex-1 p-1 rounded border border-gray-300"
                placeholder="Correo"
                value={nuevaArea.correo}
                onChange={(e) => setNuevaArea({ ...nuevaArea, correo: e.target.value })}
              />
              <button
                className="bg-green-600 text-white px-3 py-1 rounded font-semibold"
                onClick={() => {
                  const incompleto = Object.values(nuevaArea).some((v) => v.trim() === '');
                  if (incompleto) return alert('Completa todos los campos del área');
                  setAreas([...areas, nuevaArea]);
                  setNuevaArea({ area: '', contacto: '', telefono: '', correo: '' });
                  setMostrarFilaArea(false);
                }}
              >
                Guardar
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded font-semibold"
                onClick={() => {
                  setNuevaArea({ area: '', contacto: '', telefono: '', correo: '' });
                  setMostrarFilaArea(false);
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

{/* Paso 4: DATOS DE ACCESO */}
{step === 4 && (
  <section className="space-y-4">
    <input
      name="usuario"
      className="w-full p-2 rounded border border-gray-300"
      placeholder="Usuario"
      value={acceso.usuario}
      onChange={(e) => setAcceso({ ...acceso, usuario: e.target.value })}
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
  </section>
)}

      </div>
      {/* EN ESTA APARTE SE VE LA NAVEGACION*/}
      <div className="mt-8 flex justify-between">
        
      <button
  type="button"
  onClick={() => window.location.href = "/cliente_ad?tipo=empresa"}
  className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg font-bold hover:bg-gray-400"
>
  Volver
</button>


        {step < steps.length - 1 ? (
          <button
            onClick={onNext}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg font-bold"
          >
            Siguiente
          </button>
        ) : (
          <DialogCn
            triggerLabel="Enviar"
            title="Confirmar Envío"
            description="¿Estás segura de que deseas registrar esta empresa con los datos ingresados?"
          >
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={onSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold"
              >
                Confirmar
              </button>
              <button
                type="button"
                className="px-6 py-2 bg-red-600 text-white rounded-lg font-bold"
                onClick={() => console.log('Registro cancelado')}
              >
                Cancelar
              </button>
            </div>
          </DialogCn>
        )}
      </div>
    </div>
  );
}