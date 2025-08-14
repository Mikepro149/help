"use client";

import { useState } from "react";

export default function forgotpassword(){
   const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [recoveryInput, setRecoveryInput] = useState("");

  return (
    <div className="page-wrapper">
      {/* 🔶 Header superior amarillo */}
      <div className="header">
        <input
          type="text"
          placeholder="Input 1"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
        />
        <input
          type="text"
          placeholder="Input 2"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
        />
        <button onClick={() => alert("Botón clickeado")}>Botón</button>
        <div
          className="forgot-link"
          onClick={() => alert("Texto clickeado")}
        >
          Texto clickeable
        </div>
      </div>

      {/* ⚫ Div gris con caja interna */}
      <div className="main-content">
        <div className="recovery-box">
          <div className="recovery-title">Título de sección</div>
          <div className="recovery-content">
            <p>Escribe algo abajo para continuar con la acción que desees.</p>
            <input
              type="text"
              placeholder="Escribe aquí"
              value={recoveryInput}
              onChange={(e) => setRecoveryInput(e.target.value)}
            />
            <div className="recovery-actions">
              <button className="btn-cancel" onClick={() => alert("Cancelado")}>
                Cancelar
              </button>
              <button className="btn-send" onClick={() => alert("Enviado")}>
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🔶 Footer amarillo inferior */}
      <div className="footer">
        <p>Este es el pie amarillo</p>
      </div>

      {/* 🎨 Estilos en línea */}
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        html,
        body {
          height: 100%;
          width: 100%;
        }

        body {
          background-color: #454545;
        }

        .page-wrapper {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          width: 100%;
        }

        .header,
        .main-content,
        .footer {
          width: 100%;
        }

        .header {
          background-color: #fca326;
          padding: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .header input {
          padding: 10px 15px;
          border-radius: 25px;
          border: none;
          font-size: 1.2rem;
          width: 100%;
          max-width: 380px;
          outline: none;
          background-color: #888888;
        }

        .header button {
          padding: 10px 25px;
          border-radius: 25px;
          border: none;
          background-color: #555555;
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
          width: 100%;
          max-width: 200px;
        }

        .header .forgot-link {
          color: #333;
          font-weight: bold;
          text-decoration: none;
          font-size: 1.1rem;
          cursor: pointer;
          width: 100%;
          text-align: center;
        }

        .password-wrapper {
          position: relative;
          width: 100%;
          max-width: 380px;
        }

        .eye {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
        }

        .main-content {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .recovery-box {
          background-color: rgba(80, 80, 80, 0.8);
          width: 100%;
          max-width: 940px;
          border-radius: 8px;
          overflow: hidden;
        }

        .recovery-title {
          background-color: rgba(70, 70, 70, 1);
          color: white;
          padding: 15px 20px;
          font-size: 2rem;
        }

        .recovery-content {
          padding: 20px;
          color: white;
        }

        .recovery-content p {
          margin-bottom: 40px;
          font-size: 1.2rem;
          line-height: 1.5;
        }

        .recovery-content input {
          width: 100%;
          padding: 12px 15px;
          border-radius: 25px;
          border: none;
          font-size: 1.2rem;
          margin-bottom: 20px;
        }

        .recovery-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          flex-wrap: wrap;
        }

        .btn-cancel,
        .btn-send {
          padding: 10px 20px;
          border-radius: 25px;
          border: none;
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
        }

        .btn-cancel {
          background-color: #888888;
        }

        .btn-send {
          background-color: #fca326;
        }

        .footer {
          background-color: #fca326;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .header input,
          .header button,
          .password-wrapper {
            max-width: 100%;
          }

          .recovery-title {
            font-size: 1.5rem;
          }

          .recovery-content p {
            font-size: 1rem;
          }

          .btn-cancel,
          .btn-send {
            width: 100%;
            text-align: center;
            font-size: 1rem;
          }

          .recovery-actions {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}