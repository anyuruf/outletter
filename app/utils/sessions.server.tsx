import { createThemeSessionResolver } from "remix-themes"
import {
    createCookieSessionStorage, MiddlewareFunction,
    redirect,
} from "react-router";
import {getUserAccountFromApi} from "@/utils/http";
import {getOptionalUserAccount} from "@/middleware/context-storage";


// You can default to 'development' if process.env.NODE_ENV is not set
const isProduction = process.env.NODE_ENV === "production"

const themeSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "theme-cookie",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    // Todo enable env variable
    secrets: [String(process.env.THEME_SESSION_SECRET)],
    // Set domain and secure only if in production
    ...(isProduction
      ? { domain: "https://outlet.com", secure: true }
      : {}),
  },
})

const { getSession, commitSession, destroySession }  = createCookieSessionStorage({
    cookie: {
        name: "pixie-cookie",
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        // Todo enable env variable
        secrets: [String(process.env.OAUTH2_SESSION_SECRET)],
        // Set domain and secure only if in production
        ...(isProduction
            ? { domain: "https://outlet.com", secure: true }
            : {}),
    },
})

export { getSession, commitSession, destroySession };

export const themeSessionResolver = createThemeSessionResolver(themeSessionStorage)



export const requireUser: MiddlewareFunction =  async (_, next) => {
    const userAccount = getOptionalUserAccount();

    if (!userAccount) {
        throw redirect("/login")
    }

    return next()
}