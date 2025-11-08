"use client"

import * as React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Mail, X, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered, Indent, Outdent, Link, Image, Upload } from "lucide-react";
import { FaTicketAlt, FaSearch, FaCalendarAlt, FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

// Datos iniciales
const initialData = [
  {
    id: "INC001",
    tipo: "Red",
    usuario: "Juan Pérez",
    empresa: "Tech Solutions",
    area: "TI",
    sucursal: "Principal",
    estado: "activo",
    fecha: "2025-08-25",
    descripcion: "Falla en el software de PC",
    fechaRegistro: "2023-05-04",
    ultimaActualizacion: "2023-05-04",
    tiempoRespuesta: "3h 33m",
    prioridad: "Alta",
    soporte: true,
  },
  {
    id: "INC002",
    tipo: "Software",
    usuario: "María López",
    empresa: "Servicios Globales",
    area: "Soporte",
    sucursal: "Secundaria",
    estado: "inactivo",
    fecha: "2025-08-24",
    descripcion: "Falla en el hardware de laptops",
    fechaRegistro: "2023-05-04",
    ultimaActualizacion: "2023-05-04",
    tiempoRespuesta: "3h 33m",
    prioridad: "Media",
    soporte: false,
  },
];

function DataTableTickets() {
  const router = useRouter();
  const loadDataFromStorage = () => {
    try {
      if (typeof window === 'undefined') return initialData;
      const savedData = window.localStorage.getItem('boletos_cliente_data');
      return savedData ? JSON.parse(savedData) : initialData;
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      return initialData;
    }
  };

  const saveDataToStorage = (newData) => {
    try {
      if (typeof window === 'undefined') return;
      window.localStorage.setItem('boletos_cliente_data', JSON.stringify(newData));
      window.dispatchEvent(new CustomEvent('tickets:update', { detail: { tickets: newData } }));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  };

  const [data, setData] = React.useState(() => loadDataFromStorage());

  const updateData = (newData) => {
    setData(newData);
    saveDataToStorage(newData);
  };

  React.useEffect(() => {
    const savedData = loadDataFromStorage();
    if (Array.isArray(savedData) && savedData.length > 0) {
      setData(savedData);
    }
  }, []);

  const [search, setSearch] = React.useState("");
  const [estado, setEstado] = React.useState("todos");
  const [tipo, setTipo] = React.useState("todos");
  const [dateFrom, setDateFrom] = React.useState("");
  const [dateTo, setDateTo] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [ticketData, setTicketData] = React.useState({
    tipo: "",
    equipo: "",
    descripcion: "",
    prioridad: "Media"
  });

  const generateTicketId = () => {
    const count = data.length + 1;
    return `INC${count.toString().padStart(3, '0')}`;
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setTicketData({ tipo: "", equipo: "", descripcion: "", prioridad: "Media" });
  };

  const handleInputChange = (field, value) => {
    setTicketData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitTicket = () => {
    if (!ticketData.tipo || !ticketData.equipo || !ticketData.descripcion) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    const newTicket = {
      id: generateTicketId(),
      tipo: ticketData.tipo,
      usuario: "Usuario Actual",
      empresa: "Empresa Actual",
      area: "TI",
      sucursal: "Principal",
      estado: "activo",
      fecha: new Date().toISOString().split('T')[0],
      fechaRegistro: new Date().toISOString().split('T')[0],
      ultimaActualizacion: new Date().toISOString().split('T')[0],
      tiempoRespuesta: "30m",
      prioridad: ticketData.prioridad,
      soporte: false,
    };

    const updatedData = [...data, newTicket];
    updateData(updatedData);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('tickets:created', { detail: { ticket: newTicket, tickets: updatedData } }));
    }
    
    alert(`Ticket ${newTicket.id} creado exitosamente!`);
    closeModal();
  };

  const tipoOptions = ["todos", "red", "impresoras", "licencias", "laptops", "mantenimiento", "asesoria"];
  const estadoOptions = ["todos", "activo", "inactivo"];
  const equiposOptions = [
    "Laptop Asus Oficina Principal",
    "Desktop HP Sucursal Norte", 
    "Impresora Canon Oficina",
    "Router Cisco Principal",
    "Switch Netgear Sucursal"
  ];

  const filteredData = data.filter((row) => {
    const searchTarget = `${row.id} ${row.tipo} ${row.usuario} ${row.estado}`.toLowerCase();
    const matchesSearch = searchTarget.includes(search.toLowerCase());
    const matchesTipo = tipo === "todos" ? true : (row.tipo || "").toLowerCase() === tipo.toLowerCase();
    const matchesEstado = estado === "todos" ? true : (row.estado || "").toLowerCase() === estado.toLowerCase();

    const fechaBase = row.fechaRegistro || row.fecha || "";
    const fechaValor = fechaBase ? new Date(fechaBase) : null;
    const fromPass = dateFrom ? (fechaValor ? fechaValor >= new Date(dateFrom) : false) : true;
    const toPass = dateTo ? (fechaValor ? fechaValor <= new Date(dateTo) : false) : true;

    return matchesSearch && matchesTipo && matchesEstado && fromPass && toPass;
  });

  const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("es-PE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const renderEstadoBadge = (value) => {
    const normalized = (value || "").toLowerCase();
    const isActive = normalized === "activo";
    return (
      <span
        className={`px-3 py-1 text-xs font-semibold rounded-full ${
          isActive ? "bg-[#E3F8E9] text-[#1E8A4B]" : "bg-[#FDE0E0] text-[#CD3A3A]"
        }`}
      >
        {value ?? "-"}
      </span>
    );
  };

  return (
    <div className="font-[Poppins] space-y-6">
      {/* 🔸 FILTROS - EN UNA SOLA LÍNEA */}
      <div className="rounded-3xl bg-[#F8B65A] px-6 py-4 shadow text-[#1E1E1E] flex flex-wrap items-center justify-between gap-10">
        {/* Tipo de incidente */}
        <div className="flex items-center gap-2 flex-1 min-w-[180px]">
          <FaSearch className="text-gray-600 text-sm" />
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F5941E]"
          >
            {tipoOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt === "todos"
                  ? "Buscar tipo de incidente"
                  : opt.charAt(0).toUpperCase() + opt.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Rango de fecha */}
        <div className="flex items-center gap-2 flex-1 justify-center min-w-[260px]">
          <FaCalendarAlt className="text-gray-600 text-sm" />
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F5941E]"
          />
          <span className="text-sm font-semibold">al</span>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F5941E]"
          />
        </div>

        {/* Estado */}
        <div className="flex items-center gap-2 flex-1 min-w-[160px]">
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="w-full rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F5941E]"
          >
            {estadoOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt === "todos" ? "Estado" : opt.charAt(0).toUpperCase() + opt.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Buscar */}
        <div className="flex items-center gap-2 flex-1 min-w-[180px]">
          <FaSearch className="text-gray-600 text-sm" />
        <input
          type="text"
            placeholder="Buscar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F5941E]"
          />
        </div>

        {/* Botón agregar */}
        <Button 
          onClick={openModal}
           className="rounded-full bg-[#F2881C] px-6 py-2 text-sm font-bold shadow hover:bg-[#e67f18]"
        >
           + Agregar
        </Button>
      </div>

      {/* 🔹 TABLA */}
      <div className="overflow-hidden rounded-3xl bg-white shadow">
        <Table>
          <TableHeader className="bg-[#D9D9D9] text-[#1E1E1E]">
            <TableRow className="text-sm font-semibold">
              <TableHead className="px-6 py-4 text-left">Fecha registro</TableHead>
              <TableHead className="px-6 py-4 text-left">Tipo de incidente</TableHead>
              <TableHead className="px-6 py-4 text-center">Estado</TableHead>
              <TableHead className="px-6 py-4 text-left">Última actualización</TableHead>
              <TableHead className="px-6 py-4 text-left">Tiempo de respuesta</TableHead>
              <TableHead className="px-6 py-4 text-center">Chat</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <TableRow
                  key={row.id}
                  className={`text-sm text-[#1E1E1E] ${index % 2 === 0 ? "bg-white" : "bg-[#F6F6F6]"}`}
                >
                  <TableCell className="px-6 py-4 font-medium">{formatDate(row.fechaRegistro || row.fecha)}</TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex flex-col leading-tight">
                      <span className="font-semibold">{row.tipo ?? "—"}</span>
                      <span className="text-xs text-gray-500">{row.descripcion ?? row.usuario ?? ""}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-center">{renderEstadoBadge(row.estado)}</TableCell>
                  <TableCell className="px-6 py-4">{formatDate(row.ultimaActualizacion || row.fecha)}</TableCell>
                  <TableCell className="px-6 py-4">{row.tiempoRespuesta ?? "30m"}</TableCell>
                  <TableCell className="px-6 py-4 text-center">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-full border border-[#F8B65A] bg-[#FFF6EA] text-[#F2881C] hover:bg-[#F8B65A] hover:text-white"
                      onClick={() => router.push(`/cliente/chat_cliente?ticket=${row.id}`)}
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                    </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="px-6 py-6 text-center text-gray-500">
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

       {/* 🔹 MODAL REGISTRAR TICKETS */}
      {isModalOpen && (
        <div 
           className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={closeModal}
        >
          <div 
             className="relative w-full max-w-4xl rounded-3xl bg-[#F9F9FB] p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
              <Button 
               size="icon"
               variant="ghost"
               className="absolute right-5 top-5 text-gray-400 hover:text-gray-600"
                onClick={closeModal}
              >
               <X className="h-5 w-5" />
              </Button>

             <h2 className="mb-6 text-center text-3xl font-black text-[#1E1E1E]">
               Registrar tickets
             </h2>

             <div className="grid gap-4 md:grid-cols-2">
               <div className="rounded-2xl bg-[#F8B65A] px-6 py-3 text-center font-bold text-white shadow">
                Ticket #{generateTicketId()}
              </div>
               <div className="rounded-2xl bg-[#F8B65A] px-6 py-3 text-center font-bold text-white shadow">
                 Fecha: {new Date().toLocaleDateString("es-ES")}
              </div>
            </div>

             <div className="mt-6 grid gap-6 md:grid-cols-[2fr_1fr]">
               <div className="space-y-5">
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-[#1E1E1E] uppercase">
                    Tipo:
                  </label>
                  <input
                    type="text"
                    placeholder="Tipo de incidente"
                    value={ticketData.tipo}
                     onChange={(e) => handleInputChange("tipo", e.target.value)}
                     className="w-full rounded-full border border-[#F4C27E] bg-white px-5 py-3 text-sm shadow focus:outline-none focus:ring-2 focus:ring-[#F5941E]"
                  />
                </div>

                 <div className="space-y-2">
                   <label className="text-sm font-bold text-[#1E1E1E] uppercase">
                    Equipo:
                  </label>
                  <select
                    value={ticketData.equipo}
                     onChange={(e) => handleInputChange("equipo", e.target.value)}
                     className="w-full rounded-full border border-[#F4C27E] bg-white px-5 py-3 text-sm shadow focus:outline-none focus:ring-2 focus:ring-[#F5941E]"
                  >
                    <option value="">Seleccionar equipo</option>
                    {equiposOptions.map((equipo) => (
                       <option key={equipo} value={equipo}>
                         {equipo}
                       </option>
                    ))}
                  </select>
                </div>

                 <div className="space-y-2">
                   <label className="text-sm font-bold text-[#1E1E1E] uppercase">
                    Prioridad:
                  </label>
                  <select
                    value={ticketData.prioridad}
                     onChange={(e) => handleInputChange("prioridad", e.target.value)}
                     className="w-full rounded-full border border-[#F4C27E] bg-white px-5 py-3 text-sm shadow focus:outline-none focus:ring-2 focus:ring-[#F5941E]"
                  >
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                    <option value="Crítica">Crítica</option>
                  </select>
                </div>

                 <div className="space-y-2">
                   <label className="text-sm font-bold text-[#1E1E1E] uppercase">
                    Descripción:
                  </label>
                   <div className="rounded-3xl border border-[#F4C27E] bg-white p-4 shadow">
                     <div className="mb-3 flex flex-wrap items-center gap-2 text-gray-500">
                       {[Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify].map(
                         (Icon, idx) => (
                           <Button key={idx} size="icon" variant="ghost" className="h-8 w-8 p-0">
                             <Icon className="h-4 w-4" />
                    </Button>
                         )
                       )}
                       <div className="mx-2 h-6 w-px bg-gray-200" />
                       {[List, ListOrdered, Indent, Outdent, Link, Image, Upload].map((Icon, idx) => (
                         <Button key={idx} size="icon" variant="ghost" className="h-8 w-8 p-0">
                           <Icon className="h-4 w-4" />
                    </Button>
                       ))}
                  </div>
                  <textarea
                    value={ticketData.descripcion}
                       onChange={(e) => handleInputChange("descripcion", e.target.value)}
                       placeholder="Describe el incidente..."
                       className="h-36 w-full resize-none rounded-2xl border border-[#F4C27E]/60 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5941E]"
                     />
                   </div>
                </div>
              </div>

              <div className="space-y-4">
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-[#1E1E1E] uppercase">
                    Imagen:
                  </label>
                   <div className="flex h-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#F4C27E] bg-white p-6 text-sm text-gray-500 shadow">
                     <svg
                       className="h-16 w-16 text-[#F4C27E]"
                       fill="none"
                       stroke="currentColor"
                       viewBox="0 0 24 24"
                       xmlns="http://www.w3.org/2000/svg"
                     >
                       <path
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         strokeWidth="2"
                         d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                       />
                      </svg>
                    <Button 
                      variant="outline" 
                      size="sm"
                       className="mt-4 rounded-full border-2 border-[#F2881C] text-[#F2881C] hover:bg-[#F2881C] hover:text-white"
                    >
                      Ingresar imagen
                    </Button>
                  </div>
                </div>
              </div>
            </div>

             <div className="mt-8 flex flex-col gap-4 border-t border-gray-200 pt-6 md:flex-row md:justify-between">
              <Button 
                 variant="outline"
                onClick={closeModal}
                 className="rounded-full border-2 border-gray-300 px-8 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSubmitTicket}
                 className="rounded-full bg-gradient-to-r from-[#F2881C] to-[#F5A12F] px-10 py-2 text-sm font-bold text-white shadow hover:brightness-95"
              >
                Agregar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ListaTickets() {
  return (
    <div className="min-h-screen bg-[#E5E5E5] px-6 py-8 text-[#1E1E1E]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8">
        <header className="flex items-center justify-between rounded-3xl bg-white px-10 py-6 shadow">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F5941E]/20 text-3xl text-[#F5941E]">
              <FaTicketAlt />
            </div>
            <div>
              <p className="text-3xl font-black leading-tight">Lista de Tickets</p>
              <span className="text-sm text-gray-500">Panel de seguimiento</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right text-sm text-gray-600">
              <p className="font-semibold">J&P PERIFERICOS S.A.C.</p>
              <span className="text-xs text-gray-400">Los Olivos</span>
            </div>
            <div className="h-12 w-px bg-gray-200" />
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5941E]/15">
                <FaUserCircle className="text-2xl text-[#F5941E]" />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-700">Alberto Perez</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  Trabajador
                  <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                </div>
        </div>
        </div>
      </div>
        </header>

      <DataTableTickets />
      </div>
    </div>
  );
}
