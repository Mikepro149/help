'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TableCn from '@/components/shared/tablecn';
import { TabsCn } from '@/components/shared/tabscn';
import DialogCn from '@/components/shared/dialogcn'; // 👈 importar el diálogo

const steps = ['Empresa', 'Contacto', 'Sucursal', 'Área', 'Datos de acceso'];

export default function RegistrarCliente() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  // Estado de formularios
  const [empresa, setEmpresa] = useState({ nombre: '', ruc: '', plan: '', direccion: '' });
  const [contactos, setContactos] = useState([
    { nombre: 'Carlos Daniel', direccion: 'Av. Mexico', correo: '@gmail.com', telefono: '987654321', cargo: 'Admin', seleccionado: false },
    { nombre: 'Jesus Manuel', direccion: 'Av. Benavides', correo: 'tttt@gmail.com', telefono: '912345678', cargo: 'Soporte', seleccionado: false },
  ]);
  const [sucursales, setSucursales] = useState([
    { sucursal: 'Sucursal Lima', direccion: 'Av. Arequipa 123', contacto: 'Ana Torres', telefono: '987123456', correo: 'ana@example.com' },
    { sucursal: 'Sucursal Cusco', direccion: 'Jr. Sol 456', contacto: 'Luis Vega', telefono: '981234567', correo: 'luis@example.com' },
  ]);
  const [areas, setAreas] = useState([{ area: 'Administración', contacto: 'Adrián', telefono: '975643521', correo: 'aaaaa@' }]);
  const [acceso, setAcceso] = useState({ usuario: '', contraseña: '', confirmarContraseña: '' });

  // Columnas
  const contactosColumns = [
    { header: 'Nombre', accessor: 'nombre' },
    { header: 'Dirección', accessor: 'direccion' },
    { header: 'Correo', accessor: 'correo' },
    { header: 'Teléfono', accessor: 'telefono' },
    { header: 'Cargo', accessor: 'cargo' },
  ];
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

  // Navegación
  const onNext = () => {
    if (step === 2) {
      setStep(4);
    } else if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const onPrev = () => {
    if (step === 4) {
      setStep(2);
    } else if (step > 0) {
      setStep(step - 1);
    }
  };

  const onSubmit = () => {
    const datos = { empresa, contactos, sucursales, areas, acceso };
    console.log('Datos enviados:', datos);
    alert('Datos enviados. Revisa la consola.');
  };

  // Pasos visibles en Tabs (sin Área)
  const visibleSteps = steps.filter((s) => s !== 'Área');

  return (
    <div className="w-[1377.25px] h-[963px] mx-auto my-12 bg-[#fff3e0] p-8 rounded-xl shadow overflow-auto">
      <h2 className="text-2xl font-bold text-center mb-6">
        Registrar Cliente - {steps[step]}
      </h2>

      {/* Tabs */}
      {step !== 3 && (
        <TabsCn
          steps={visibleSteps}
          currentStep={step > 3 ? step - 1 : step}
          onStepChange={(newIndex) => {
            if (newIndex >= 3) {
              setStep(newIndex + 1);
            } else {
              setStep(newIndex);
            }
          }}
        />
      )}

      <div className="mt-8">
        {/* Empresa */}
        {step === 0 && (
          <section className="space-y-4">
            <input
              className="w-full p-2 rounded border border-gray-300"
              placeholder="Nombre Empresa"
              value={empresa.nombre}
              onChange={(e) => setEmpresa({ ...empresa, nombre: e.target.value })}
            />
            <input
              className="w-full p-2 rounded border border-gray-300"
              placeholder="RUC"
              value={empresa.ruc}
              onChange={(e) => setEmpresa({ ...empresa, ruc: e.target.value })}
            />
            <input
              className="w-full p-2 rounded border border-gray-300"
              placeholder="Plan"
              value={empresa.plan}
              onChange={(e) => setEmpresa({ ...empresa, plan: e.target.value })}
            />
            <input
              className="w-full p-2 rounded border border-gray-300"
              placeholder="Dirección"
              value={empresa.direccion}
              onChange={(e) => setEmpresa({ ...empresa, direccion: e.target.value })}
            />
          </section>
        )}

        {/* Contactos */}
        {step === 1 && (
          <section>
            <TableCn columns={contactosColumns} data={contactos} />
            <button
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold"
              onClick={() =>
                setContactos((prev) => [...prev, { nombre: '', direccion: '', correo: '', telefono: '', cargo: '', seleccionado: false }])
              }
            >
              ➕ Añadir Contacto
            </button>
          </section>
        )}

        {/* Sucursales */}
        {step === 2 && (
          <section>
            <TableCn columns={sucursalColumns} data={sucursales} />
            <div className="mt-4 flex justify-start">
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold"
              >
                Ir a Áreas
              </button>
            </div>
          </section>
        )}

        {/* Áreas */}
        {step === 3 && (
          <section>
            <TableCn columns={areaColumns} data={areas} />
            <div className="mt-4 flex justify-start">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg font-bold"
              >
                Volver
              </button>
            </div>
          </section>
        )}

        {/* Acceso */}
        {step === 4 && (
          <section className="space-y-4">
            <input
              className="w-full p-2 rounded border border-gray-300"
              placeholder="Usuario"
              value={acceso.usuario}
              onChange={(e) => setAcceso({ ...acceso, usuario: e.target.value })}
            />
            <input
              type="password"
              className="w-full p-2 rounded border border-gray-300"
              placeholder="Contraseña"
              value={acceso.contraseña}
              onChange={(e) => setAcceso({ ...acceso, contraseña: e.target.value })}
            />
            <input
              type="password"
              className="w-full p-2 rounded border border-gray-300"
              placeholder="Confirmar Contraseña"
              value={acceso.confirmarContraseña}
              onChange={(e) => setAcceso({ ...acceso, confirmarContraseña: e.target.value })}
            />
          </section>
        )}
      </div>

      {/* Navegación */}
      {step !== 3 && (
        <div className="mt-8 flex justify-between">
          <button
            onClick={onPrev}
            disabled={step === 0}
            className={`px-6 py-2 rounded-lg font-bold ${
              step === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-orange-500 text-white'
            }`}
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
            // 👇 Aquí usamos el DialogCn en lugar de un simple botón
            <DialogCn
              triggerLabel="Enviar"
              title="Confirmar Envío"
              description="¿Estás seguro de que deseas registrar este cliente con los datos ingresados?"
            >
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={onSubmit}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold"
                >
                  Sí, enviar
                </button>
              </div>
            </DialogCn>
          )}
        </div>
      )}
    </div>
  );
}
