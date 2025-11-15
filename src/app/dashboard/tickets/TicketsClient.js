"use client"

import { useEffect, useState } from "react"
import Table from "@/components/common/Table"
import Pagination from "@/components/common/Pagination"
import FilterBar from "@/components/common/FilterBar"
import { useTableData } from "@/hooks/useTableData"
import { getFilterConfig } from "@/components/filters/filterConfigs"
import { getTicketColumns } from "@/components/tables/ticketColumns"
// 1. Importa tu hook de autenticación
import { useUser } from "@/context/UserContext" // Ajusta esta ruta si es diferente

export default function TicketsClient({ role }) {
  const {
    data,
    filters,
    handleFilterChange,
    handleSearch,
    currentPage,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange,
    updateData,
  } = useTableData([], 10) // Inicializa vacío

  // --- Estados para la API ---
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // --- Estados para paginación del servidor ---
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  
  // 2. Obtén la función 'fetchWithAuth' de tu contexto
  // Esta función ya maneja el accessToken y el refresh automático
  const { fetchWithAuth } = useUser() 

  useEffect(() => {
    // 3. Verifica si el contexto está listo
    // Si fetchWithAuth no existe, el UserProvider aún está cargando o no está
    if (!fetchWithAuth) {
      setLoading(true) // Muestra "Cargando..." mientras el contexto carga
      return
    }

    const fetchTickets = async () => {
      setLoading(true)
      setError(null)
      
      try {
        // 1. Construir Query Params (basado en tu FilterTicketDto de Nest)
        const params = new URLSearchParams()
        params.append("page", currentPage.toString())
        params.append("limit", itemsPerPage.toString())

        // Mapear filtros de 'useTableData' a los nombres de tu DTO
        if (filters.search) {
          params.append("search", filters.search) // Asume que tu DTO tiene 'search'
        }
        // Ejemplo: if (filters.sucursal) params.append("sucursalId", filters.sucursal)

        // 2. Definir URL de la API (usar variables de entorno)
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
        const url = `${apiUrl}/tickets?${params.toString()}`

        // 3. Llamar a la API usando 'fetchWithAuth'
        // Esta función ya incluye el 'Authorization: Bearer ...'
        const response = await fetchWithAuth(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Ya no necesitas poner "Authorization" aquí, fetchWithAuth lo hace
          },
        })

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            setError("No tienes permiso para ver esta información.")
          } else {
            throw new Error(`Error ${response.status}: ${response.statusText}`)
          }
          return // Detener si hay error
        }

        // 4. Procesar la respuesta
        const result = await response.json() 

        if (result && Array.isArray(result.items)) {
          updateData(result.items)      // Actualiza los datos de la tabla
          setTotalItems(result.total)   // Actualiza el total de items
          setTotalPages(result.totalPages) // Actualiza el total de páginas
        } else {
          throw new Error("Formato de respuesta inesperado de la API.")
        }

      } catch (err) {
        console.error("Error en fetchTickets:", err)
        setError(err.message || "No se pudieron cargar los tickets.")
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()

  }, [
    currentPage, 
    itemsPerPage, 
    filters, 
    updateData, 
    fetchWithAuth // 4. 'fetchWithAuth' es ahora la dependencia de autenticación
  ]) 

  const filterConfig = getFilterConfig("tickets", role)
  const columns = getTicketColumns(role)

  const handleRowClick = (ticket) => {
    console.log("Ticket seleccionado:", ticket)
    // TODO: Navegar a detalle (ej. router.push(`/tickets/${ticket.id}`))
  }

  return (
    <div className="space-y-6 p-6">
      <FilterBar
        config={filterConfig}
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
      />

      {loading && <div className="text-center py-4">Cargando tickets...</div>}
      
      {error && <div className="text-center py-4 text-red-600">{error}</div>}

      {!loading && !error && data.length === 0 && (
         <div className="text-center py-4">No se encontraron tickets.</div>
      )}

      {!loading && !error && data.length > 0 && (
        <>
          <Table
            columns={columns}
            data={data}
            onRowClick={handleRowClick}
          />

          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </>
      )}
    </div>
  )
}