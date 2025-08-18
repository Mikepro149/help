'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// 🎨 Estilos reutilizables
const inputStyle = {
  width: '100%',
  padding: '8px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  backgroundColor: '#fff7e6'
};

const navBtnStyle = {
  backgroundColor: 'orange',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

export default function ContactoCliente() {
  const router = useRouter();
  const steps = ['Empresa', 'Contacto', 'Sucursal', 'Datos de acceso'];
  const [step, setStep] = useState(1); // Paso actual: Contacto

  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    cargo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    console.log('Datos de contacto:', formData);
    router.push(`/cliente_ad/sucursal`);
  };

  return (
    <div style={{
      width: '700px',
      margin: '50px auto',
      backgroundColor: '#fff3e0',
      padding: '30px',
      borderRadius: '12px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: '20px',
        fontSize: '24px'
      }}>Registrar Cliente - Contacto</h2>

      {/* Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        {steps.map((label, index) => (
          <button
            key={index}
            onClick={() => setStep(index)}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: step === index ? 'orange' : '#eee',
              color: step === index ? 'white' : 'black',
              fontWeight: step === index ? 'bold' : 'normal'
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Formulario de contacto */}
      {step === 1 && (
        <form>
          <div style={{ marginBottom: '15px' }}>
            <label>Nombre:</label><br />
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre completo"
              style={inputStyle}
              required
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Teléfono:</label><br />
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Teléfono"
              style={inputStyle}
              required
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Correo:</label><br />
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="Correo electrónico"
              style={inputStyle}
              required
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Cargo:</label><br />
            <input
              type="text"
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              placeholder="Cargo en la empresa"
              style={inputStyle}
            />
          </div>

          {/* Botones */}
          <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between' }}>
            <button
              type="button"
              onClick={() => window.history.back()}
              style={navBtnStyle}
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={() => router.push('/cliente_ad/sucursal')}
              style={navBtnStyle}
            >
              Siguiente
            </button>

          </div>
        </form>
      )}
    </div>
  );
}
