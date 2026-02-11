import { Spacer } from '@/components/spacer'
import { Button } from '@/components/ui/button'


async function LoginPage() {

	return (
		<div className="flex min-h-full flex-col justify-center pt-20 pb-32">
			<div className="mx-auto w-full max-w-md">
				<div className="flex flex-col gap-3 text-center">
					<h1 className="text-h1">Welcome back!</h1>
					<p className="text-body-md text-muted-foreground">
						Please click button below.
					</p>
					<Spacer size="xs" />
					<Spacer size="xs" />
					<Button type="button" variant="secondary" asChild>
						<a href={`${process.env.BACKEND_SERVER_URL}/oauth2/authorization/oidc`}>
							Sign in
						</a>
					</Button>
				</div>
			</div>
		</div>
	)
}

export default LoginPage;
