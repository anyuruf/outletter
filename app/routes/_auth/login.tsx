import { Spacer } from '@/components/spacer'

import {
	OUTLET_PROVIDER_NAME,
	ProviderConnectionForm,
} from '@/utils/connections'
import { type Route } from './+types.d.ts/login'


export default function LoginPage() {

	return (
		<div className="flex min-h-full flex-col justify-center pt-20 pb-32">
			<div className="mx-auto w-full max-w-md">
				<div className="flex flex-col gap-3 text-center">
					<h1 className="text-h1">Welcome back!</h1>
					<p className="text-body-md text-muted-foreground">
						Please enter your details.
					</p>
				</div>
				<Spacer size="xs" />
				<div>
					<div className="mx-auto w-full max-w-md px-8">
						<ProviderConnectionForm
							type="Login"
							providerName={OUTLET_PROVIDER_NAME}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}


export const meta: Route.MetaFunction = () => {
	return [{ title: 'Login to Outlet iCommerce resource' }]
}
