import * as React from "react"
import {
  AudioWaveform,
  Blocks,
  Calendar,
  Command,
  Home,
  Inbox,
  MessageCircleQuestion,
  Search,
  Settings2,
  Sparkles,
  Trash2,
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
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Bidding",
      url: "/bidding",
      icon: Sparkles,
    },
    {
      title: "Home",
      url: "/home",
      icon: Home,
      isActive: true,
    },
    {
      title: "Cart",
      url: "/cart",
      icon: Inbox,
      badge: "10",
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Templates",
      url: "#",
      icon: Blocks,
    },
    {
      title: "Trash",
      url: "#",
      icon: Trash2,
    },
    {
      title: "Help",
      url: "#",
      icon: MessageCircleQuestion,
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