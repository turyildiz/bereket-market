import Link from 'next/link';
import { ChevronLeft, Building2 } from 'lucide-react';
import { db } from '@/db';
import { brands } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { CreateBrandDialog } from './create-brand-dialog';
import { DeleteBrandButton } from './delete-brand-button';

export default async function BrandsPage() {
    const allBrands = await db.select().from(brands).orderBy(desc(brands.createdAt));

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Link href="/admin" className="hover:text-foreground transition-colors">
                            <ChevronLeft className="h-4 w-4" />
                        </Link>
                        <span className="text-sm font-medium">Back to Dashboard</span>
                    </div>
                    <h1 className="font-display text-3xl font-bold flex items-center gap-2">
                        Brands
                        <span className="text-lg font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                            {allBrands.length}
                        </span>
                    </h1>
                    <p className="text-muted-foreground">Manage parent companies and organizations</p>
                </div>
                <CreateBrandDialog />
            </div>

            {/* List */}
            <div className="rounded-xl border bg-card text-card-foreground shadow">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Logo</TableHead>
                            <TableHead>Brand Name</TableHead>
                            <TableHead>ID</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allBrands.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                    No brands found. Create your first one!
                                </TableCell>
                            </TableRow>
                        ) : (
                            allBrands.map((brand) => (
                                <TableRow key={brand.id}>
                                    <TableCell>
                                        {brand.logoUrl ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={brand.logoUrl}
                                                alt={brand.name}
                                                className="h-10 w-10 rounded-lg object-contain bg-muted/50 p-1"
                                            />
                                        ) : (
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                                                <Building2 className="h-5 w-5" />
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="font-medium">{brand.name}</TableCell>
                                    <TableCell className="font-mono text-xs text-muted-foreground">
                                        {brand.id}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {brand.createdAt.toLocaleDateString('de-DE')}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DeleteBrandButton id={brand.id} />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
