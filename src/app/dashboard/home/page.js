import StatCard from "@/components/cards/StatCard"
import MessagesCard from "@/components/cards/MessagesCard"
import ProgressCircle from "@/components/common/ProgressCircle"
import CalendarCard from "@/components/cards/CalendarCard"

export default function HomePage() {
  const demoMessages = [
    { id: 1, text: "Ticket #123 creado", author: "Usuario A" },
    { id: 2, text: "Ticket #124 en proceso", author: "Soporte" },
    { id: 3, text: "Ticket #125 cerrado", author: "Usuario B" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Tickets generados" value="120" />
        <StatCard title="Tickets cerrados" value="85" />
        <StatCard title="Usuarios activos" value="45" />
        <StatCard title="Promedio respuesta" value="2h" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <MessagesCard messages={demoMessages} />
          <ProgressCircle value={50} label="Tickets en proceso" />
        </div>
        <CalendarCard />
      </div>
    </div>
  )
}
