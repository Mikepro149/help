"use client";
import React from "react";
import { FaHome,FaTicketAlt, FaHistory, FaBell, FaUsers } from 'react-icons/fa';

export default function InicioCliente() {
  const getTickets = () => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = window.localStorage.getItem('boletos_cliente_data');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const [counts, setCounts] = React.useState({ proceso: 0, resueltos: 0 });

  const computeCounts = (tickets) => {
    const toLower = (v) => (v || '').toString().toLowerCase();
    const proceso = tickets.filter(t => ["en proceso", "proceso", "activo", "in_progress"].includes(toLower(t.estado))).length;
    const resueltos = tickets.filter(t => ["resuelto", "resolved"].includes(toLower(t.estado))).length;
    setCounts({ proceso, resueltos });
  };

  React.useEffect(() => {
    computeCounts(getTickets());
    const onUpdate = (e) => computeCounts(e?.detail?.tickets || getTickets());
    const onStorage = (e) => { if (e.key === 'boletos_cliente_data') computeCounts(getTickets()); };
    window.addEventListener('tickets:update', onUpdate);
    window.addEventListener('tickets:created', onUpdate);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('tickets:update', onUpdate);
      window.removeEventListener('tickets:created', onUpdate);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 font-sans p-0">
      <div className="w-full flex flex-col items-center">
        {/* Container superior */}
        <div className="w-full max-w-[1400px] mt-8 bg-white rounded-2xl shadow p-6 flex items-center justify-between">
          <div className="flex items-center">
            <FaHome size={32} color="#000" className="mr-3" />
            <span className="text-2xl font-bold">Inicio Cliente</span>
          </div>
          <div className="flex items-center">
            <span className="text-base text-gray-600 font-semibold mr-6">J&P PERIFERICOS S.A.C.</span>
            <div className="text-right border-l pl-6">
              <div className="text-sm text-gray-500">Bienvenido :</div>
              <div className="text-base text-gray-800">Persona Natural</div>
              <div className="text-sm text-gray-400">Cliente</div>
            </div>
          </div>
        </div>

        {/* Cartas */}
        <div className="w-full max-w-[1200px] mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-orange-300 rounded-xl min-h-[180px] flex flex-col items-center justify-center shadow text-center p-4">
            <div className="text-4xl mb-2"><FaBell size={48} color="#000" /></div>
            <div className="font-bold text-lg">Tickets en Proceso</div>
            <div className="text-3xl font-bold text-gray-800 mt-2">{counts.proceso}</div>
          </div>
          <div className="bg-orange-300 rounded-xl min-h-[180px] flex flex-col items-center justify-center shadow text-center p-4">
            <div className="text-4xl mb-2"><FaHistory size={48} color="#000" /></div>
            <div className="font-bold text-lg">Tickets Resueltos</div>
            <div className="text-3xl font-bold text-gray-800 mt-2">{counts.resueltos}</div>
          </div>
        </div>

        {/* Mensajes de tickets */}
        <div className="max-w-[450px] w-full mt-32 bg-white rounded-xl shadow p-6 mx-auto">
          <h2 className="text-center font-bold text-lg mb-4 text-gray-800">Mensajes de tickets</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-orange-300 text-white font-bold">
                <th className="py-2 px-3 rounded-tl-lg text-sm">Nro de ticket</th>
                <th className="py-2 px-3 text-sm">Mensaje</th>
                <th className="py-2 px-3 rounded-tr-lg text-sm">Tiempo</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="py-2 px-3 text-center text-xs">INC010</td>
                <td className="py-2 px-3 text-xs">loremdadaw</td>
                <td className="py-2 px-3 text-center text-xs">hace 10 min.</td>
              </tr>
              <tr className="bg-white">
                <td className="py-2 px-3 text-center text-xs">INC011</td>
                <td className="py-2 px-3 text-xs">Ya se actualizó el software solicitado.</td>
                <td className="py-2 px-3 text-center text-xs">hace 30 min.</td>
              </tr>
              <tr className="bg-white">
                <td className="py-2 px-3 text-center text-xs">INC012</td>
                <td className="py-2 px-3 text-xs">¿Se puede agendar visita para soporte?</td>
                <td className="py-2 px-3 text-center text-xs">hace 1 hora</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
