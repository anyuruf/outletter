import { createThemeSessionResolver } from "remix-themes"
import {
    createCookieSessionStorage, MiddlewareFunction,
    redirect,
} from "react-router";
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

export const themeSessionResolver = createThemeSessionResolver(themeSessionStorage)



export const requireUser: MiddlewareFunction =  async (_, next) => {
    const userAccount = getOptionalUserAccount();

    if (!userAccount) {
        throw redirect("/login")
    }

    return next()
}