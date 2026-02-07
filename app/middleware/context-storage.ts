import { AsyncLocalStorage } from "node:async_hooks"
import {Session, MiddlewareFunction, redirect} from "react-router"
import {UserAccount} from "@/types.d.ts/user.account";
import {getAuthSessionFromContext} from "@/utils/sessions.server";
import {getUserAccountFromApi} from "@/utils/http";

type GlobalStorage = {
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

export const globalStorageMiddleware: MiddlewareFunction<Response> = async ({ request}, next) => {

    let userAccount = null

    try {
        userAccount = getUserAccountFromApi({
            headers: {
                cookie: request.headers.get("cookie") ?? "",
            }
        })
    } catch {}


    if(!userAccount) {
        return new Promise((resolve) => {
            globalStorage.run(
                {
                    userAccount: null,
                },
                () => {
                    resolve(next())
                }
            )
        })
    }
    
    return new Promise((resolve) => {
        // @ts-ignore
        globalStorage.run(
            {
                userAccount,
            },
            () => {
                resolve(next())
            }
        )
    })
}
