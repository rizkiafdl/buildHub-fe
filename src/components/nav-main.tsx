"use client"

import { type LucideIcon } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
  }[]
}) {
  // Get the current parent path (useful for nested routing).
  const location = useLocation()
  const basePath = location.pathname.startsWith("/menu") ? "/menu" : ""

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={item.isActive}>
            <NavLink
              to={`${basePath}${item.url}`}
              className={({ isActive }) =>
                `flex items-center space-x-2 p-2 ${isActive ? "text-blue-600" : "text-gray-800"
                }`
              }
            >
              <item.icon />
              <span>{item.title}</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
