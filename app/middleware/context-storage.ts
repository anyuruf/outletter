import { AsyncLocalStorage } from "node:async_hooks"
import type { Session, MiddlewareFunction } from "react-router"
import {UserAccount} from "@/types.d.ts/user.account";
import {getAuthSessionFromContext} from "@/utils/sessions.server";
import {getUserAccountFromApi} from "@/utils/http";

type GlobalStorage = {
    authSession: Session
    userAccount: UserAccount | null
}

const globalStorage = new AsyncLocalStorage<GlobalStorage>()

const getGlobalStorage = () => {
    const storage = globalStorage.getStore()

    if (!storage) {
        throw new Error("Storage unavailable")
    }

    return storage
}

export const getAuthSession = () => {
    const storage = getGlobalStorage()
    return storage.authSession
}

export const getOptionalUserAccount = () => {
    const storage = getGlobalStorage()
    return storage.userAccount
}

export const getUserAccount = () => {
    const userAccount = getOptionalUserAccount()
    if (!userAccount) {
        throw new Error("User should be available here")
    }
    return userAccount
}

export const globalStorageMiddleware: MiddlewareFunction<Response> = async ({ context }, next) => {
    const authSession = getAuthSessionFromContext(context)
    const tokens = authSession.get("tokens");
    const userAccount = tokens ? (await getUserAccountFromApi({
        headers: {
            Authorization: `Bearer ${tokens.accessToken()}`
        }
    }) ?? null) : null ;
    return new Promise((resolve) => {
        globalStorage.run(
            {
                authSession,
                userAccount,
            },
            () => {
                resolve(next())
            }
        )
    })
}
