import { useState, useMemo } from "react"

export function useTableData(initialData = [], initialItemsPerPage = 10) {
  const [data, setData] = useState(initialData)
  const [filters, setFilters] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage)

  // Aplicar filtros a los datos
  const filteredData = useMemo(() => {
    let filtered = [...data]

    Object.keys(filters).forEach((key) => {
      const filterValue = filters[key]
      if (!filterValue || filterValue === "all") return

      // Manejo especial para rangos de fecha
      if (key.endsWith("_start")) {
        const baseKey = key.replace("_start", "")
        filtered = filtered.filter((item) => {
          const itemDate = new Date(item[baseKey] || item.fecha_registro)
          return itemDate >= new Date(filterValue)
        })
      } else if (key.endsWith("_end")) {
        const baseKey = key.replace("_end", "")
        filtered = filtered.filter((item) => {
          const itemDate = new Date(item[baseKey] || item.fecha_registro)
          return itemDate <= new Date(filterValue)
        })
      } else {
        // Filtro normal (texto o select)
        filtered = filtered.filter((item) => {
          const itemValue = String(item[key] || "").toLowerCase()
          const searchValue = String(filterValue).toLowerCase()
          return itemValue.includes(searchValue)
        })
      }
    })

    return filtered
  }, [data, filters])

  // Calcular paginación
  const totalItems = filteredData.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredData.slice(startIndex, endIndex)
  }, [filteredData, currentPage, itemsPerPage])

  // Handlers
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setCurrentPage(1) // Reset a página 1 cuando se filtra
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1) // Reset a página 1
  }

  const handleSearch = () => {
    // Opcional: puedes agregar lógica adicional aquí
    // Por ahora los filtros se aplican automáticamente
    setCurrentPage(1)
  }

  const resetFilters = () => {
    setFilters({})
    setCurrentPage(1)
  }

  const updateData = (newData) => {
    setData(newData)
    setCurrentPage(1)
  }

  return {
    // Data
    data: paginatedData,
    allData: filteredData,
    rawData: data,
    
    // Filters
    filters,
    handleFilterChange,
    handleSearch,
    resetFilters,
    
    // Pagination
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange,
    
    // Utils
    updateData,
    setData,
  }
}