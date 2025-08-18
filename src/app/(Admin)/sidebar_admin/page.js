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
    url: "/inicio_ad",
    icon: Calendar,
  },
  {
    title: "boletos",
    url: "/boletos_ad",
    icon: Home,
  },
  {
    title: "clientes",
    url: "/clientes_ad",
    icon: Inbox,
  },
  {
    title: "productos",
    url: "/productos_ad",
    icon: Settings,
  },
  {
    title: "planSoporte",
    url: "/planSoporte_ad",
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