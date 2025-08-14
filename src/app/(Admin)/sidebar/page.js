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
    url: "/inicio",
    icon: Calendar,
  },
  {
    title: "boletos",
    url: "/boletos",
    icon: Home,
  },
  {
    title: "clientes",
    url: "/clientes",
    icon: Inbox,
  },
  {
    title: "productos",
    url: "/productos",
    icon: Settings,
  },
  {
    title: "planSoporte",
    url: "/planSoporte",
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