"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ChatPage() {
  const params = useSearchParams();
  const ticketId = params.get("id");

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        💬 Chat del Ticket {ticketId ? `#${ticketId}` : ""}
      </h1>

      <div className="border rounded-lg p-4 bg-white shadow-sm">
        <p className="text-gray-500 mb-4">
          Aquí irá la conversación entre el cliente y el soporte.
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            className="border border-gray-300 rounded px-3 py-2 flex-1"
          />
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
}
