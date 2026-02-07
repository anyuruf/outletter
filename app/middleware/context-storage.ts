import { AsyncLocalStorage } from "node:async_hooks"
import { MiddlewareFunction} from "react-router"
import {UserAccount} from "@/types.d.ts/user.account";

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
    const userAccount = await getUserAccountFromApi(request);
    return globalStorage.run({ userAccount }, () => next())
}
