import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Store, Plus, ImageIcon, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Force dynamic rendering to prevent build-time prerendering without auth
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    const user = await currentUser();

    if (!user) {
        redirect('/sign-in');
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card">
                <div className="container mx-auto flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/25">
                            <Store className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <span className="font-display text-xl font-bold tracking-tight">Bereket Market</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                            Willkommen, {user.firstName || user.emailAddresses[0]?.emailAddress}
                        </span>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="container mx-auto px-6 py-10">
                <div className="mb-8">
                    <h1 className="font-display text-3xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground">Verwalten Sie Ihre Angebote und Ihr Geschäft</p>
                </div>

                {/* Quick actions */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="transition-all hover:shadow-lg hover:shadow-primary/5">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Plus className="h-5 w-5 text-primary" />
                                Neues Angebot
                            </CardTitle>
                            <CardDescription>
                                Laden Sie ein Foto hoch und lassen Sie unsere KI die Produkte erkennen
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full gap-2 shadow-lg shadow-primary/25">
                                <ImageIcon className="h-4 w-4" />
                                Foto hochladen
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="transition-all hover:shadow-lg hover:shadow-primary/5">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Store className="h-5 w-5 text-primary" />
                                Mein Geschäft
                            </CardTitle>
                            <CardDescription>
                                Bearbeiten Sie Ihre Geschäftsinformationen und Öffnungszeiten
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" className="w-full gap-2">
                                <Settings className="h-4 w-4" />
                                Einstellungen
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="transition-all hover:shadow-lg hover:shadow-primary/5">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ImageIcon className="h-5 w-5 text-primary" />
                                Meine Angebote
                            </CardTitle>
                            <CardDescription>
                                Alle Ihre aktiven Angebote auf einen Blick
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-center text-sm text-muted-foreground">
                                Noch keine Angebote vorhanden
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
