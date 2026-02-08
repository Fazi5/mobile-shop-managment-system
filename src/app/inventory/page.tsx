"use client"

import { useState } from "react"
import { DataTable } from "@/components/inventory/data-table"
import { columns } from "@/components/inventory/columns"
import { useInventory } from "@/context/store"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ItemForm } from "@/components/inventory/item-form"

export default function InventoryPage() {
    const { inventory } = useInventory()
    const [open, setOpen] = useState(false)

    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Inventory</h2>
                    <p className="text-muted-foreground">
                        Manage your clinic's equipment and supplies.
                    </p>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Item
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add Inventory Item</DialogTitle>
                            <DialogDescription>
                                Add a new item to your inventory tracking.
                            </DialogDescription>
                        </DialogHeader>
                        <ItemForm onSuccess={() => setOpen(false)} />
                    </DialogContent>
                </Dialog>
            </div>

            <DataTable columns={columns} data={inventory} />
        </div>
    )
}
