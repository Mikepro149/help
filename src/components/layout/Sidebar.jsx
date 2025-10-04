"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/UserContext"
import {
  Home,
  Ticket,
  Users,
  Building,
  ClipboardList,
  User,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const sections = [
  { name: "Home", href: "/dashboard/home", icon: Home },
  { name: "Tickets", href: "/dashboard/tickets", icon: Ticket },
  { name: "Clientes", href: "/dashboard/clients", icon: Users },
  { name: "Empresa", href: "/dashboard/company", icon: Building },
  { name: "Plan de Soporte", href: "/dashboard/support-plan", icon: ClipboardList },
]

export default function Sidebar({ onProfile }) {
  const router = useRouter()
  const { user, loading } = useUser()

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        credentials: "include",
      })
      router.push("/login")
    } catch (error) {
      console.error("Error cerrando sesión:", error)
    }
  }

  if (loading) {
    return (
      <aside className="w-72 min-h-screen flex items-center justify-center bg-white border-r">
        <p className="text-gray-500">Cargando...</p>
      </aside>
    )
  }

  return (
    <aside className="w-72 min-h-screen flex flex-col bg-white border-r">
      {/* Header con info de usuario */}
      <div className="h-40 flex flex-col items-center justify-center bg-orange-500 text-white">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20 mb-2">
          <User className="h-8 w-8" />
        </div>
        <h2 className="font-semibold">{user?.name || "Invitado"}</h2>
        <span className="text-sm opacity-80">
          {user?.role || "Sin rol"}
        </span>
      </div>

      {/* Secciones */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {sections.map(({ name, href, icon: Icon }) => (
          <Link
            key={name}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            )}
          >
            <Icon className="h-5 w-5 text-gray-600" />
            {name}
          </Link>
        ))}
      </nav>

      <Separator className="my-4" />

      {/* Perfil y logout */}
      <div className="px-4 pb-6 space-y-2">
        <Button
          variant="outline"
          className="w-full flex items-center gap-2 justify-start"
          onClick={onProfile}
        >
          <User className="h-4 w-4" />
          Perfil
        </Button>
        <Button
          variant="ghost"
          className="w-full flex items-center gap-2 justify-start text-red-600 hover:text-red-700"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </Button>
      </div>
    </aside>
  )
}
