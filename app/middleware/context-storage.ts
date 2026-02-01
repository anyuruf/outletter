import { AsyncLocalStorage } from "node:async_hooks"
import type { Session, MiddlewareFunction } from "react-router"
import {UserAccount} from "@/types.d.ts/user.account";
import {getAuthSessionFromContext} from "@/utils/sessions.server";
import {getAccount} from "@/utils/http";

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

export const getOptionalUser = () => {
    const storage = getGlobalStorage()
    return storage.userAccount
}

export const getUserAccount = () => {
    const userAccount = getOptionalUser()
    if (!userAccount) {
        throw new Error("User should be available here")
    }
    return userAccount
}

export const globalStorageMiddleware: MiddlewareFunction<Response> = async ({ context }, next) => {
    const authSession = getAuthSessionFromContext(context)
    const userData = authSession.get("userAccount")
    const userAccount = getAccount();
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
