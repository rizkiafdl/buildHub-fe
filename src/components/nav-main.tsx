"use client"

import { useState, useEffect } from 'react'
import { type LucideIcon } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type NavItemType = {
  title: string
  url: string
  icon: LucideIcon
  isActive?: boolean
}

export function NavMain({
  items: initialItems,
}: {
  items: NavItemType[]
  }) {
  const location = useLocation()
  const basePath = location.pathname.startsWith("/menu") ? "/menu" : ""

  // Create state to manage the items and their active states
  const [items, setItems] = useState<NavItemType[]>(() =>
    initialItems.map(item => ({
      ...item,
      isActive: location.pathname === `${basePath}${item.url}`
    }))
  )

  // Update active states when location changes
  useEffect(() => {
    setItems(currentItems =>
      currentItems.map(item => ({
        ...item,
        isActive: location.pathname === `${basePath}${item.url}`
      }))
    )
  }, [location.pathname, basePath])

  // Handle click on menu item
  const handleMenuClick = (clickedItem: NavItemType) => {
    setItems(currentItems =>
      currentItems.map(item => ({
        ...item,
        isActive: item.title === clickedItem.title
      }))
    )
  }

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            isActive={item.isActive}
          >
            <NavLink
              to={`${basePath}${item.url}`}
              className={({ isActive }) =>
                `flex items-center space-x-2 p-2 ${isActive ? "text-blue-600" : "text-gray-800"
                }`
              }
              onClick={() => handleMenuClick(item)}
            >
              <item.icon className={item.isActive ? "text-blue-600" : "text-gray-800"} />
              <span>{item.title}</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}