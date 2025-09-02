'use client'
import { useState } from 'react'
import { TabsCn } from '@/components/shared/tabscn'
import TableCn from '@/components/shared/tablecn'

const steps = ['Datos Personales', 'Contacto', 'Datos de acceso']

export default function RegistrarClienteNatural() {
  const [step, setStep] = useState(0)

  const [datosPersonales, setDatosPersonales] = useState({ nombre: '', dni: '', telefono: '', plan: '', correo: '', foto: null })
  const [contactos, setContactos] = useState([
    { nombre: 'Carlos Díaz', direccion: 'Av. México', correo: 'carlos@gmail.com', telefono: '987654321', cargo: 'Administrador' },
  ])
  const [acceso, setAcceso] = useState({ correo: '', contraseña: '', confirmar: '' })

  const onNext = () => step < steps.length - 1 && setStep(step + 1)
  const onPrev = () => step > 0 && setStep(step - 1)
  const onSubmit = () => {
    console.log({ datosPersonales, contactos, acceso })
    alert('Cliente registrado exitosamente.')
  }

  return (
    <div className="max-w-2xl mx-auto my-12 bg-white p-8 rounded-xl shadow">
      <h2 className="text-xl font-bold text-center mb-6">Registrar Cliente - {steps[step]}</h2>
      <TabsCn steps={steps} currentStep={step} onStepChange={setStep} />

      <div className="mt-6">
        {step === 0 && <DatosPersonales datos={datosPersonales} setDatos={setDatosPersonales} />}
        {step === 1 && <Contacto contactos={contactos} setContactos={setContactos} />}
        {step === 2 && <Acceso acceso={acceso} setAcceso={setAcceso} />}
      </div>

      <div className="mt-8 flex justify-between">
        <button onClick={onPrev} disabled={step === 0} className={`px-6 py-2 rounded-lg font-bold ${step === 0 ? 'bg-gray-300' : 'bg-orange-500 text-white'}`}>
          Volver
        </button>
        {step < steps.length - 1 ? (
          <button onClick={onNext} className="px-6 py-2 bg-orange-500 text-white rounded-lg font-bold">Siguiente</button>
        ) : (
          <button onClick={onSubmit} className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold">Registrar</button>
        )}
      </div>
    </div>
  )
}

function DatosPersonales({ datos, setDatos }) {
  const handleChange = (e) => {
    const { name, value, files } = e.target
    setDatos({ ...datos, [name]: files ? files[0] : value })
  }

  return (
    <section className="grid grid-cols-2 gap-4">
      {['nombre', 'dni', 'telefono', 'plan', 'correo'].map((field) => (
        <input
          key={field}
          name={field}
          className={`p-2 rounded border ${field === 'correo' ? 'col-span-2' : ''}`}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={datos[field]}
          onChange={handleChange}
        />
      ))}
      <input type="file" name="foto" className="col-span-2" onChange={handleChange} />
    </section>
  )
}

function Contacto({ contactos, setContactos }) {
  const columnas = [
    { header: 'Nombre', accessor: 'nombre' },
    { header: 'Dirección', accessor: 'direccion' },
    { header: 'Correo', accessor: 'correo' },
    { header: 'Teléfono', accessor: 'telefono' },
    { header: 'Cargo', accessor: 'cargo' },
  ]

  return (
    <section>
      <TableCn columns={columnas} data={contactos} />
      <button
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold"
        onClick={() => setContactos([...contactos, { nombre: '', direccion: '', correo: '', telefono: '', cargo: '' }])}
      >
        ➕ Añadir Contacto
      </button>
    </section>
  )
}

function Acceso({ acceso, setAcceso }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    setAcceso({ ...acceso, [name]: value })
  }

  return (
    <section className="space-y-4">
      <input name="correo" className="w-full p-2 rounded border" placeholder="Correo" value={acceso.correo} onChange={handleChange} />
      <input name="contraseña" type="password" className="w-full p-2 rounded border" placeholder="Contraseña" value={acceso.contraseña} onChange={handleChange} />
      <input name="confirmar" type="password" className="w-full p-2 rounded border" placeholder="Confirmar Contraseña" value={acceso.confirmar} onChange={handleChange} />
    </section>
  )
  
}
