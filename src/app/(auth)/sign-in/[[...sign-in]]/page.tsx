/**
 * Sign In Page
 * 
 * This page will use Clerk's SignIn component.
 * 
 * Implementation:
 * import { SignIn } from '@clerk/nextjs';
 * 
 * export default function SignInPage() {
 *   return <SignIn />;
 * }
 */

export default function SignInPage() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold">Sign In</h1>
                <p className="text-muted-foreground">Clerk SignIn component will be placed here</p>
            </div>
        </div>
    );
}
