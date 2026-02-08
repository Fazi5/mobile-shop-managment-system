"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useInventory } from "@/context/store"
import { InventoryItem } from "@/types/inventory"

interface DeductDialogProps {
    item: InventoryItem
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function DeductDialog({ item, open, onOpenChange }: DeductDialogProps) {
    const { addUsageLog } = useInventory()
    const [quantity, setQuantity] = useState(1)
    const [reason, setReason] = useState("")

    const handleDeduct = () => {
        addUsageLog({
            id: Math.random().toString(36).substr(2, 9),
            itemId: item.id,
            itemName: item.name,
            quantity: quantity,
            date: new Date().toISOString(),
            reason: reason || "Quick Deduct",
            userId: "current-user", // Mock user
        })
        onOpenChange(false)
        setQuantity(1)
        setReason("")
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Deduct Stock</DialogTitle>
                    <DialogDescription>
                        Record usage for {item.name}. Current stock: {item.quantity} {item.unit}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="quantity" className="text-right">
                            Quantity
                        </Label>
                        <Input
                            id="quantity"
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="col-span-3"
                            min={1}
                            max={item.quantity}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="reason" className="text-right">
                            Reason
                        </Label>
                        <Input
                            id="reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="e.g. Patient Procedure"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleDeduct}>Deduct</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
