'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function RegistrarCliente() {
  const { id } = useParams();
  const steps = ['Empresa', 'Contacto', 'Sucursal', 'Datos de acceso'];
  const [step] = useState(0); // fijo en 0 para solo mostrar Empresa

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
      }}>Registrar Cliente</h2>

      {/* Tabs (solo visuales) */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        {steps.map((label, index) => (
          <button
            key={index}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'default',
              backgroundColor: step === index ? 'orange' : '#eee',
              color: step === index ? 'white' : 'black',
              fontWeight: step === index ? 'bold' : 'normal'
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Solo se muestra el paso Empresa */}
      <form>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, marginRight: '15px' }}>
            <label>Nombre Empresa:</label><br />
            <input type="text" placeholder="Nombre empresa" style={inputStyle} /><br /><br />
            <label>RUC:</label><br />
            <input type="text" placeholder="ruc" style={inputStyle} /><br /><br />
            <label>Plan:</label><br />
            <input type="text" placeholder="plan" style={inputStyle} />
          </div>
          <div style={{ flex: 1 }}>
            <label>Dirección:</label><br />
            <input type="text" placeholder="dirección" style={inputStyle} />
          </div>
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
            onClick={() => {
              window.location.href = `/cliente_ad/contacto/`;
            }}
            style={navBtnStyle}
          >
            Siguiente
          </button>
        </div>
      </form>
    </div>
  );
}

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
