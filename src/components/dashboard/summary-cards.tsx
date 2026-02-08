"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useInventory } from "@/context/store"
import { AlertTriangle, DollarSign, Package, Clock } from "lucide-react"

export function SummaryCards() {
    const { inventory, orders } = useInventory()

    const lowStockCount = inventory.filter((item) => item.quantity <= item.minLevel).length

    const expiringSoonCount = inventory.filter((item) => {
        if (!item.expiryDate) return false
        const expiry = new Date(item.expiryDate)
        const today = new Date()
        const diffTime = expiry.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays <= 30 && diffDays >= 0
    }).length

    const totalSpend = orders.reduce((acc, order) => acc + order.totalCost, 0)

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Items
                    </CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{inventory.length}</div>
                    <p className="text-xs text-muted-foreground">
                        Unique items in stock
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Low Stock
                    </CardTitle>
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-red-500">{lowStockCount}</div>
                    <p className="text-xs text-muted-foreground">
                        Items below minimum level
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Expiring Soon
                    </CardTitle>
                    <Clock className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-orange-500">{expiringSoonCount}</div>
                    <p className="text-xs text-muted-foreground">
                        Items expiring in 30 days
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Spend
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">${totalSpend.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                        Lifetime expenditure
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
