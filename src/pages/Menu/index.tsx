import { SidebarRight } from "@/components/sidebar-right"
import { SidebarLeft } from "@/components/sidebar-left"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Outlet, useLocation } from "react-router-dom"

// Define a mapping of paths to breadcrumb labels
const breadcrumbLabels: Record<string, string> = {
  "/": "Home",
  "/menu": "Menu",
  "/menu/bidding": "Bidding",
  "/menu/inbox": "Inbox",
  "/menu/calendar": "Calendar",
  "/menu/settings": "Settings",
  "/menu/templates": "Templates",
  "/menu/trash": "Trash",
  "/menu/help": "Help",
}

const Menu = () => {
  const location = useLocation()

  // Split pathname into segments and map each segment to its label
  const pathSegments = location.pathname.split("/").filter(Boolean)
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join("/")}`
    return {
      label: breadcrumbLabels[path] || segment.charAt(0).toUpperCase() + segment.slice(1),
      path,
    }
  })

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-max">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => (
                  <BreadcrumbItem key={breadcrumb.path}>
                    <BreadcrumbPage className="line-clamp-1">
                      {breadcrumb.label}
                    </BreadcrumbPage>
                    {index < breadcrumbs.length - 1 && (
                      <Separator orientation="vertical" className="mx-2 h-4" />
                    )}
                  </BreadcrumbItem>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  )
}

export default Menu
