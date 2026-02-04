/**
 * Fetcher API function abstractions
 */
import { SERVER_BACKEND_BASE_URL } from "./constants";
import type {UserAccount} from "@/types.d.ts/user.account.ts";


/**
 * Helper utility used to extract the domain from the request even if it's
 * behind a proxy. This is useful for sitemaps and other things.
 * @param request Request object
 * @returns Current domain
 */
export const createDomain = (request: Request) => {
	const headers = request.headers
	const maybeProto = headers.get("x-forwarded-proto")
	const maybeHost = headers.get("host")
	const url = new URL(request.url)
	// If the request is behind a proxy, we need to use the x-forwarded-proto and host headers
	// to get the correct domain
	if (maybeProto) {
		return `${maybeProto}://${maybeHost ?? url.host}`
	}
	// If we are in local development, return the localhost
	if (url.hostname === "localhost") {
		return `http://${url.host}`
	}
	// If we are in production, return the production domain
	return `https://${url.host}`
}

export class HttpError extends Error {
	constructor(
		public status: number,
		message: string
	) {
		super(message);
	}
}

export async function apiFetch<T>(
	path: string,
	init?: RequestInit
): Promise<T> {
	const response = await fetch(`${SERVER_BACKEND_BASE_URL}${path}`, {
		credentials: "include", // IMPORTANT for Spring Security / Keycloak
		headers: {
			"Content-Type": "application/json",
			...init?.headers,
		},
		...init,
	});

	if (!response.ok) {
		const text = await response.text();
		throw new HttpError(response.status, text || response.statusText);
	}

	return await response.json() as Promise<T>;
}

export function getUserAccountFromApi(options?: RequestInit): Promise<UserAccount> {
	return apiFetch<UserAccount>("/api/account", options);
}

