"use client";

import React from "react";
import {
  FaDesktop,
  FaLaptop,
  FaMobileAlt,
  FaPrint,
  FaSearch,
  FaSlidersH,
} from "react-icons/fa";

const productData = [
  {
    id: "prod-001",
    nombre: "Laptop Lenovo ThinkPad",
    area: "Administración",
    categoria: "Laptops",
    estado: "Operativo",
    icon: <FaLaptop />,
  },
  {
    id: "prod-002",
    nombre: "Impresora HP LaserJet",
    area: "Administración",
    categoria: "Impresoras",
    estado: "En mantenimiento",
    icon: <FaPrint />,
  },
  {
    id: "prod-003",
    nombre: "PC Dell Optiplex",
    area: "Soporte Técnico",
    categoria: "Desktop",
    estado: "Operativo",
    icon: <FaDesktop />,
  },
  {
    id: "prod-004",
    nombre: "Tablet Samsung Galaxy Tab",
    area: "Ventas",
    categoria: "Tablets",
    estado: "Operativo",
    icon: <FaMobileAlt />,
  },
  {
    id: "prod-005",
    nombre: "Laptop HP ProBook",
    area: "Comercial",
    categoria: "Laptops",
    estado: "Operativo",
    icon: <FaLaptop />,
  },
  {
    id: "prod-006",
    nombre: "Impresora Epson EcoTank",
    area: "Recursos Humanos",
    categoria: "Impresoras",
    estado: "Operativo",
    icon: <FaPrint />,
  },
];

const sortOptions = [
  { value: "nombre", label: "Nombre" },
  { value: "area", label: "Área" },
  { value: "categoria", label: "Categoría" },
  { value: "estado", label: "Estado" },
];

export default function ProductosCliente() {
  const [search, setSearch] = React.useState("");
  const [sortBy, setSortBy] = React.useState("nombre");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("usuario");

  const filteredProducts = React.useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const result = productData.filter((product) => {
      if (!normalizedSearch) return true;
      return (
        product.nombre.toLowerCase().includes(normalizedSearch) ||
        product.area.toLowerCase().includes(normalizedSearch) ||
        product.categoria.toLowerCase().includes(normalizedSearch)
      );
    });

    return [...result].sort((a, b) => {
      const valueA = a[sortBy]?.toString().toLowerCase() ?? "";
      const valueB = b[sortBy]?.toString().toLowerCase() ?? "";
      return valueA.localeCompare(valueB, "es");
    });
  }, [search, sortBy]);

  const closeModal = React.useCallback(() => {
    setIsModalOpen(false);
    setActiveTab("usuario");
  }, []);

  return (
    <div className="min-h-screen bg-[#E5E5E5] px-6 py-8 font-[Poppins] text-[#1E1E1E]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8">
        <header className="flex items-center justify-between rounded-3xl bg-white px-10 py-6 shadow">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F5941E]/20 text-3xl text-[#F5941E]">
              <FaDesktop />
            </div>
            <div>
              <p className="text-3xl font-black leading-tight">Lista de Equipos</p>
              <span className="text-sm text-gray-500">
                Inventario asignado a tu organización
              </span>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="text-right">
              <p className="font-semibold">J&P PERIFERICOS S.A.C.</p>
              <span className="text-xs text-gray-400">Los Olivos</span>
            </div>
            <div className="h-12 w-px bg-gray-200" />
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-700">Alberto Perez</p>
              <span className="flex items-center justify-end gap-2 text-xs text-gray-500">
                Trabajador <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
              </span>
            </div>
          </div>
        </header>

        <section className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-[#F8B65A] px-6 py-4 shadow text-sm text-[#1E1E1E]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wide">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-[#F5941E]"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <FaSearch className="pointer-events-none absolute left-4 top-[10px] text-sm text-gray-500" />
              <input
                type="text"
                placeholder="Buscar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-72 rounded-full bg-white px-10 py-2 text-sm font-semibold text-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-[#F5941E]"
              />
            </div>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg text-gray-700 shadow"
              title="Filtros avanzados"
            >
              <FaSlidersH />
            </button>
            <button
              type="button"
              className="rounded-full bg-[#F2881C] px-5 py-2 text-sm font-semibold text-white shadow hover:brightness-95"
              onClick={() => setIsModalOpen(true)}
            >
              Registrar equipo
            </button>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="flex flex-col gap-4 rounded-3xl bg-white px-6 py-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F8B65A]/40 text-3xl text-[#1E1E1E]">
                  {product.icon}
                </div>
                <div>
                  <p className="text-lg font-bold text-[#1E1E1E]">{product.nombre}</p>
                  <span className="text-xs font-semibold uppercase text-gray-500">
                    Área: <span className="normal-case capitalize text-[#1E1E1E]">{product.area}</span>
                  </span>
                </div>
              </div>
              <div className="grid gap-2 text-sm text-gray-600">
                <p>
                  <span className="font-semibold text-[#1E1E1E]">Categoría:</span>{" "}
                  {product.categoria}
                </p>
                <p>
                  <span className="font-semibold text-[#1E1E1E]">Estado:</span>{" "}
                  {product.estado}
                </p>
                <p>
                  <span className="font-semibold text-[#1E1E1E]">Código:</span>{" "}
                  {product.id.toUpperCase()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex-1 rounded-full border border-[#F2881C] px-4 py-2 text-sm font-semibold text-[#F2881C] transition hover:bg-[#F2881C] hover:text-white"
                >
                  Ver detalles
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-full bg-[#F2881C] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-95"
                >
                  Reportar incidencia
                </button>
              </div>
            </article>
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full rounded-3xl bg-white px-10 py-16 text-center text-sm text-gray-500 shadow">
              No se encontraron resultados para tu búsqueda.
            </div>
          )}
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white px-6 py-4 text-xs text-gray-600 shadow">
          <span>Del 1 al {Math.min(filteredProducts.length, 10)} de {filteredProducts.length} resultados</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm">
              <button type="button" className="rounded-full border border-gray-300 px-2 py-1 hover:bg-gray-100">
                {"<"}
              </button>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F2881C] text-white">
                1
              </span>
              <span className="text-gray-400">2 · 3 · 4</span>
              <button type="button" className="rounded-full border border-gray-300 px-2 py-1 hover:bg-gray-100">
                {">"}
              </button>
            </div>
            <select className="rounded-full border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5941E]">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </footer>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4 py-10 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl rounded-3xl bg-[#F4F4F6] shadow-2xl">
            <div className="rounded-t-3xl bg-[#F8B65A] px-8 py-5 text-center text-2xl font-bold text-[#1E1E1E]">
              Registrar Equipo
            </div>
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-6 top-6 text-2xl font-bold text-[#1E1E1E]/60 hover:text-[#1E1E1E]"
            >
              ×
            </button>
            <div className="flex justify-center gap-2 py-6">
              {[
                { id: "usuario", label: "Usuario" },
                { id: "hardware", label: "Hardware" },
                { id: "software", label: "Software" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-full px-6 py-2 text-sm font-semibold ${
                    activeTab === tab.id
                      ? "bg-[#F8B65A] text-[#1E1E1E]"
                      : "bg-[#EDEEF2] text-gray-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="space-y-6 px-10 pb-10">
              {activeTab === "usuario" && (
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#1E1E1E]">Usuario:</label>
                    <input
                      className="w-full rounded-full bg-[#FDEFD9] px-4 py-2 text-sm font-semibold text-gray-700 focus:outline-none"
                      defaultValue="Alberto Perez"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#1E1E1E]">Área:</label>
                    <input
                      className="w-full rounded-full bg-[#FDEFD9] px-4 py-2 text-sm font-semibold text-gray-700 focus:outline-none"
                      defaultValue="Administración"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-[#1E1E1E]">Sucursal:</label>
                    <input
                      className="w-full rounded-full bg-[#FDEFD9] px-4 py-2 text-sm font-semibold text-gray-700 focus:outline-none"
                      placeholder="Sucursal Principal"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-[#1E1E1E]">Pin de Usuario:</label>
                    <input
                      className="w-full rounded-full bg-[#FDEFD9] px-4 py-2 text-sm font-semibold text-gray-700 focus:outline-none"
                      defaultValue="9876543"
                    />
                  </div>
                </div>
              )}

              {activeTab === "hardware" && (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      { label: "Tipo del equipo", value: "Laptop" },
                      { label: "N° Serie", value: "22489126313249" },
                      { label: "Fecha de compra", value: "15 Dic 2023" },
                      { label: "Plan", value: "Plan básico" },
                      { label: "Marca", value: "Lenovo" },
                      { label: "Proveedor", value: "Lenovo" },
                      { label: "Descripción del equipo", value: "Laptop color azul con código 123 en pantalla", colSpan: 3, textarea: true },
                      { label: "Última revisión", value: "04 May 2023" },
                      { label: "Revisión programada", value: "04 Jun 2024" },
                    ].map((field, index) => (
                      <div key={index} className={`space-y-2 ${field.colSpan ? `md:col-span-${field.colSpan}` : ""}`}>
                        <label className="text-sm font-semibold text-[#1E1E1E]">{field.label}:</label>
                        {field.textarea ? (
                          <textarea
                            className="w-full rounded-2xl bg-[#FDEFD9] px-4 py-2 text-sm font-semibold text-gray-700 focus:outline-none"
                            defaultValue={field.value}
                            rows={3}
                          />
                        ) : (
                          <input
                            className="w-full rounded-full bg-[#FDEFD9] px-4 py-2 text-sm font-semibold text-gray-700 focus:outline-none"
                            defaultValue={field.value}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="overflow-hidden rounded-2xl bg-white shadow">
                    <table className="w-full text-left text-xs text-gray-600">
                      <thead className="bg-[#F8B65A]/40 text-[#1E1E1E]">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Tipo</th>
                          <th className="px-4 py-3 font-semibold">Fecha de instalación</th>
                          <th className="px-4 py-3 font-semibold">Descripción</th>
                          <th className="px-4 py-3 font-semibold">Serie</th>
                          <th className="px-4 py-3 font-semibold">Proveedor</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white">
                          <td className="px-4 py-3 font-semibold text-[#1E1E1E]">SSD</td>
                          <td className="px-4 py-3">5 May 2024</td>
                          <td className="px-4 py-3">Almacenamiento de 500 GB</td>
                          <td className="px-4 py-3">X001-SSD500</td>
                          <td className="px-4 py-3">Tienda X</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "software" && (
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-[#1E1E1E]">Detalles del software:</p>
                  <div className="overflow-hidden rounded-2xl bg-white shadow">
                    <table className="w-full text-left text-xs text-gray-600">
                      <thead className="bg-[#F8B65A]/40 text-[#1E1E1E]">
                        <tr>
                          {[
                            "Nombre",
                            "Licencia",
                            "Correo",
                            "Contraseña",
                            "Fecha de instalación",
                            "Fecha de caducidad",
                            "Proveedor",
                          ].map((col) => (
                            <th key={col} className="px-4 py-3 font-semibold">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["Antivirus", "XXXXXXXX", "gtt@gmail.com", "pppaaapp", "25 May 2023", "25 May 2024", "Info Tec"],
                          ["Microsoft Windows", "8376478292", "asd@gmail.com", "pppaaapp", "25 Ene 2020", "25 Ene 2021", "Info Tec"],
                          ["Adobe", "8475637289", "asda@gmail.com", "pppaaapp", "20 Jun 2023", "25 Jun 2024", "Internet"],
                          ["Adobe Reader", "2947373920", "dfd@gmail.com", "pppaaapp", "30 May 2023", "30 May 2024", "Internet"],
                        ].map((row, idx) => (
                          <tr key={idx} className="bg-white">
                            {row.map((cell, cellIdx) => (
                              <td key={cellIdx} className="px-4 py-3">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-full border border-gray-300 px-6 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="rounded-full bg-[#F2881C] px-6 py-2 text-sm font-semibold text-white hover:brightness-95"
                >
                  Guardar equipo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
