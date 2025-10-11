'use client';

import { useState } from 'react';
import { TabsCn } from '@/components/shared/tabscn';
import DialogCn from '@/components/shared/dialogcn';

const steps = ['Empresa', 'Contactos', 'Sucursal', 'Áreas', 'Datos de acceso'];

export default function EmpresaAd() {
  const [step, setStep] = useState(0);

  // Estados generales
  const [empresa, setEmpresa] = useState({ nombre: '', ruc: '', direccion: '', plan: '' });
  
  // Estados unificados para tablas dinámicas
  const [contactos, setContactos] = useState([]);
  const [nuevoContacto, setNuevoContacto] = useState({
    nombre: '', direccion: '', correo: '', telefono: '', cargo: '', seleccionado: false,
  });
  const [mostrarContacto, setMostrarContacto] = useState(false);

  const [sucursales, setSucursales] = useState([
    { sucursal: 'Sucursal Lima', direccion: 'Av. Arequipa 123', contacto: 'Ana Torres', telefono: '987123456', correo: 'ana@example.com' },
  ]);
  const [nuevaSucursal, setNuevaSucursal] = useState({ sucursal: '', direccion: '', contacto: '', telefono: '', correo: '' });
  const [mostrarSucursal, setMostrarSucursal] = useState(false);

  const [areas, setAreas] = useState([
    { area: 'Administración', contacto: 'Luis Vega', telefono: '981234567', correo: 'luis@example.com' },
  ]);
  const [nuevaArea, setNuevaArea] = useState({ area: '', contacto: '', telefono: '', correo: '' });
  const [mostrarArea, setMostrarArea] = useState(false);

  const [acceso, setAcceso] = useState({ usuario: '', contraseña: '', confirmar: '' });

  // 🔹 Función genérica para manejar inputs
  const handleChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Función unificada para guardar filas en tablas
  const guardarFila = (lista, setLista, nuevoItem, setNuevoItem, setMostrarFila, incluirSeleccionado = false) => {
    const incompleto = Object.entries(nuevoItem).some(
      ([key, value]) => key !== 'seleccionado' && !value.trim()
    );
    
    if (incompleto) return alert('Completa todos los campos');
    
    setLista([...lista, nuevoItem]);
    const resetItem = Object.fromEntries(
      Object.keys(nuevoItem).map((k) => [k, k === 'seleccionado' ? false : ''])
    );
    setNuevoItem(resetItem);
    setMostrarFila(false);
  };

  const onSubmit = () => {
    if (!acceso.usuario || !acceso.contraseña || acceso.contraseña !== acceso.confirmar) {
      return alert('Verifica los datos de acceso antes de registrar.');
    }
    const datos = { empresa, contactos, sucursales, areas, acceso };
    console.log('Datos enviados:', datos);
    alert('Empresa registrada correctamente.');
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <section className="grid grid-cols-2 gap-4">
            {Object.keys(empresa).map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="p-2 rounded border border-gray-300"
                value={empresa[field]}
                onChange={handleChange(setEmpresa)}
              />
            ))}
          </section>
        );

      case 1:
        return (
          <DataTable
            title="Contactos de referencia"
            columns={['nombre', 'direccion', 'correo', 'telefono', 'cargo']}
            data={contactos}
            setData={setContactos}
            nuevo={nuevoContacto}
            setNuevo={setNuevoContacto}
            mostrar={mostrarContacto}
            setMostrar={setMostrarContacto}
            onSave={() => guardarFila(contactos, setContactos, nuevoContacto, setNuevoContacto, setMostrarContacto, true)}
            conCheckbox={true}
          />
        );

      case 2:
        return (
          <DataTable
            title="Agregar Sucursales"
            columns={['sucursal', 'direccion', 'contacto', 'telefono', 'correo']}
            data={sucursales}
            nuevo={nuevaSucursal}
            setNuevo={setNuevaSucursal}
            mostrar={mostrarSucursal}
            setMostrar={setMostrarSucursal}
            onSave={() => guardarFila(sucursales, setSucursales, nuevaSucursal, setNuevaSucursal, setMostrarSucursal)}
          />
        );

      case 3:
        return (
          <DataTable
            title="Agregar Áreas"
            columns={['area', 'contacto', 'telefono', 'correo']}
            data={areas}
            nuevo={nuevaArea}
            setNuevo={setNuevaArea}
            mostrar={mostrarArea}
            setMostrar={setMostrarArea}
            onSave={() => guardarFila(areas, setAreas, nuevaArea, setNuevaArea, setMostrarArea)}
          />
        );

      case 4:
        return (
          <section className="space-y-4">
            {['usuario', 'contraseña', 'confirmar'].map((f) => (
              <input
                key={f}
                name={f}
                type={f !== 'usuario' ? 'password' : 'text'}
                placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                className="w-full p-2 rounded border border-gray-300"
                value={acceso[f]}
                onChange={handleChange(setAcceso)}
              />
            ))}
          </section>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-12 bg-[#fff8f0] p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-center mb-6">
        Registrar Empresa - {steps[step]}
      </h2>

      <TabsCn steps={steps} currentStep={step} onStepChange={setStep} />

      <div className="mt-8">{renderStep()}</div>

      {/* Navegación */}
      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={() => (window.location.href = '/cliente_ad?tipo=empresa')}
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg font-bold hover:bg-gray-400"
        >
          Volver
        </button>

        {step < steps.length - 1 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg font-bold"
          >
            Siguiente
          </button>
        ) : (
          <DialogCn
            triggerLabel="Enviar"
            title="Confirmar Envío"
            description="¿Estás seguro de que deseas registrar esta empresa con los datos ingresados?"
          >
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={onSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold"
              >
                Confirmar
              </button>
              <button className="px-6 py-2 bg-red-600 text-white rounded-lg font-bold">
                Cancelar
              </button>
            </div>
          </DialogCn>
        )}
      </div>
    </div>
  );
}

// 🔹 Componente unificado para todas las tablas
function DataTable({ 
  title, 
  columns, 
  data, 
  setData, 
  nuevo, 
  setNuevo, 
  mostrar, 
  setMostrar, 
  onSave,
  conCheckbox = false 
}) {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const handleCancelar = () => {
    setNuevo(Object.fromEntries(
      Object.keys(nuevo).map((k) => [k, k === 'seleccionado' ? false : ''])
    ));
    setMostrar(false);
  };

  return (
    <section>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-sm">
        <thead className="bg-gray-100 text-[#374151]">
          <tr>
            {columns.map((col) => (
              <th key={col} className="p-2 text-center border-b font-semibold">
                {capitalize(col)}
              </th>
            ))}
            <th className="p-2 text-center border-b font-semibold w-16">
              <button
                className="bg-orange-400 text-white w-7 h-7 rounded hover:bg-orange-500 transition"
                onClick={() => setMostrar(true)}
                disabled={mostrar}
              >
                +
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && !mostrar && (
            <tr>
              <td colSpan={columns.length + 1} className="p-4 text-center text-gray-500 italic">
                No hay registros
              </td>
            </tr>
          )}

          {data.map((item, idx) => (
            <tr key={idx} className="border-t hover:bg-gray-50 transition">
              {columns.map((col) => (
                <td key={col} className="p-2 text-center">{item[col]}</td>
              ))}
              <td className="p-2 text-center">
                {conCheckbox ? (
                  <input
                    type="checkbox"
                    checked={item.seleccionado || false}
                    onChange={() => {
                      const copia = [...data];
                      copia[idx].seleccionado = !copia[idx].seleccionado;
                      setData(copia);
                    }}
                    className="w-5 h-5 accent-orange-400 cursor-pointer"
                  />
                ) : null}
              </td>
            </tr>
          ))}

          {mostrar && (
            <tr className="border-t bg-[#f0faff] transition">
              {columns.map((f) => (
                <td key={f} className="p-2">
                  <input
                    name={f}
                    value={nuevo[f]}
                    onChange={(e) => setNuevo({ ...nuevo, [f]: e.target.value })}
                    placeholder={capitalize(f)}
                    className="w-full px-2 py-1 border rounded text-sm"
                  />
                </td>
              ))}
              <td className="p-2 text-center">
                <div className="flex justify-center gap-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
                    onClick={onSave}
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
    </section>
  );
}