import { createThemeSessionResolver } from "remix-themes"
import {
    createCookieSessionStorage,
    MiddlewareFunction,
    redirect,
} from "react-router";
import { createSessionMiddleware } from "remix-utils/middleware/session"
import { OAuth2Strategy } from "remix-auth-oauth2";
import { Authenticator } from "remix-auth";
import {UserAccount} from "@/types.d.ts/user.account";
import {getUserAccountFromApi} from "@/utils/http";

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



export const authenticator = new Authenticator<UserAccount>();

authenticator.use(
    new OAuth2Strategy<UserAccount>(
        {
            clientId: "",
            clientSecret: "",
            authorizationEndpoint: "https://provider.com/oauth2/authorize",
            tokenEndpoint: "https://provider.com/oauth2/token",
            redirectURI: "https://example.app/auth/callback",
        },
        async () => {
          // here you can use the params above to get the user and return it
          // what you do inside this and how you find the user is up to you
          return await getUserAccountFromApi();
        }
    ),
    // this is optional, but if you setup more than one OAuth2 instance you will
    // need to set a custom name to each one
    "spring-boot-authorization"
);

const authSessionStorage = createCookieSessionStorage({
    cookie: {
        name: "oidc-cookie", // use any name you want here
        sameSite: "lax", // this helps with CSRF
        path: "/", // remember to add this so the cookie will work in all routes
        httpOnly: true, // for security reasons, make this cookie http only
        secrets: [String(process.env.AUTH_SESSION_SECRET)],
        secure: process.env.NODE_ENV === "production", // enable this in prod only
    },
});


const [authSessionMiddleware, getAuthSessionFromContext] = createSessionMiddleware(authSessionStorage)

export { authSessionMiddleware, getAuthSessionFromContext }

export const requireUser: MiddlewareFunction =   ({ context}, next) => {
    const authSession = getAuthSessionFromContext(context)
    const session = authSession.get("access-token")
    if (!session) {
        throw redirect("/login")
    }
    return next()
}