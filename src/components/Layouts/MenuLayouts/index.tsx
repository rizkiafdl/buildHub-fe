import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Modules/Elements/AppSideBar"

export default function MenuLayouts({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />

            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}
