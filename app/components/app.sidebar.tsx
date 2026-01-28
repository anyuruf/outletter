import {Sidebar, SidebarHeader, SidebarProvider} from "@/components/ui/sidebar";
import * as React from "react";
import OutletLogoSVG from "@/components/headers/OutletLogoSVG";

export const AppSidebar = ({
    side = "left",
    variant = "sidebar",
    collapsible = "offcanvas",
    className,
    isMobile,
    state,
    openMobile,
    setOpenMobile,
    children,
    ...props
}: React.ComponentProps<"div"> & {
    side?: "left" | "right"
    variant?: "sidebar" | "floating" | "inset"
    collapsible?: "offcanvas" | "icon" | "none"
    isMobile: boolean
    state: "expanded" | "collapsed"
    openMobile: boolean
    setOpenMobile: (open: boolean) => void

}) => {
    return (
        <div className='flex min-h-dvh w-full'>
            <SidebarProvider>
                <Sidebar side={side} className={className} collapsible={collapsible} variant={variant} isMobile={isMobile} state={state} openMobile={openMobile} setOpenMobile={setOpenMobile}>
                    <SidebarHeader className="p-0 gap-0">
                        {/********* Overlay for Logo to have same background as the one in the AppHeader ******/}
                        <div className="flex item-center z-53 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b justify-left px-12 py-4">
                            <OutletLogoSVG className="h-8"/>
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