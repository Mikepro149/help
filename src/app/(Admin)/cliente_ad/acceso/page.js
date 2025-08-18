'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const steps = ['Empresa', 'Contacto', 'Sucursal', 'Datos de acceso'];

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

export default function DatosAcceso() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    correo: '',
    contraseña: '',
    confirmar: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (formData.contraseña !== formData.confirmar) {
      alert('Las contraseñas no coinciden');
      return;
    }

    console.log('Datos ingresados:', formData);
    router.push('/cliente_ad/resumen'); // Ajusta la ruta según tu flujo
  };

  const stepActual = 2; // índice del paso activo "Sucursal"

  return (
    <div style={{
      width: '700px',
      margin: '50px auto',
      backgroundColor: '#fff3e0',
      padding: '30px',
      borderRadius: '12px',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center'  // centra todo el contenido
    }}>
      {/* Título */}
      <h2 style={{
        fontWeight: 'bold',
        marginBottom: '15px',
        fontSize: '24px',
        color: 'black'
      }}>
        Registrar Cliente
      </h2>

      {/* Barra de pasos */}
      <div style={{ 
        display: 'inline-flex', 
        justifyContent: 'center', 
        gap: '10px', 
        backgroundColor: '#fff3e0', 
        padding: '10px 0', 
        borderRadius: '8px'
      }}>
        {steps.map((step, index) => (
          <button
            key={index}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'default',
              backgroundColor: index === stepActual ? 'orange' : '#eee',
              color: index === stepActual ? 'white' : 'black',
              fontWeight: index === stepActual ? 'bold' : 'normal',
            }}
          >
            {step}
          </button>
        ))}
      </div>

      {/* Formulario */}
      <form style={{ marginTop: '30px', textAlign: 'left' }}>
        <div style={{ marginBottom: '15px' }}>
          <label>Correo electrónico:</label><br />
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            style={inputStyle}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Contraseña:</label><br />
          <input
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            placeholder="Contraseña segura"
            style={inputStyle}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Verificar contraseña:</label><br />
          <input
            type="password"
            name="confirmar"
            value={formData.confirmar}
            onChange={handleChange}
            placeholder="Repite la contraseña"
            style={inputStyle}
            required
          />
        </div>

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
            onClick={handleSubmit}
            style={navBtnStyle}
          >
            Continuar
          </button>
        </div>
      </form>
    </div>
  );
}
