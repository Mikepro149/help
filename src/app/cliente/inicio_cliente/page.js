"use client";
import React from "react";
import {
  FaBell,
  FaCalendarAlt,
  FaHome,
  FaPowerOff,
  FaTicketAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";

export default function InicioCliente() {
  const getTickets = () => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem("boletos_cliente_data");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const [counts, setCounts] = React.useState({
    total: 0,
    proceso: 0,
    resueltos: 0,
  });

  const computeCounts = React.useCallback((tickets) => {
    const toLower = (v) => (v || "").toString().toLowerCase();
    const proceso = tickets.filter((t) =>
      ["en proceso", "proceso", "activo", "in_progress"].includes(
        toLower(t.estado)
      )
    ).length;
    const resueltos = tickets.filter((t) =>
      ["resuelto", "resolved"].includes(toLower(t.estado))
    ).length;
    setCounts({ total: tickets.length, proceso, resueltos });
  }, []);

  React.useEffect(() => {
    computeCounts(getTickets());
    const onUpdate = (e) => computeCounts(e?.detail?.tickets || getTickets());
    const onStorage = (e) => {
      if (e.key === "boletos_cliente_data") computeCounts(getTickets());
    };
    window.addEventListener("tickets:update", onUpdate);
    window.addEventListener("tickets:created", onUpdate);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("tickets:update", onUpdate);
      window.removeEventListener("tickets:created", onUpdate);
      window.removeEventListener("storage", onStorage);
    };
  }, [computeCounts]);

  const procesoPercent =
    counts.total > 0 ? Math.round((counts.proceso / counts.total) * 100) : 0;
  const resueltosPercent =
    counts.total > 0 ? Math.round((counts.resueltos / counts.total) * 100) : 0;

  const calendarMatrix = React.useMemo(() => {
    const year = 2023;
    const month = 4; // May
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const weeks = [];
    let currentDay = 1;
    for (let weekIndex = 0; weekIndex < 6; weekIndex += 1) {
      const week = [];
      for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
        if (weekIndex === 0 && dayIndex < firstDay) {
          week.push(null);
        } else if (currentDay > daysInMonth) {
          week.push(null);
        } else {
          week.push(currentDay);
          currentDay += 1;
        }
      }
      weeks.push(week);
      if (currentDay > daysInMonth) break;
    }
    return weeks;
  }, []);

  return (
    <div className="min-h-screen bg-[#E5E5E5] text-[#1E1E1E] font-sans px-6 py-8">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col space-y-10">
        <header className="bg-white rounded-2xl shadow flex items-center justify-between px-10 py-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#F5941E]/20 flex items-center justify-center text-2xl text-[#F5941E]">
              <FaHome />
            </div>
            <div>
              <p className="text-2xl font-bold">Inicio</p>
              <span className="text-sm text-gray-500">Panel de seguimiento</span>
            </div>
          </div>

          <div className="flex items-center gap-8 text-right">
            <div>
              <p className="text-sm font-semibold text-gray-700">
                J&P PERIFERICOS S.A.C.
              </p>
              <span className="text-xs text-gray-500">Los Olivos</span>
            </div>
            <div className="h-12 w-px bg-gray-200" />
            <div className="text-left">
              <p className="text-xs text-gray-400">Bienvenido:</p>
              <p className="text-sm font-semibold text-gray-700">
                Persona Natural
              </p>
              <span className="text-xs text-gray-500">Cliente</span>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-[#F8B65A] rounded-3xl shadow p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <FaTicketAlt className="text-3xl text-black" />
                <p className="text-xl font-black tracking-tight">
                  Tickets Generados
                </p>
              </div>
              <p className="text-5xl font-black mt-6">{counts.total}</p>
            </div>
            <button
              type="button"
              className="self-end mt-6 rounded-full border border-black px-6 py-1 text-sm font-semibold bg-white"
            >
              Ver
            </button>
          </div>

          <div className="bg-[#F8B65A] rounded-3xl shadow p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <FaBell className="text-3xl text-black" />
                <p className="text-xl font-black tracking-tight">
                  Tickets Resueltos
                </p>
              </div>
              <p className="text-5xl font-black mt-6">{counts.resueltos}</p>
            </div>
            <button
              type="button"
              className="self-end mt-6 rounded-full border border-black px-6 py-1 text-sm font-semibold bg-white"
            >
              Ver
            </button>
          </div>

  <div className="bg-[#F8B65A] rounded-3xl shadow p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <FaUsers className="text-3xl text-black" />
                <p className="text-xl font-black tracking-tight">
                  Cantidad de Equipos
                </p>
              </div>
              <p className="text-5xl font-black mt-6">10</p>
            </div>
            <button
              type="button"
              className="self-end mt-6 rounded-full border border-black px-6 py-1 text-sm font-semibold bg-white"
            >
              Ver
            </button>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow px-8 py-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[#F8B65A] flex items-center justify-center text-black text-lg font-bold">
                #
              </span>
              <div>
                <p className="text-lg font-extrabold">Mensajes de Tickets</p>
                <span className="text-xs text-gray-500">
                  Tienes 1 mensaje nuevo por leer
                </span>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-[#F8F8F8] p-4 space-y-3">
              {[
                {
                  id: "#T-0000001",
                  autor: "Fernandes · Soporte",
                  mensaje: "Te envío un reporte del estado de tu ticket.",
                  tiempo: "hace 20 min",
                },
                {
                  id: "#T-0000002",
                  autor: "???",
                  mensaje: "Actualización pendiente de confirmar.",
                  tiempo: "hace 20 min",
                },
                {
                  id: "#T-0000003",
                  autor: "???",
                  mensaje: "¿Podemos agendar una llamada?",
                  tiempo: "hace 20 min",
                },
                {
                  id: "#T-0000004",
                  autor: "???",
                  mensaje: "Ticket en proceso de revisión.",
                  tiempo: "hace 20 min",
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl px-4 py-3 shadow-sm flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-semibold text-[#F5941E]">
                      {item.id}
                    </p>
                    <p className="text-xs text-gray-600">
                      {item.autor} · {item.mensaje}
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-400">
                    {item.tiempo}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow px-8 py-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-extrabold">May 2023</p>
                <span className="text-xs text-gray-500">Calendario</span>
              </div>
              <button
                type="button"
                className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"
              >
                <FaCalendarAlt className="text-sm" />
                Agenda
              </button>
            </div>

            <div className="rounded-3xl bg-[#FDE8CC] p-6">
              <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-600 gap-y-3">
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                  <span key={day}>{day}</span>
                ))}
                {calendarMatrix.flat().map((day, index) => {
                  const isHighlighted = day === 18;
                  const isSecondaryHighlight = day === 13;
                  return (
                    <div
                      key={`${day || "empty"}-${index}`}
                      className={`h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm ${
                        day
                          ? isHighlighted
                            ? "bg-[#F5941E] text-white font-semibold"
                            : isSecondaryHighlight
                            ? "bg-[#2FB972] text-white font-semibold"
                            : "text-gray-700"
                          : "text-transparent"
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow px-8 py-6 flex items-center gap-6">
            <div
              className="h-32 w-32 rounded-full flex items-center justify-center"
              style={{
                background: `conic-gradient(#F5941E ${procesoPercent}%, #F1F1F1 ${procesoPercent}%)`,
              }}
            >
              <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center text-2xl font-bold text-[#F5941E]">
                {procesoPercent}%
              </div>
            </div>
            <div>
              <p className="text-lg font-extrabold">Tickets en Proceso</p>
              <p className="text-sm text-gray-500 mt-2">
                {counts.proceso} tickets actualmente activos.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow px-8 py-6 flex items-center gap-6">
            <div
              className="h-32 w-32 rounded-full flex items-center justify-center"
              style={{
                background: `conic-gradient(#2FB972 ${resueltosPercent}%, #F1F1F1 ${resueltosPercent}%)`,
              }}
            >
              <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center text-2xl font-bold text-[#2FB972]">
                {resueltosPercent}%
              </div>
            </div>
            <div>
              <p className="text-lg font-extrabold">Tickets Resueltos</p>
              <p className="text-sm text-gray-500 mt-2">
                {counts.resueltos} tickets con solución confirmada.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
