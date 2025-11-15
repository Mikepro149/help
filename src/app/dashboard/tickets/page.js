import { cookies } from "next/headers"
import TicketsClient from "./TicketsClient"

export default async function TicketsPage() {
  // Obtener el rol desde las cookies en el servidor
  const cookieStore = cookies()
  const refreshToken = cookieStore.get("refresh_token")?.value
  
  let role = "ADMIN" // Fallback
  
  if (refreshToken) {
    try {
      const payload = JSON.parse(atob(refreshToken.split(".")[1]))
      role = payload.role
    } catch (error) {
      console.error("Error decodificando token:", error)
    }
  }

  return <TicketsClient role={role} />
}