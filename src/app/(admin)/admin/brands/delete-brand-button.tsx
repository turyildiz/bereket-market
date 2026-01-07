'use client';

import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deleteBrand } from '@/app/actions/brands';

export function DeleteBrandButton({ id }: { id: string }) {
    return (
        <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={async () => await deleteBrand(id)}
        >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
        </Button>
    );
}
