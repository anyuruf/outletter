import { Spacer } from '@/components/spacer'
import { Button } from '@/components/ui/button'



function LoginPage() {

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
						{/****<ProviderConnectionForm
							type="Login"
							providerName={OUTLET_PROVIDER_NAME}
						/> ****/}
						<Button variant="secondary" asChild>
							<a
								href={`${String(process.env.BACKEND_SERVER_URL)}/oauth2/authorization/oidc`}
							>Log in</a>
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginPage;
