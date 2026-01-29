import {Sidebar, SidebarHeader, SidebarProvider} from "@/components/ui/sidebar";
import * as React from "react";
import OutletLogoSvg from "@/components/headers/outlet.logo.svg";

export const AppSidebar = ({
    className,
    children,
    ...props
}: React.ComponentProps<"div">) => {
    return (
        <div className='flex min-h-dvh w-full'>
            <SidebarProvider defaultOpen={false}>
            <Sidebar className={className} >
                <SidebarHeader className="p-0 gap-0">
                    {/********* Overlay for Logo to have same background as the one in the AppHeader ******/}
                    <div className="flex item-center z-53 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b justify-left px-12 py-4">
                        <OutletLogoSvg className="h-8"/>
                    </div>
                </SidebarHeader>
            </Sidebar>
                <div className='flex flex-1 flex-col'>
                    {children}
                </div>
            </SidebarProvider>
        </div>
    )
}