import ChatWrapper from "./chat/ChatWrapper";
import { Sidebar, SidebarContent, SidebarRail } from "./ui/sidebar";
import { Suspense } from "react";



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <Suspense fallback={<div>Loading...</div>}>
        <ChatWrapper />
        </Suspense>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
