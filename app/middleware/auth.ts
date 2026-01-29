// app/middleware/auth.ts
import {redirect} from "react-router";
import type { Route} from "./+types/root";
import {globalAppContext} from "@/server/context";




export const authMiddleware: Route.Middleware = async ({next, context }: Route.LoaderFunctionArgs) => {
    // SSR phase: do not force auth
    /********
     if (typeof window === "undefined") {
     return next;
     }
     *********/

    const { userAccount } = context.get(globalAppContext)

    if (!userAccount) {
        // Browser only → send to gateway OAuth
        throw redirect("/sign");
    }

    return next;
};

