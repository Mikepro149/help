// Configuraciones de filtros por vista y rol
export const FILTER_CONFIGS = {
  // Configuración para todos los roles en vista de tickets
  tickets: {
    ADMIN: {
      filters: [
        {
          key: "tipo_incidente",
          label: "Tipo de Incidente",
          type: "text",
          placeholder: "Buscar Tipo de Incidente",
        },
        {
          key: "area",
          label: "Área",
          type: "select",
          placeholder: "Todo",
          options: [
            { value: "all", label: "Todo" },
            { value: "TI", label: "TI" },
            { value: "RRHH", label: "RRHH" },
            { value: "Ventas", label: "Ventas" },
          ],
        },
        {
          key: "fecha",
          label: "Rango de Fecha",
          type: "daterange",
          placeholderStart: "Fecha inicio",
          placeholderEnd: "Fecha fin",
        },
        {
          key: "estado",
          label: "Estado:",
          type: "select",
          placeholder: "Estado",
          options: [
            { value: "all", label: "Todos" },
            { value: "activo", label: "Activo" },
            { value: "cerrado", label: "Cerrado" },
            { value: "pendiente", label: "Pendiente" },
          ],
        },
      ],
    },
    
    SUPPORT_TI: {
      filters: [
        {
          key: "tipo_incidente",
          label: "Tipo de Incidente",
          type: "text",
          placeholder: "Buscar Tipo de Incidente",
        },
        {
          key: "sucursal",
          label: "Sucursal",
          type: "select",
          placeholder: "Todas",
          options: [
            { value: "all", label: "Todas" },
            { value: "los_olivos", label: "Los Olivos" },
            { value: "san_isidro", label: "San Isidro" },
            { value: "santa_anita", label: "Santa Anita" },
          ],
        },
        {
          key: "fecha",
          label: "Rango de Fecha",
          type: "daterange",
          placeholderStart: "Fecha inicio",
          placeholderEnd: "Fecha fin",
        },
        {
          key: "estado",
          label: "Estado:",
          type: "select",
          placeholder: "Estado",
          options: [
            { value: "all", label: "Todos" },
            { value: "activo", label: "Activo" },
            { value: "en_proceso", label: "En Proceso" },
            { value: "cerrado", label: "Cerrado" },
          ],
        },
      ],
    },

    SUPPORT_SITU: {
      filters: [
        {
          key: "tipo_incidente",
          label: "Tipo de Incidente",
          type: "text",
          placeholder: "Buscar Tipo de Incidente",
        },
        {
          key: "estado",
          label: "Estado:",
          type: "select",
          placeholder: "Estado",
          options: [
            { value: "all", label: "Todos" },
            { value: "activo", label: "Activo" },
            { value: "cerrado", label: "Cerrado" },
          ],
        },
        {
          key: "fecha",
          label: "Fecha",
          type: "date",
        },
      ],
    },

    MANAGER: {
      filters: [
        {
          key: "area",
          label: "Área",
          type: "select",
          placeholder: "Todas",
          options: [
            { value: "all", label: "Todas" },
            { value: "TI", label: "TI" },
            { value: "RRHH", label: "RRHH" },
            { value: "Operaciones", label: "Operaciones" },
          ],
        },
        {
          key: "fecha",
          label: "Rango de Fecha",
          type: "daterange",
          placeholderStart: "Fecha inicio",
          placeholderEnd: "Fecha fin",
        },
        {
          key: "prioridad",
          label: "Prioridad",
          type: "select",
          placeholder: "Todas",
          options: [
            { value: "all", label: "Todas" },
            { value: "alta", label: "Alta" },
            { value: "media", label: "Media" },
            { value: "baja", label: "Baja" },
          ],
        },
      ],
    },

    MANAGER_WORKER: {
      filters: [
        {
          key: "tipo_incidente",
          label: "Tipo de Incidente",
          type: "text",
          placeholder: "Buscar mis incidentes",
        },
        {
          key: "estado",
          label: "Estado:",
          type: "select",
          placeholder: "Estado",
          options: [
            { value: "all", label: "Todos" },
            { value: "activo", label: "Activo" },
            { value: "cerrado", label: "Cerrado" },
          ],
        },
      ],
    },
  },

  // Puedes agregar otras vistas aquí
  // clients: { ADMIN: {...}, SUPPORT_TI: {...} },
  // reports: { ADMIN: {...}, MANAGER: {...} },
}

export function getFilterConfig(view, role) {
  return FILTER_CONFIGS[view]?.[role] || FILTER_CONFIGS[view]?.ADMIN || { filters: [] }
}