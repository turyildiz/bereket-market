'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createBrand } from '@/app/actions/brands';

export function CreateBrandDialog() {
    const [open, setOpen] = useState(false);

    async function handleSubmit(formData: FormData) {
        await createBrand(formData);
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add New Brand
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form action={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create Brand</DialogTitle>
                        <DialogDescription>
                            Add a new brand to the marketplace.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Brand Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="e.g. Yildiz Market"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="logoUrl">Logo URL</Label>
                            <Input
                                id="logoUrl"
                                name="logoUrl"
                                placeholder="https://..."
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save Brand</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
