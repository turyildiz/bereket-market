/**
 * Sign Up Page
 * 
 * This page will use Clerk's SignUp component.
 * 
 * Implementation:
 * import { SignUp } from '@clerk/nextjs';
 * 
 * export default function SignUpPage() {
 *   return <SignUp />;
 * }
 */

export default function SignUpPage() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold">Sign Up</h1>
                <p className="text-muted-foreground">Clerk SignUp component will be placed here</p>
            </div>
        </div>
    );
}
