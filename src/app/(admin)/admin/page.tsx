import Link from 'next/link';
import { Building2, Store, Users, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-display text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Manage the marketplace data</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Manage Brands */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building2 className="h-5 w-5 text-primary" />
                            Brands
                        </CardTitle>
                        <CardDescription>
                            Manage parent companies and logos
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href="/admin/brands">
                            <Button className="w-full justify-between">
                                Manage Brands
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Manage Branches */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Store className="h-5 w-5 text-primary" />
                            Branches
                        </CardTitle>
                        <CardDescription>
                            Manage store locations and addresses
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href="/admin/branches">
                            <Button className="w-full justify-between">
                                Manage Branches
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Manage Senders */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-primary" />
                            Senders
                        </CardTitle>
                        <CardDescription>
                            Manage WhatsApp authorized senders
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href="/admin/senders">
                            <Button className="w-full justify-between">
                                Manage Senders
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
