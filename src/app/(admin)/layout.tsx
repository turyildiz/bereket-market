import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin';
import { Store } from 'lucide-react';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { sessionClaims } = await auth();

    // The type assertion is needed because Clerk types might not infer the custom claims immediately without restart
    // or sometimes require explicit casting if the global declaration isn't picked up by the build process yet.
    // However, thanks to globals.d.ts, sessionClaims.metadata should be typed if everything works.
    // We'll pass the metadata object safely.

    // Check if metadata exists and has admin role
    if (!isAdmin(sessionClaims?.metadata)) {
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
                        Admin
                    </div>
                </div>
            </header>
            <main className="container px-4 py-8 sm:px-6">
                {children}
            </main>
        </div>
    );
}
