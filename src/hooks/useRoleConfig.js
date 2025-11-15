import { useState, useEffect } from "react"

export function useRoleConfig() {
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Obtener el rol desde las cookies
    const getRole = () => {
      try {
        // Obtener el refresh_token de las cookies
        const cookies = document.cookie.split("; ")
        const refreshTokenCookie = cookies.find((cookie) =>
          cookie.startsWith("refresh_token=")
        )

        if (!refreshTokenCookie) {
          setRole(null)
          setLoading(false)
          return
        }

        const token = refreshTokenCookie.split("=")[1]

        // Decodificar el JWT (solo la parte del payload)
        const payload = JSON.parse(atob(token.split(".")[1]))
        
        setRole(payload.role)
      } catch (error) {
        console.error("Error decodificando token:", error)
        setRole(null)
      } finally {
        setLoading(false)
      }
    }

    getRole()
  }, [])

  return { role, loading }
}

// Hook alternativo si prefieres pasar el rol como prop desde el servidor
export function useRolePermissions(userRole) {
  const permissions = {
    ADMIN: {
      canEdit: true,
      canDelete: true,
      canAssign: true,
      canViewAll: true,
      canExport: true,
    },
    SUPPORT_TI: {
      canEdit: true,
      canDelete: false,
      canAssign: true,
      canViewAll: true,
      canExport: false,
    },
    SUPPORT_SITU: {
      canEdit: true,
      canDelete: false,
      canAssign: false,
      canViewAll: false,
      canExport: false,
    },
    MANAGER: {
      canEdit: false,
      canDelete: false,
      canAssign: false,
      canViewAll: true,
      canExport: true,
    },
    MANAGER_WORKER: {
      canEdit: true,
      canDelete: false,
      canAssign: false,
      canViewAll: false,
      canExport: false,
    },
  }

  return permissions[userRole] || permissions.MANAGER_WORKER
}