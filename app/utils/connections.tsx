import { Form } from "react-router"
import { z } from "zod"
import OutletShortLogoSvg from "@/components/headers/outlet-short-logo"
import { StatusButton } from "@/components/status-button"
import { BACKEND_SERVER_URL } from "@/utils/constants"
import { useIsPending } from "@/utils/misc"

export const OUTLET_PROVIDER_NAME = "oidc"
// to add another provider, set their name here and add it to the providerNames below

export const providerNames = [OUTLET_PROVIDER_NAME] as const
export const ProviderNameSchema = z.enum(providerNames)
export type ProviderName = z.infer<typeof ProviderNameSchema>

export const providerLabels: Record<ProviderName, string> = {
	[OUTLET_PROVIDER_NAME]: "oidc",
} as const

export function ProviderConnectionForm({
	redirectTo,
	type,
	providerName,
}: {
	redirectTo?: string | null
	type: "Connect" | "Login" | "Signup"
	providerName: ProviderName
}) {
	const label = providerLabels[providerName]
	const formAction = `${BACKEND_SERVER_URL}/auth2/authorization/${providerName}`
	const isPending = useIsPending({ formAction })
	return (
		<Form className="flex items-center justify-center gap-2" action={formAction} method="POST">
			{redirectTo ? <input type="hidden" name="redirectTo" value={redirectTo} /> : null}
			<StatusButton type="submit" className="w-full" status={isPending ? "pending" : "idle"}>
				<span className="inline-flex items-center gap-1.5">
					<div className="h-4 w-4">
						<OutletShortLogoSvg />
					</div>
					<span>
						{type} with {label}
					</span>
				</span>
			</StatusButton>
		</Form>
	)
}
