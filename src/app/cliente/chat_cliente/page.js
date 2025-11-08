"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaCheckCircle,
  FaEnvelopeOpenText,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";

const loadTickets = () => {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = window.localStorage.getItem("boletos_cliente_data");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const defaultMessages = [
  {
    id: "m1",
    author: "Alberto Perez",
    email: "ingsoftware@gmail.com",
    role: "cliente",
    timestamp: "04 Ene 2023 15:00 p.m",
    body: "Lorem ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto estándar de la industria desde los años 1500.",
    avatarColor: "#000000",
  },
  {
    id: "m2",
    author: "Fernandes - Soporte",
    email: "ejemplo01@gmail.com",
    role: "soporte",
    timestamp: "04 Ene 2023 14:00 p.m",
    body: "Es un hecho establecido hace mucho tiempo que un lector se distraerá con el contenido legible de una página cuando mira su diseño. Varias versiones han evolucionado a lo largo de los años.",
    avatarColor: "#2F80ED",
  },
  {
    id: "m3",
    author: "Alberto Perez",
    email: "ingsoftware@gmail.com",
    role: "cliente",
    timestamp: "04 Ene 2023 15:00 p.m",
    body: "El estándar de Lorem Ipsum se usa desde los 1500. “de Finibus Bonorum et Malorum” de Cicerón también se reproduce en su forma exacta, acompañado de traducciones modernas.",
    attachment: "img.png",
    avatarColor: "#000000",
  },
];

export default function ChatClientePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ticketId = searchParams.get("ticket");

  const [ticket, setTicket] = React.useState(null);
  const [messages, setMessages] = React.useState(defaultMessages);
  const [newMessage, setNewMessage] = React.useState("");
  const [closeModalOpen, setCloseModalOpen] = React.useState(false);
  const [closeStep, setCloseStep] = React.useState(0);
  const [visitForm, setVisitForm] = React.useState({
    name: "Alberto Perez",
    email: "ingsoftware@gmail.com",
    department: "Administración",
    pin: "9876543",
    ticketId: "#T-0000001",
    helpMessage: "",
  });
  const [closeSurvey, setCloseSurvey] = React.useState({
    wantsValuation: null,
    experience: "",
    resolved: "si",
    rating: 5,
    comment: "",
  });

  React.useEffect(() => {
    const tickets = loadTickets();
    const found = tickets.find((item) => item.id === ticketId) || tickets[0] || null;
    setTicket(found);
  }, [ticketId]);

  React.useEffect(() => {
    if (!ticket) return;
    setVisitForm((prev) => ({
      ...prev,
      department: ticket.area || "Administración",
      ticketId: ticket.id || "#T-0000001",
    }));
  }, [ticket]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const timestamp = new Date().toLocaleString("es-PE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
    setMessages((prev) => [
      {
        id: `local-${Date.now()}`,
        author: "Alberto Perez",
        email: "ingsoftware@gmail.com",
        role: "cliente",
        timestamp,
        body: newMessage.trim(),
        avatarColor: "#000000",
      },
      ...prev,
    ]);
    setNewMessage("");
  };

  const infoItems = [
    {
      label: "Departamento",
      value: ticket?.area || "Administración",
    },
    {
      label: "Fecha de envío",
      value: ticket?.fechaRegistro
        ? new Date(ticket.fechaRegistro).toLocaleDateString("es-PE", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
        : "04 May 2023",
    },
    {
      label: "Última actualización",
      value: ticket?.ultimaActualizacion
        ? new Date(ticket.ultimaActualizacion).toLocaleDateString("es-PE", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
        : "05 Jun 2023",
    },
  ];

  const handleStartCloseFlow = () => {
    setCloseModalOpen(true);
    setCloseStep(0);
  };

  const handleCloseFlowExit = () => {
    setCloseModalOpen(false);
    setCloseStep(0);
    setCloseSurvey({
      wantsValuation: null,
      experience: "",
      resolved: "si",
      rating: 5,
      comment: "",
    });
  };

  const valuationMessages = [
    "El agente Soporte - j&p se a unido al chat",
    "El agente Soporte - j&p ha activado la traducción automática",
  ];

  return (
    <div className="min-h-screen bg-[#E5E5E5] px-6 py-8 text-[#1E1E1E] font-[Poppins]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8">
        <header className="flex items-center justify-between rounded-3xl bg-white px-8 py-5 shadow">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F5941E]/15 text-xl text-[#F5941E] hover:bg-[#F5941E]/25"
            >
              <FaArrowLeft />
            </button>
            <div className="flex items-center gap-3 text-3xl font-black">
              <FaEnvelopeOpenText className="text-[#1E1E1E]" />
              <span>Chat</span>
            </div>
          </div>
          <div className="flex items-center gap-10 text-sm">
            <div className="text-right">
              <p className="font-semibold text-gray-700">J&P PERIFERICOS S.A.C.</p>
              <span className="flex items-center justify-end gap-1 text-xs text-gray-400">
                <FaMapMarkerAlt /> Los Olivos
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-full bg-[#F8B65A] px-5 py-2 text-sm font-semibold text-[#1E1E1E] shadow">
              <FaPhoneAlt className="text-[#F2881C]" />
              <span>1 (822)-34332</span>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="space-y-6">
            <div className="rounded-3xl bg-white shadow">
              <header className="flex items-center gap-3 rounded-t-3xl bg-[#F8B65A] px-6 py-4 text-sm font-bold uppercase tracking-wide text-[#1E1E1E]">
                <FaEnvelopeOpenText />
                Información de entradas
              </header>
              <div className="space-y-5 px-6 py-6 text-sm text-gray-700">
                <div>
                  <p className="font-semibold text-[#1E1E1E]">{ticket?.id || "#T-0000001"}</p>
                  <span className="text-xs text-gray-500">
                    Motivo: {ticket?.descripcion || "Problema en el encendido"}
                  </span>
                </div>

                <div className="flex flex-col gap-2 text-sm">
                  <span className="font-semibold text-[#1E1E1E]">Estado:</span>
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#E3F8E9] px-4 py-1 text-xs font-semibold text-[#1E8A4B]">
                    <FaCheckCircle /> {ticket?.estado?.toUpperCase() || "ACTIVO"}
                  </span>
                </div>

                <Button
                  type="button"
                  onClick={handleStartCloseFlow}
                  className="w-full rounded-full bg-[#F2881C] px-6 py-2 text-sm font-semibold text-white shadow hover:brightness-95"
                >
                  Cerrar ticket
                </Button>

                <div className="space-y-3 text-xs text-gray-600">
                  {infoItems.map((item) => (
                    <div key={item.label}>
                      <span className="block font-semibold text-[#1E1E1E]">{item.label}:</span>
                      <span>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white shadow">
              <header className="flex items-center gap-3 rounded-t-3xl bg-[#F8B65A] px-6 py-4 text-sm font-bold uppercase tracking-wide text-[#1E1E1E]">
                <FaUser />
                Pin de usuario
              </header>
              <div className="px-6 py-6">
                <div className="rounded-2xl bg-[#F3F3F3] py-6 text-center text-2xl font-black tracking-[0.5em] text-[#1E1E1E]">
                  9876543
                </div>
              </div>
            </div>
          </aside>

          <section className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white px-6 py-4 shadow">
              <div className="flex items-center gap-3 text-sm font-semibold text-[#1E1E1E]">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F8B65A] text-lg">
                  💬
                </span>
                Chat de soporte
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <Button
                  type="button"
                  onClick={() => router.push("/cliente/boletos_cliente")}
                  className="rounded-full bg-[#F2881C] px-6 py-2 text-sm font-semibold text-white shadow hover:brightness-95"
                >
                  Volver a tickets
                </Button>
              </div>
            </div>

            <div className="grid gap-6 rounded-3xl bg-white p-6 shadow">
              <form
                className="grid gap-4 rounded-3xl bg-[#FFF3E0] p-5 shadow-inner lg:grid-cols-[1fr_auto]"
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSendMessage();
                }}
              >
                <div className="space-y-2">
                  <label className="text-sm font-semibold uppercase text-[#1E1E1E]">Responder:</label>
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Escribe tu respuesta para soporte..."
                    className="h-28 w-full resize-none rounded-2xl border border-[#F4C27E] bg-white px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F5941E]"
                  />
                </div>
                <Button
                  type="submit"
                  className="flex h-fit items-center justify-center gap-2 rounded-full bg-[#F2881C] px-6 py-3 text-sm font-semibold text-white shadow hover:brightness-95"
                >
                  <FaPaperPlane /> Enviar mensaje
                </Button>
              </form>

              <div className="space-y-4">
                {messages.map((message) => (
                  <article
                    key={message.id}
                    className={`rounded-3xl border border-transparent bg-white p-5 shadow ${
                      message.role === "soporte" ? "bg-[#DAECFF]" : ""
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-full text-white"
                          style={{ backgroundColor: message.avatarColor }}
                        >
                          <FaUser />
                        </div>
                        <div className="text-sm">
                          <p className="font-semibold text-[#1E1E1E]">{message.author}</p>
                          <span className="text-xs text-gray-500">{message.email}</span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-gray-500">{message.timestamp}</span>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-[#1E1E1E]">{message.body}</p>
                    {message.attachment && (
                      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#F2881C] shadow-inner">
                        📎 {message.attachment}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>

        {closeModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 py-8 backdrop-blur-sm">
            <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFB347] via-[#FF8C4E] to-[#F5628D] text-white shadow-2xl">
              <button
                type="button"
                onClick={handleCloseFlowExit}
                className="absolute right-4 top-4 text-2xl font-bold text-white/80 hover:text-white"
              >
                ×
              </button>

              {closeStep === 0 && (
                <form
                  className="space-y-5 px-8 pb-10 pt-14"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setCloseStep(1);
                  }}
                >
                  <h3 className="text-lg font-bold uppercase tracking-wide">Solicitar visita presencial</h3>
                  {[
                    { label: "Nombre", field: "name", type: "text" },
                    { label: "Email", field: "email", type: "email" },
                    { label: "Departamento", field: "department", type: "text" },
                    { label: "Pin de soporte", field: "pin", type: "text" },
                    { label: "Ticket ID", field: "ticketId", type: "text" },
                  ].map((item) => (
                    <div key={item.field} className="space-y-1 text-sm">
                      <label className="font-semibold">{item.label}:</label>
                      <input
                        type={item.type}
                        value={visitForm[item.field]}
                        onChange={(e) =>
                          setVisitForm((prev) => ({
                            ...prev,
                            [item.field]: e.target.value,
                          }))
                        }
                        className="w-full rounded-full border border-white/60 bg-white/90 px-4 py-2 text-sm font-semibold text-[#1E1E1E] shadow-inner focus:outline-none focus:ring-2 focus:ring-white"
                      />
                    </div>
                  ))}
                  <div className="space-y-1 text-sm">
                    <label className="font-semibold">¿Cómo le podemos ayudar?</label>
                    <textarea
                      value={visitForm.helpMessage}
                      onChange={(e) =>
                        setVisitForm((prev) => ({
                          ...prev,
                          helpMessage: e.target.value,
                        }))
                      }
                      className="h-28 w-full resize-none rounded-2xl border border-white/60 bg-white/90 px-4 py-3 text-sm font-semibold text-[#1E1E1E] shadow-inner focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full rounded-full bg-white/90 px-6 py-2 text-sm font-semibold text-[#F2881C] shadow hover:bg-white"
                  >
                    Solicitar
                  </Button>
                </form>
              )}

              {closeStep === 1 && (
                <div className="flex flex-col gap-6 px-6 pb-10 pt-14">
                  <header>
                    <h3 className="text-lg font-bold uppercase tracking-wide">Soporte - j&p</h3>
                    <p className="text-xs text-white/80">
                      El agente Soporte - j&p se unió al chat
                    </p>
                  </header>
                  <div className="space-y-4 rounded-3xl bg-white/10 p-4 text-sm leading-relaxed">
                    {valuationMessages.map((line, idx) => (
                      <p key={idx} className="text-white">
                        {line}
                      </p>
                    ))}
                    <div className="rounded-2xl bg-white/15 p-3 text-xs">
                      <p className="font-semibold text-white">Soporte - j&p</p>
                      <p className="text-white/80">16:00</p>
                      <p className="mt-2 text-white">
                        Estamos revisando tu solicitud para coordinar una visita. ¿Deseas continuar?
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <input
                      type="text"
                      placeholder="Escribe un mensaje"
                      className="w-full rounded-full border border-white/50 bg-white/80 px-4 py-2 text-sm text-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <Button
                      onClick={() => setCloseStep(2)}
                      className="w-full rounded-full bg-white/90 px-6 py-2 text-sm font-semibold text-[#F2881C] shadow hover:bg-white"
                    >
                      Continuar
                    </Button>
                  </div>
                </div>
              )}

              {closeStep === 2 && (
                <div className="flex flex-col gap-6 px-6 pb-10 pt-14">
                  <h3 className="text-center text-lg font-bold uppercase">¿Deseas realizar nuestra valorización?</h3>
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      onClick={() => {
                        setCloseSurvey((prev) => ({ ...prev, wantsValuation: true }));
                        setCloseStep(3);
                      }}
                      className="rounded-full bg-white/90 px-6 py-2 text-sm font-semibold text-[#F2881C] shadow hover:bg-white"
                    >
                      Sí
                    </Button>
                    <Button
                      onClick={() => {
                        setCloseSurvey((prev) => ({ ...prev, wantsValuation: false }));
                        setCloseStep(3);
                      }}
                      className="rounded-full bg-white/60 px-6 py-2 text-sm font-semibold text-[#F2881C] shadow hover:bg-white/80"
                    >
                      No
                    </Button>
                  </div>
                </div>
              )}

              {closeStep === 3 && (
                <form
                  className="flex flex-col gap-5 px-6 pb-10 pt-14 text-sm"
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleCloseFlowExit();
                    // Optionally trigger a toast or request
                  }}
                >
                  <h3 className="text-center text-lg font-bold uppercase">Encuesta de satisfacción</h3>
                  <div className="space-y-2">
                    <label className="font-semibold">¿Cómo fue tu experiencia en el chat? ¿Cómo podemos mejorar?</label>
                    <textarea
                      value={closeSurvey.experience}
                      onChange={(e) =>
                        setCloseSurvey((prev) => ({ ...prev, experience: e.target.value }))
                      }
                      className="h-24 w-full resize-none rounded-2xl border border-white/60 bg-white/90 px-4 py-3 text-sm text-[#1E1E1E] shadow-inner focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-semibold">¿Tu solicitud fue completamente resuelta en este chat?</label>
                    <div className="flex items-center gap-4">
                      {[
                        { label: "Sí", value: "si" },
                        { label: "No", value: "no" },
                      ].map((opt) => (
                        <label key={opt.value} className="flex items-center gap-2 text-white">
                          <input
                            type="radio"
                            name="resolved"
                            value={opt.value}
                            checked={closeSurvey.resolved === opt.value}
                            onChange={(e) =>
                              setCloseSurvey((prev) => ({ ...prev, resolved: e.target.value }))
                            }
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-semibold">¿Cómo apoyarías la experiencia con este agente de chat?</label>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: 5 }).map((_, index) => {
                        const rating = index + 1;
                        return (
                          <button
                            key={rating}
                            type="button"
                            onClick={() =>
                              setCloseSurvey((prev) => ({ ...prev, rating }))
                            }
                            className={`h-10 w-10 rounded-full text-lg ${
                              closeSurvey.rating >= rating ? "bg-white text-[#F2881C]" : "bg-white/40 text-white"
                            }`}
                          >
                            ★
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-semibold">Comentar</label>
                    <textarea
                      value={closeSurvey.comment}
                      onChange={(e) =>
                        setCloseSurvey((prev) => ({ ...prev, comment: e.target.value }))
                      }
                      className="h-24 w-full resize-none rounded-2xl border border-white/60 bg-white/90 px-4 py-3 text-sm text-[#1E1E1E] shadow-inner focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full rounded-full bg-white/90 px-6 py-2 text-sm font-semibold text-[#F2881C] shadow hover:bg-white"
                  >
                    Enviar
                  </Button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

