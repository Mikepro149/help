"use client"

import * as React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Mail, X, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered, Indent, Outdent, Link, Image, Upload } from "lucide-react";
import { useIsClient } from "@/hooks/use-isomorphic-layout-effect";

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
    prioridad: "Media",
    soporte: false,
  },
];

const columns = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "tipo", header: "Tipo de incidente" },
  { accessorKey: "usuario", header: "Usuario" },
  { accessorKey: "empresa", header: "Empresa" },
  { accessorKey: "area", header: "Área" },
  { accessorKey: "sucursal", header: "Sucursal" },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => (
      <span style={{
        color: row.estado === "activo" ? "#22c55e" : "#ef4444",
        fontWeight: "bold"
      }}>
        {row.estado}
      </span>
    ),
  },
  { accessorKey: "fecha", header: "Fecha de registro" },
  { accessorKey: "prioridad", header: "Prioridad" },
  {
    id: "chat",
    header: "Chat",
    cell: ({ row }) => (
      <Button
        size="sm"
        variant="ghost"
        onClick={() => window.location.href = `/cliente/boletos_cliente/chat/${row.id}`}
      >
        <Mail className="w-5 h-5 text-blue-500" />
      </Button>
    ),
  },
  {
    accessorKey: "soporte",
    header: "Soporte in Situ",
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.soporte}
        onChange={() => {}}
        style={{ width: "20px", height: "20px" }}
      />
    ),
  },
  {
    accessorKey: "img",
    header: "Imagen",
    cell: ({ row }) => (
      <span className={`px-2 py-1 rounded text-xs font-medium ${
        row.img ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'
      }`}>
        {row.img ? 'Sí' : 'No'}
      </span>
    ),
  },
];

function DataTableTickets() {
  const isClient = useIsClient();

  // Función para cargar datos del localStorage
  const loadDataFromStorage = () => {
    try {
      if (!isClient) return initialData;
      const savedData = window.localStorage.getItem('boletos_cliente_data');
      return savedData ? JSON.parse(savedData) : initialData;
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      return initialData;
    }
  };

  // Función para guardar datos en localStorage y notificar
  const saveDataToStorage = (newData) => {
    try {
      if (!isClient) return;
      window.localStorage.setItem('boletos_cliente_data', JSON.stringify(newData));
      // Notificar a otros componentes que los tickets cambiaron
      window.dispatchEvent(new CustomEvent('tickets:update', { detail: { tickets: newData } }));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  };

  // Estado para los datos dinámicos - inicializar con datos del localStorage
  const [data, setData] = React.useState(() => loadDataFromStorage());

  // Función para actualizar datos y guardar en localStorage
  const updateData = (newData) => {
    setData(newData);
    saveDataToStorage(newData);
  };

  // Efecto para cargar datos del localStorage al montar el componente
  React.useEffect(() => {
    const savedData = loadDataFromStorage();
    if (Array.isArray(savedData) && savedData.length > 0) {
      setData(savedData);
    }
  }, []);

  // Función para limpiar todos los datos (útil para testing)
  const clearAllData = () => {
    if (confirm('¿Estás seguro de que quieres eliminar todos los tickets? Esta acción no se puede deshacer.')) {
      updateData(initialData);
      alert('Todos los tickets han sido eliminados.');
    }
  };

  // Estados para cada filtro
  const [search, setSearch] = React.useState("");
  const [estado, setEstado] = React.useState("todos");
  const [id, setId] = React.useState("todos");
  const [tipo, setTipo] = React.useState("todos");
  const [area, setArea] = React.useState("todos");
  const [prioridad, setPrioridad] = React.useState("todos");
  const [soporte, setSoporte] = React.useState("todos");

  // Estados para el modal de agregar ticket
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [ticketData, setTicketData] = React.useState({
    tipo: "",
    equipo: "",
    descripcion: "",
    prioridad: "Media",
    imagen: null
  });
  const [imagePreview, setImagePreview] = React.useState(null);

  // Función para generar ID único
  const generateTicketId = () => {
    const count = data.length + 1;
    return `INC${count.toString().padStart(3, '0')}`;
  };

  // Funciones para manejar el modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setTicketData({ tipo: "", equipo: "", descripcion: "", prioridad: "Media", imagen: null });
    setImagePreview(null);
  };

  const handleInputChange = (field, value) => {
    setTicketData(prev => ({ ...prev, [field]: value }));
  };

  // Función para manejar la subida de imagen
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecciona solo archivos de imagen.');
        return;
      }
      
      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen es demasiado grande. Máximo 5MB.');
        return;
      }

      // Crear preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      
      // Guardar archivo en el estado
      setTicketData(prev => ({ ...prev, imagen: file }));
    }
  };

  // Función para eliminar imagen
  const handleRemoveImage = () => {
    setTicketData(prev => ({ ...prev, imagen: null }));
    setImagePreview(null);
  };

  // Función para manejar drag & drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Crear un evento sintético para usar la función existente
      const syntheticEvent = {
        target: { files: [file] }
      };
      handleImageUpload(syntheticEvent);
    }
  };

  const handleSubmitTicket = () => {
    // Validar que los campos requeridos estén llenos
    if (!ticketData.tipo || !ticketData.equipo || !ticketData.descripcion) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    // Crear nuevo ticket
    const newTicket = {
      id: generateTicketId(),
      tipo: ticketData.tipo,
      usuario: "Usuario Actual", // Puedes cambiar esto por el usuario logueado
      empresa: "Empresa Actual", // Puedes cambiar esto por la empresa del usuario
      area: "TI", // Puedes cambiar esto según el área
      sucursal: "Principal", // Puedes cambiar esto según la sucursal
      estado: "activo",
      fecha: new Date().toISOString().split('T')[0], // Fecha actual
      prioridad: ticketData.prioridad, // Usar la prioridad del formulario
      soporte: false, // Por defecto no requiere soporte in situ
      img: ticketData.imagen ? ticketData.imagen.name : null, // Guardar nombre de la imagen
    };

    // Agregar el nuevo ticket a la lista
    const updatedData = [...data, newTicket];
    updateData(updatedData);
    if (isClient) {
      window.dispatchEvent(new CustomEvent('tickets:created', { detail: { ticket: newTicket, tickets: updatedData } }));
    }
    
    // Mostrar mensaje de éxito
    alert(`Ticket ${newTicket.id} creado exitosamente!`);
    
    // Cerrar modal y limpiar formulario
    closeModal();
  };

  // Opciones para los selects
  const idOptions = ["todos", ...data.map(d => d.id)];
  const tipoOptions = ["todos", "red", "impresoras", "licencias", "laptops", "mantenimiento", "asesoria"];
  const areaOptions = ["todos", ...Array.from(new Set(data.map(d => d.area)))];
  const prioridadOptions = ["todos", "Alta", "Media", "Baja"];
  const soporteOptions = ["todos", "sí", "no"];

  // Opciones para el formulario de ticket
  const equiposOptions = [
    "Laptop Asus Oficina Principal",
    "Desktop HP Sucursal Norte", 
    "Impresora Canon Oficina",
    "Router Cisco Principal",
    "Switch Netgear Sucursal"
  ];

  // Filtro de datos
  const filteredData = data.filter((row) => {
    // Filtro de búsqueda global
    const matchesSearch = Object.values(row)
      .some((val) => val?.toString().toLowerCase().includes(search.toLowerCase()));

    // Filtros individuales
    const matchesId = id === "todos" ? true : row.id === id;
    const matchesTipo = tipo === "todos" ? true : row.tipo.toLowerCase() === tipo.toLowerCase();
    const matchesArea = area === "todos" ? true : row.area.toLowerCase() === area.toLowerCase();
    const matchesEstado = estado === "todos" ? true : row.estado.toLowerCase() === estado.toLowerCase();
    const matchesPrioridad = prioridad === "todos" ? true : row.prioridad.toLowerCase() === prioridad.toLowerCase();
    const matchesSoporte = soporte === "todos" ? true : (soporte === "sí" ? row.soporte === true : row.soporte === false);

    return matchesSearch && matchesId && matchesTipo && matchesArea && matchesEstado && matchesPrioridad && matchesSoporte;
  });

  return (
    <div className="w-full overflow-hidden font-[Poppins]">
      {/* Barra de búsqueda y filtros avanzados */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-1/4 min-w-[180px]"
        />
        <select value={id} onChange={e => setId(e.target.value)} className="border border-gray-300 rounded px-3 py-2">
          {idOptions.map(opt => <option key={opt} value={opt}>{opt === "todos" ? "Todos los ID" : opt}</option>)}
        </select>
        <select value={tipo} onChange={e => setTipo(e.target.value)} className="border border-gray-300 rounded px-3 py-2">
          {tipoOptions.map(opt => <option key={opt} value={opt}>{opt === "todos" ? "Todos los tipos" : opt.charAt(0).toUpperCase() + opt.slice(1)}</option>)}
        </select>
        <select value={area} onChange={e => setArea(e.target.value)} className="border border-gray-300 rounded px-3 py-2">
          {areaOptions.map(opt => <option key={opt} value={opt}>{opt === "todos" ? "Todas las áreas" : opt}</option>)}
        </select>
        <select value={estado} onChange={e => setEstado(e.target.value)} className="border border-gray-300 rounded px-3 py-2">
          <option value="todos">Todos los estados</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
        <select value={prioridad} onChange={e => setPrioridad(e.target.value)} className="border border-gray-300 rounded px-3 py-2">
          {prioridadOptions.map(opt => <option key={opt} value={opt}>{opt === "todos" ? "Todas las prioridades" : opt}</option>)}
        </select>
        <select value={soporte} onChange={e => setSoporte(e.target.value)} className="border border-gray-300 rounded px-3 py-2">
          {soporteOptions.map(opt => <option key={opt} value={opt}>{opt === "todos" ? "Soporte in Situ" : opt.charAt(0).toUpperCase() + opt.slice(1)}</option>)}
        </select>
        <Button 
          onClick={openModal}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
        >
          Agregar
        </Button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto border border-gray-300 rounded-lg bg-white">
        <Table className="min-w-[900px] text-center bg-white">
          <TableHeader className="sticky top-0 z-10 bg-orange-300">
            <TableRow className="border-b border-gray-300">
              {columns.map((col) => (
                <TableHead key={col.header} className="px-4 py-3 font-semibold text-gray-700 whitespace-nowrap text-center">
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <TableRow key={row.id} className={`transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-blue-100`}>
                  {columns.map((col) => (
                    <TableCell key={col.header} className="px-4 py-3 border-b border-gray-300 text-sm text-center">
                      {col.cell
                        ? col.cell({ row })
                        : row[col.accessorKey] !== undefined
                          ? row[col.accessorKey].toString()
                          : ""}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-4 text-gray-500">
                  No se encontraron resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal para agregar ticket */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-[2px] flex items-center justify-center z-[9999] animate-in fade-in duration-300"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-gray-100 p-8 w-full max-w-5xl max-h-[95vh] overflow-y-auto transform transition-all duration-300 ease-out scale-100 animate-in zoom-in-95 slide-in-from-bottom-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del modal */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
              <h2 className="text-3xl font-bold text-gray-800 text-center flex-1">Registrar tickets</h2>
              <Button 
                onClick={closeModal}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Ticket ID y Fecha */}
            <div className="flex gap-4 mb-8">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg">
                Ticket #{generateTicketId()}
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg">
                Fecha: {new Date().toLocaleDateString('es-ES')}
              </div>
            </div>

            {/* Formulario */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Columna izquierda - Campos principales */}
              <div className="lg:col-span-2 space-y-4">
                {/* Tipo */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Tipo:
                  </label>
                  <input
                    type="text"
                    placeholder="Tipo de incidente"
                    value={ticketData.tipo}
                    onChange={(e) => handleInputChange('tipo', e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  />
                </div>

                {/* Equipo */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Equipo:
                  </label>
                  <select
                    value={ticketData.equipo}
                    onChange={(e) => handleInputChange('equipo', e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  >
                    <option value="">Seleccionar equipo</option>
                    {equiposOptions.map((equipo) => (
                      <option key={equipo} value={equipo}>{equipo}</option>
                    ))}
                  </select>
                </div>

                {/* Prioridad */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Prioridad:
                  </label>
                  <select
                    value={ticketData.prioridad}
                    onChange={(e) => handleInputChange('prioridad', e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  >
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                    <option value="Crítica">Crítica</option>
                  </select>
                </div>

                {/* Descripción con editor de texto */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Descripción:
                  </label>
                  
                  {/* Barra de herramientas del editor */}
                  <div className="border-2 border-gray-200 rounded-t-lg p-3 bg-gray-50 flex flex-wrap gap-2 shadow-sm">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Bold className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Italic className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Underline className="w-4 h-4" />
                    </Button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <AlignLeft className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <AlignCenter className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <AlignRight className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <AlignJustify className="w-4 h-4" />
                    </Button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <List className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <ListOrdered className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Indent className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Outdent className="w-4 h-4" />
                    </Button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Link className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Image className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Área de texto */}
                  <textarea
                    value={ticketData.descripcion}
                    onChange={(e) => handleInputChange('descripcion', e.target.value)}
                    placeholder="Escribe tu problema..."
                    className="w-full border-2 border-gray-200 border-t-0 rounded-b-lg px-4 py-3 h-36 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              {/* Columna derecha - Subida de imagen */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Imagen:
                  </label>
                  
                  {imagePreview ? (
                    <div className="border-2 border-gray-300 rounded-xl p-4 bg-gray-50">
                      <div className="relative">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            {ticketData.imagen?.name}
                          </span>
                          <Button 
                            onClick={handleRemoveImage}
                            variant="outline"
                            size="sm"
                            className="text-red-500 border-red-300 hover:bg-red-50"
                          >
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                      onDragOver={handleDragOver}
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => document.getElementById('image-upload').click()}
                    >
                      <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <Button 
                        type="button"
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          document.getElementById('image-upload').click();
                        }}
                        className="mt-2 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors cursor-pointer"
                      >
                        Ingresar imagen
                      </Button>
                      <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF hasta 5MB</p>
                      <p className="text-xs text-blue-500 mt-1">o arrastra y suelta aquí</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
              <Button 
                onClick={closeModal}
                variant="outline"
                className="px-8 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSubmitTicket}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-200"
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
    <div className="p-4">
      {/* Container superior */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "30px 20px 0 20px",
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 2px 8px #0001",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "30px"
      }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: "32px", marginRight: "15px" }}>🏠</span>
          <span style={{ fontSize: "24px", fontWeight: "bold" }}>Lista de tickets</span>
        </div>
        <div style={{ textAlign: "right", fontSize: "16px", color: "#333" }}>
          <span style={{ fontWeight: "bold" }}>Empresa</span> | Juan Pérez &nbsp;
          <span style={{ color: "#888" }}>Cargo: Administrador</span>
        </div>
      </div>
      <DataTableTickets />
    </div>
  );
}
