import React from "react";
import { FaHome,FaTicketAlt, FaHistory, FaBell, FaUsers } from 'react-icons/fa';
import TicketStatusCard from "@/components/TicketStatusCard";

export default function InicioAdmin() {
  // Simulación de datos
  const ticketsEnProceso = 25;
  const ticketsResueltos = 80;
  const totalTickets = 100;

  const porcentajeProceso = Math.round((ticketsEnProceso / totalTickets) * 100);
  const porcentajeResueltos = Math.round((ticketsResueltos / totalTickets) * 100);

  return (
    <div style={{ background: "#f7f7f7", minHeight: "90vh", fontFamily: "sans-serif" }}>
      {/* Container superior */}
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "30px 20px 0 20px",
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 2px 8px #0001",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "50px" 
      }}>
        {/* Contenedor principal con Flexbox */}
        <div style={{ display: "flex", alignItems: "center", padding:"5px"}}>
          <FaHome size={64} color="#000" style={{ marginRight: "10px", display:"flex", marginBottom:"10px"}} />
          <span style={{ fontSize: "24px", fontWeight: "bold" }}>Inicio</span>
        </div>

        {/* Contenedor Derecho: Empresa y Usuario */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Nombre de la empresa */}
          <span style={{ fontSize: "16px", color: "#555", fontWeight: "500", marginRight: "25px" }}>
            J&P PERIFERICOS S.A.C.
          </span>

          {/* Información del usuario */}
          <div style={{
            textAlign: "right",
            borderLeft: "1px solid #e0e0e0",
            paddingLeft: "25px", 
            lineHeight: "1.4"
          }}>
            <div style={{ fontSize: "14px", color: "#666" }}>
              Bienvenido :
            </div>
            <div style={{ fontSize: "16px", color: "#333" }}>
              Carlos Manuel, Dias Perez
            </div>
            <div style={{ fontSize: "14px", color: "#888" }}>
              Administrador
            </div>
          </div>
        </div>
      </div>
      
      {/* Cartas */}
      <div style={{
        maxWidth: "900px",
        margin: "30px auto 0 auto",
        display: "flex",
        flexWrap: "wrap", 
        justifyContent: "center",
        gap: "50px",
        minHeight: "250px"
      }}>
        {[
          { icon: <FaTicketAlt size={48} color="#000" />, title: "Total de tickets activos", value: 10 },
          { icon: <FaHistory size={48} color="#000" />, title: "Historial de tickets", value: 50 },
          { icon: <FaBell size={48} color="#000" />, title: "Tickets Urgentes", value: 5 },
          { icon: <FaUsers size={48} color="#000" />, title: "Registrar Clientes", value: "" },
        ].map((card, idx) => (
          <div key={idx} style={{
            background: "#FFB966",
            borderRadius: "15px",
            width: "300px", // Aumentado de 210px a 250px
            height: "250px", // Aumentado de 170px a 200px
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            padding: "20px", // Aumentado de 15px a 20px
            boxShadow: "0 2px 8px #0001",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "48px" }}>{card.icon}</div> {/* Aumentado de 38px a 48px */}
            <div style={{ fontWeight: "bold", fontSize: "20px" }}>{card.title}</div> {/* Aumentado de 18px a 20px */}
            {card.value !== "" && <div style={{ fontSize: "38px", fontWeight: "bold", color: "#333" }}>{card.value}</div>} {/* Aumentado de 30px a 38px */}
            <button style={{
              background: "#fff",
              color: "#FFB966",
              border: "none",
              borderRadius: "7px",
              padding: "8px 30px", // Aumentado de 7px 25px a 8px 30px
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "18px", // Aumentado de 16px a 18px
              boxShadow: "0 1px 4px #0001"
            }}>Ver</button>
          </div>
        ))}
      </div>

      {/* Mensajes de tickets */}
      <div style={{
        maxWidth: "450px", // Hacemos el contenedor más estrecho
        margin: "10px auto 0", //Configurar de acuerdo a la ventana
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 8px #0001",
        padding: "15px 20px", // Reducimos el padding
      }}>
        <h2 style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "18px", // Reducimos el tamaño del título
          marginBottom: "10px", // Reducimos el margen inferior
          color: "#333"
        }}>Mensajes de tickets</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#FFB966", color: "#fff", fontWeight: "bold" }}>
              <th style={{ padding: "8px", borderRadius: "7px 0 0 0", fontSize: "14px" }}>Nro de ticket</th>
              <th style={{ padding: "8px", fontSize: "14px" }}>Mensaje</th>
              <th style={{ padding: "8px", borderRadius: "0 7px 0 0", fontSize: "14px" }}>Tiempo</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ background: "#fff" }}>
              <td style={{ padding: "8px", textAlign: "center", fontSize: "12px" }}>INC001</td>
              <td style={{ padding: "8px", fontSize: "12px" }}>¿Cuándo se resuelve el problema de red?</td>
              <td style={{ padding: "8px", textAlign: "center", fontSize: "12px" }}>hace 20 min.</td>
            </tr>
            <tr style={{ background: "#fff" }}>
              <td style={{ padding: "8px", textAlign: "center", fontSize: "12px" }}>INC002</td>
              <td style={{ padding: "8px", fontSize: "12px" }}>Ya se actualizó el software solicitado.</td>
              <td style={{ padding: "8px", textAlign: "center", fontSize: "12px" }}>hace 30 min.</td>
            </tr>
            <tr style={{ background: "#fff" }}>
              <td style={{ padding: "8px", textAlign: "center", fontSize: "12px" }}>INC003</td>
              <td style={{ padding: "8px", fontSize: "12px" }}>¿Se puede agendar visita para soporte?</td>
              <td style={{ padding: "8px", textAlign: "center", fontSize: "12px" }}>hace 30 min.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-center items-center md:items-start w-full p-4 bg-[#ededed] min-h-screen">
        {/* Otras tarjetas aquí si las tienes */}

        <div className="flex flex-col md:flex-row gap-6 w-full justify-center">
          <TicketStatusCard
            title="Tickets en Proceso"
            percent={porcentajeProceso}
            color="#f89e1b"
            label="En Proceso"
          />
          <TicketStatusCard
            title="Tickets Resueltos"
            percent={porcentajeResueltos}
            color="#4caf50"
            label="Resueltos"
          />
        </div>

        {/* Otras tarjetas aquí si las tienes */}
      </div>
    </div>
  );
}