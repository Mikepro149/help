import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
 
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
 
// Menu items.
const items = [ 
  {
    title: "inicio",
    url: "/inicio_ti",
    icon: Calendar,
  },
  {
    title: "boletos",
    url: "/boletos_ti",
    icon: Home,
  },
  {
    title: "clientes",
    url: "/cliente_ti",
    icon: Inbox,
  },
  {
    title: "productos",
    url: "/productos_ti",
    icon: Settings,
  },
  {
    title: "tecnico",
    url: "/soporte-tecnico",
    icon: Search,
  },

]
 
export default function SidebarAdmin() {
  return (
    <SidebarProvider>
     <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    </SidebarProvider>
  )
}