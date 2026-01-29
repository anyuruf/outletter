import { type SEOHandle } from '@nasa-gcn/remix-seo'
import { Spacer } from '@/components/spacer'

import {
	ProviderConnectionForm,
	providerNames,
} from '@/utils/connections'
import { type Route } from './+types/login'


export const handle: SEOHandle = {
	getSitemapEntries: () => null,
}


export default function LoginPage({ actionData }: Route.ComponentProps) {

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
						<ul className="flex flex-col gap-5">
								<li key={providerName}>
									<ProviderConnectionForm
										type="Login"
										providerName={providerName}
										redirectTo={redirectTo}
									/>
								</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}


export const meta: Route.MetaFunction = () => {
	return [{ title: 'Login to Epic Notes' }]
}
