'use client'

import { useState } from 'react'
import { TabsCn } from '@/components/shared/tabscn'
import TableCn from '@/components/shared/tablecn'

const steps = ['Datos Personales', 'Contacto', 'Datos de acceso']

export default function RegistrarClienteNatural() {
  const [step, setStep] = useState(0)

  // Estados
  const [datosPersonales, setDatosPersonales] = useState({
    nombre: '',
    dni: '',
    telefono: '',
    plan: '',
    correo: '',
    foto: null, 
  })

  const [contactos, setContactos] = useState([
    { nombre: 'Carlos Díaz', direccion: 'Av. México', correo: 'carlos@gmail.com', telefono: '987654321', cargo: 'Administrador' },
    { nombre: 'Jesús Pérez', direccion: 'Av. Benavides', correo: 'jesus@gmail.com', telefono: '912345678', cargo: 'Soporte' },
  ])

  const [acceso, setAcceso] = useState({
    correo: '',
    contraseña: '',
    confirmar: '',
  })

  // Columnas para tabla de contactos
  const contactosColumns = [
    { header: 'Nombre', accessor: 'nombre' },
    { header: 'Dirección', accessor: 'direccion' },
    { header: 'Correo', accessor: 'correo' },
    { header: 'Teléfono', accessor: 'telefono' },
    { header: 'Cargo', accessor: 'cargo' },
  ]

  const onNext = () => step < steps.length - 1 && setStep(step + 1)
  const onPrev = () => step > 0 && setStep(step - 1)

  const onSubmit = () => {
    const datos = { datosPersonales, contactos, acceso }
    console.log('Datos enviados:', datos)
    alert('Cliente registrado exitosamente. Revisa la consola.')
  }

  return (
    <div className="max-w-2xl mx-auto my-12 bg-white p-8 rounded-xl shadow">
      <h2 className="text-xl font-bold text-center mb-6">
        Registrar Cliente - {steps[step]}
      </h2>

      <TabsCn steps={steps} currentStep={step} onStepChange={setStep} />

      <div className="mt-6">
        {/* Datos Personales */}
        {step === 0 && (
          <section className="grid grid-cols-2 gap-4">
            <input
              className="p-2 rounded border"
              placeholder="Nombre"
              value={datosPersonales.nombre}
              onChange={(e) => setDatosPersonales({ ...datosPersonales, nombre: e.target.value })}
            />
            <input
              className="p-2 rounded border"
              placeholder="DNI"
              value={datosPersonales.dni}
              onChange={(e) => setDatosPersonales({ ...datosPersonales, dni: e.target.value })}
            />
            <input
              className="p-2 rounded border"
              placeholder="Teléfono"
              value={datosPersonales.telefono}
              onChange={(e) => setDatosPersonales({ ...datosPersonales, telefono: e.target.value })}
            />
            <input
              className="p-2 rounded border"
              placeholder="Plan"
              value={datosPersonales.plan}
              onChange={(e) => setDatosPersonales({ ...datosPersonales, plan: e.target.value })}
            />
            <input
              className="col-span-2 p-2 rounded border"
              placeholder="Correo"
              value={datosPersonales.correo}
              onChange={(e) => setDatosPersonales({ ...datosPersonales, correo: e.target.value })}
            />
            <input
              type="file"
              className="col-span-2"
              onChange={(e) => setDatosPersonales({ ...datosPersonales, foto: e.target.files?.[0] || null })}
            />
          </section>
        )}

        {/* Contacto */}
        {step === 1 && (
          <section>
            <TableCn columns={contactosColumns} data={contactos} />
            <button
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold"
              onClick={() => setContactos((prev) => [...prev, { nombre: '', direccion: '', correo: '', telefono: '', cargo: '' }])}
            >
              ➕ Añadir Contacto
            </button>
          </section>
        )}

        {/* Acceso */}
        {step === 2 && (
          <section className="space-y-4">
            <input
              className="w-full p-2 rounded border"
              placeholder="Correo"
              value={acceso.correo}
              onChange={(e) => setAcceso({ ...acceso, correo: e.target.value })}
            />
            <input
              type="password"
              className="w-full p-2 rounded border"
              placeholder="Contraseña"
              value={acceso.contraseña}
              onChange={(e) => setAcceso({ ...acceso, contraseña: e.target.value })}
            />
            <input
              type="password"
              className="w-full p-2 rounded border"
              placeholder="Confirmar Contraseña"
              value={acceso.confirmar}
              onChange={(e) => setAcceso({ ...acceso, confirmar: e.target.value })}
            />
          </section>
        )}
      </div>

      {/* Navegación */}
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
  )
}