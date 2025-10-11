"use client";
import { useRouter } from "next/navigation";

export default function BoletosCliente() {
  const router = useRouter();

  // Simulación de tickets (reemplaza por tus datos reales)
  const tickets = [
    { id: "INC001", asunto: "Problema en el encendido" },
    { id: "INC002", asunto: "No enciende la pantalla" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mis Tickets</h1>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id} className="mb-4 flex items-center gap-4">
            <span>{ticket.asunto}</span>
            <button
              className="bg-[#f89e1b] text-white px-4 py-2 rounded"
              onClick={() => router.push(`/cliente/chat/${ticket.id}`)}
            >
              Ver mensajes
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}