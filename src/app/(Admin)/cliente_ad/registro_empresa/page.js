'use client';
import { useState } from 'react';

const inputStyle = {
  width: '100%',
  padding: '8px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  backgroundColor: '#fff7e6',
  marginBottom: '12px',
};

const navBtnStyle = {
  backgroundColor: 'orange',
  color: 'white',
  border: 'none',
  padding: '10px 25px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const steps = ['Empresa', 'Contacto', 'Sucursal', 'Área', 'Datos de acceso'];

export default function RegistrarCliente() {
  const [step, setStep] = useState(0);

  // Datos para cada sección
  const [empresa, setEmpresa] = useState({
    nombre: '',
    ruc: '',
    plan: '',
    direccion: '',
  });

  const [contacto, setContacto] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    cargo: '',
  });

  const [sucursal, setSucursal] = useState({
    sucursal: '',
    direccion: '',
    contacto: '',
    telefono: '',
    correo: '',
  });

  const [area, setArea] = useState({
    nombre: '',
    descripcion: '',
  });

  const [acceso, setAcceso] = useState({
    usuario: '',
    contraseña: '',
    confirmarContraseña: '',
  });

  // Manejo cambios de inputs según step
  const handleChange = (e, section) => {
    const { name, value } = e.target;
    switch (section) {
      case 'empresa':
        setEmpresa(prev => ({ ...prev, [name]: value }));
        break;
      case 'contacto':
        setContacto(prev => ({ ...prev, [name]: value }));
        break;
      case 'sucursal':
        setSucursal(prev => ({ ...prev, [name]: value }));
        break;
      case 'area':
        setArea(prev => ({ ...prev, [name]: value }));
        break;
      case 'acceso':
        setAcceso(prev => ({ ...prev, [name]: value }));
        break;
      default:
        break;
    }
  };

  const onNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const onPrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const onSubmit = () => {
    // Aquí podrías enviar todos los datos combinados a tu API
    const datos = { empresa, contacto, sucursal, area, acceso };
    console.log('Enviar datos:', datos);
    alert('Datos enviados! Revisa consola.');
  };

  return (
    <div style={{
      maxWidth: 700,
      margin: '50px auto',
      backgroundColor: '#fff3e0',
      padding: 30,
      borderRadius: 12,
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
        fontSize: 24
      }}>
        Registrar Cliente - {steps[step]}
      </h2>

      {/* Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 30 }}>
        {steps.map((label, index) => (
          <button
            key={index}
            onClick={() => setStep(index)}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              backgroundColor: step === index ? 'orange' : '#eee',
              color: step === index ? 'white' : 'black',
              fontWeight: step === index ? 'bold' : 'normal',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Secciones */}
      {step === 0 && (
        <section>
          <label>Nombre Empresa:</label>
          <input
            name="nombre"
            value={empresa.nombre}
            onChange={(e) => handleChange(e, 'empresa')}
            placeholder="Nombre empresa"
            style={inputStyle}
          />
          <label>RUC:</label>
          <input
            name="ruc"
            value={empresa.ruc}
            onChange={(e) => handleChange(e, 'empresa')}
            placeholder="RUC"
            style={inputStyle}
          />
          <label>Plan:</label>
          <input
            name="plan"
            value={empresa.plan}
            onChange={(e) => handleChange(e, 'empresa')}
            placeholder="Plan"
            style={inputStyle}
          />
          <label>Dirección:</label>
          <input
            name="direccion"
            value={empresa.direccion}
            onChange={(e) => handleChange(e, 'empresa')}
            placeholder="Dirección"
            style={inputStyle}
          />
        </section>
      )}

      {step === 1 && (
        <section>
          <label>Nombre Contacto:</label>
          <input
            name="nombre"
            value={contacto.nombre}
            onChange={(e) => handleChange(e, 'contacto')}
            placeholder="Nombre completo"
            style={inputStyle}
          />
          <label>Teléfono:</label>
          <input
            name="telefono"
            value={contacto.telefono}
            onChange={(e) => handleChange(e, 'contacto')}
            placeholder="Teléfono"
            style={inputStyle}
          />
          <label>Correo:</label>
          <input
            name="correo"
            value={contacto.correo}
            onChange={(e) => handleChange(e, 'contacto')}
            placeholder="Correo electrónico"
            style={inputStyle}
          />
          <label>Cargo:</label>
          <input
            name="cargo"
            value={contacto.cargo}
            onChange={(e) => handleChange(e, 'contacto')}
            placeholder="Cargo en la empresa"
            style={inputStyle}
          />
        </section>
      )}

      {step === 2 && (
        <section>
          <label>Nombre Sucursal:</label>
          <input
            name="sucursal"
            value={sucursal.sucursal}
            onChange={(e) => handleChange(e, 'sucursal')}
            placeholder="Sucursal"
            style={inputStyle}
          />
          <label>Dirección:</label>
          <input
            name="direccion"
            value={sucursal.direccion}
            onChange={(e) => handleChange(e, 'sucursal')}
            placeholder="Dirección"
            style={inputStyle}
          />
          <label>Contacto:</label>
          <input
            name="contacto"
            value={sucursal.contacto}
            onChange={(e) => handleChange(e, 'sucursal')}
            placeholder="Contacto"
            style={inputStyle}
          />
          <label>Teléfono:</label>
          <input
            name="telefono"
            value={sucursal.telefono}
            onChange={(e) => handleChange(e, 'sucursal')}
            placeholder="Teléfono"
            style={inputStyle}
          />
          <label>Correo:</label>
          <input
            name="correo"
            value={sucursal.correo}
            onChange={(e) => handleChange(e, 'sucursal')}
            placeholder="Correo"
            style={inputStyle}
          />
        </section>
      )}

      {step === 3 && (
        <section>
          <label>Nombre Área:</label>
          <input
            name="nombre"
            value={area.nombre}
            onChange={(e) => handleChange(e, 'area')}
            placeholder="Nombre área"
            style={inputStyle}
          />
          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={area.descripcion}
            onChange={(e) => handleChange(e, 'area')}
            placeholder="Descripción"
            style={{ ...inputStyle, height: 80, resize: 'vertical' }}
          />
        </section>
      )}

      {step === 4 && (
        <section>
          <label>Usuario:</label>
          <input
            name="usuario"
            value={acceso.usuario}
            onChange={(e) => handleChange(e, 'acceso')}
            placeholder="Usuario"
            style={inputStyle}
          />
          <label>Contraseña:</label>
          <input
            type="password"
            name="contraseña"
            value={acceso.contraseña}
            onChange={(e) => handleChange(e, 'acceso')}
            placeholder="Contraseña"
            style={inputStyle}
          />
          <label>Confirmar Contraseña:</label>
          <input
            type="password"
            name="confirmarContraseña"
            value={acceso.confirmarContraseña}
            onChange={(e) => handleChange(e, 'acceso')}
            placeholder="Confirmar contraseña"
            style={inputStyle}
          />
        </section>
      )}

      {/* Botones navegación */}
      <div style={{ marginTop: 30, display: 'flex', justifyContent: 'space-between' }}>
        <button
          type="button"
          onClick={onPrev}
          disabled={step === 0}
          style={{ ...navBtnStyle, opacity: step === 0 ? 0.5 : 1 }}
        >
          Anterior
        </button>

        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={onNext}
            style={navBtnStyle}
          >
            Siguiente
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            style={navBtnStyle}
          >
            Enviar
          </button>
        )}
      </div>
    </div>
  );
}
