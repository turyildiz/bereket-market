import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin';
import { Store } from 'lucide-react';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await currentUser();

    if (!user) {
        redirect('/sign-in');
    }

    const email = user.emailAddresses[0]?.emailAddress;

    if (!isAdmin(email)) {
        // Redirect non-admins to home
        redirect('/');
    }

    return (
        <div className="min-h-screen bg-muted/40">
            <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
                <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <Store className="h-4 w-4" />
                        </div>
                        <span className="font-display font-semibold">Bereket Admin</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        {email}
                    </div>
                </div>
            </header>
            <main className="container px-4 py-8 sm:px-6">
                {children}
            </main>
        </div>
    );
}
