import { Badge } from "@/components/ui/badge"
import { ArrowUp, Mail, CheckCircle } from "lucide-react"

// Componentes helper para renderizado
const PriorityIcon = () => (
  <ArrowUp className="h-4 w-4 text-red-500" />
)

const MailIcon = ({ hasNotification }) => (
  <div className="relative">
    <Mail className={`h-5 w-5 ${hasNotification ? 'text-orange-500' : 'text-gray-400'}`} />
    {hasNotification && (
      <span className="absolute -top-1 -right-1 h-2 w-2 bg-blue-500 rounded-full" />
    )}
  </div>
)

const SupportCheck = ({ isComplete }) => (
  <CheckCircle className={`h-5 w-5 ${isComplete ? 'text-green-500' : 'text-gray-300'}`} />
)

// Definición de columnas por rol
export const TICKET_COLUMNS = {
  ADMIN: [
    {
      key: "id",
      label: "Id",
      className: "w-[50px]",
    },
    {
      key: "tipo_incidente",
      label: "Tipo de incidente",
      className: "min-w-[150px]",
    },
    {
      key: "usuario",
      label: "Usuario",
      className: "min-w-[120px]",
    },
    {
      key: "empresa",
      label: "Empresa",
      className: "min-w-[100px]",
    },
    {
      key: "area",
      label: "Area",
      className: "w-[80px]",
    },
    {
      key: "sucursal",
      label: "Sucursal",
      className: "min-w-[120px]",
    },
    {
      key: "estado",
      label: "Estado",
      className: "w-[100px]",
      render: (value) => (
        <Badge variant={value === "Activo" ? "default" : "secondary"} className="bg-green-100 text-green-800">
          {value}
        </Badge>
      ),
    },
    {
      key: "fecha_registro",
      label: "Fecha de Reg.",
      className: "min-w-[120px]",
    },
    {
      key: "prioridad",
      label: "Prioridad",
      className: "w-[80px] text-center",
      render: () => <PriorityIcon />,
    },
    {
      key: "soporte_insitu",
      label: "Soporte In Situ",
      className: "w-[120px] text-center",
      render: (value, row) => <MailIcon hasNotification={row.has_notification} />,
    },
    {
      key: "check",
      label: "",
      className: "w-[50px] text-center",
      render: (value, row) => <SupportCheck isComplete={row.is_complete} />,
    },
  ],

  SUPPORT_TI: [
    {
      key: "id",
      label: "Id",
      className: "w-[50px]",
    },
    {
      key: "tipo_incidente",
      label: "Tipo de incidente",
      className: "min-w-[150px]",
    },
    {
      key: "usuario",
      label: "Usuario",
      className: "min-w-[120px]",
    },
    {
      key: "sucursal",
      label: "Sucursal",
      className: "min-w-[120px]",
    },
    {
      key: "estado",
      label: "Estado",
      className: "w-[100px]",
      render: (value) => (
        <Badge variant="default" className="bg-green-100 text-green-800">
          {value}
        </Badge>
      ),
    },
    {
      key: "fecha_registro",
      label: "Fecha de Reg.",
      className: "min-w-[120px]",
    },
    {
      key: "prioridad",
      label: "Prioridad",
      className: "w-[80px] text-center",
      render: () => <PriorityIcon />,
    },
    {
      key: "soporte_insitu",
      label: "Soporte In Situ",
      className: "w-[120px] text-center",
      render: (value, row) => <MailIcon hasNotification={row.has_notification} />,
    },
  ],

  SUPPORT_SITU: [
    {
      key: "id",
      label: "Id",
      className: "w-[50px]",
    },
    {
      key: "tipo_incidente",
      label: "Tipo de incidente",
      className: "min-w-[150px]",
    },
    {
      key: "sucursal",
      label: "Sucursal",
      className: "min-w-[120px]",
    },
    {
      key: "estado",
      label: "Estado",
      className: "w-[100px]",
      render: (value) => (
        <Badge variant="default" className="bg-green-100 text-green-800">
          {value}
        </Badge>
      ),
    },
    {
      key: "fecha_registro",
      label: "Fecha",
      className: "min-w-[120px]",
    },
    {
      key: "check",
      label: "",
      className: "w-[50px] text-center",
      render: (value, row) => <SupportCheck isComplete={row.is_complete} />,
    },
  ],

  MANAGER: [
    {
      key: "id",
      label: "Id",
      className: "w-[50px]",
    },
    {
      key: "tipo_incidente",
      label: "Tipo de incidente",
      className: "min-w-[150px]",
    },
    {
      key: "area",
      label: "Área",
      className: "w-[100px]",
    },
    {
      key: "estado",
      label: "Estado",
      className: "w-[100px]",
      render: (value) => (
        <Badge variant="default" className="bg-green-100 text-green-800">
          {value}
        </Badge>
      ),
    },
    {
      key: "fecha_registro",
      label: "Fecha de Reg.",
      className: "min-w-[120px]",
    },
    {
      key: "prioridad",
      label: "Prioridad",
      className: "w-[80px] text-center",
      render: () => <PriorityIcon />,
    },
  ],

  MANAGER_WORKER: [
    {
      key: "id",
      label: "Id",
      className: "w-[50px]",
    },
    {
      key: "tipo_incidente",
      label: "Mis Incidentes",
      className: "min-w-[200px]",
    },
    {
      key: "estado",
      label: "Estado",
      className: "w-[100px]",
      render: (value) => (
        <Badge variant="default" className="bg-green-100 text-green-800">
          {value}
        </Badge>
      ),
    },
    {
      key: "fecha_registro",
      label: "Fecha",
      className: "min-w-[120px]",
    },
  ],
}

export function getTicketColumns(role) {
  return TICKET_COLUMNS[role] || TICKET_COLUMNS.ADMIN
}