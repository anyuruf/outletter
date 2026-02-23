import {  Outlet } from 'react-router'
import {AppHeader} from "@/components/headers/app.header";
import { AppSidebar } from "@/components/app.sidebar";


export default function Layout() {

    return (
        <AppSidebar>
            <AppHeader />
            <Outlet />
        </AppSidebar>
    );
}
