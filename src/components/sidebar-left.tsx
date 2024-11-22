import * as React from "react"
import {
  AudioWaveform,
  Blocks,
  Command,
  Inbox,
  Search,
  Sparkles,
  LucideIcon
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// Updated Types
type Team = {
  name: string
  logo: LucideIcon
  plan: string
}

type NavItem = {
  title: string
  url: string
  icon: LucideIcon
  isActive?: boolean
  badge?: string
}

// Sample data
const data = {
  teams: [
    {
      name: "Build Hub",
      logo: Command,
      plan: "Enterprise",
    },
    {
      name: "Telkom Indonesia",
      logo: AudioWaveform,
      plan: "Startup",
    },
  ] as Team[],

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Search,
    },
    {
      title: "Home",
      url: "/home",
      icon: Sparkles,
    },
    {
      title: "Cart",
      url: "/cart",
      icon: Blocks,
    },
    {
      title: "Order",
      url: "/order",
      icon: Inbox,
      badge: "10",
    },

  ] as NavItem[],
}

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarRail />
    </Sidebar>
  )
}