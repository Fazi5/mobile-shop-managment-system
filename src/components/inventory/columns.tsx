"use client"

import { ColumnDef } from "@tanstack/react-table"
import { InventoryItem } from "@/types/inventory"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { DeductDialog } from "@/components/inventory/deduct-dialog"

export const columns: ColumnDef<InventoryItem>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => <Badge variant="outline">{row.getValue("category")}</Badge>,
    },
    {
        accessorKey: "quantity",
        header: "Quantity",
        cell: ({ row }) => {
            const quantity = parseFloat(row.getValue("quantity"))
            const minLevel = row.original.minLevel
            const isLow = quantity <= minLevel

            return (
                <div className={isLow ? "text-red-500 font-bold" : ""}>
                    {quantity} {row.original.unit}
                </div>
            )
        },
    },
    {
        accessorKey: "location",
        header: "Location",
    },
    {
        accessorKey: "expiryDate",
        header: "Expires",
        cell: ({ row }) => {
            const date = row.getValue("expiryDate") as string
            if (!date) return "-"
            return new Date(date).toLocaleDateString()
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const item = row.original
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [showDeduct, setShowDeduct] = useState(false)

            return (
                <>
                    <DeductDialog
                        item={item}
                        open={showDeduct}
                        onOpenChange={setShowDeduct}
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(item.id)}
                            >
                                Copy ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onSelect={() => setShowDeduct(true)}>
                                Deduct Stock
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit Item</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete Item</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            )
        },
    },
]
