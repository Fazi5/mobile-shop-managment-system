"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useInventory } from "@/context/store"
import { formatDistanceToNow } from "date-fns" // I might need to install date-fns or just use native Intl

export function RecentActivity() {
    const { usageLogs, orders } = useInventory()

    // Combine and sort activities
    const activities = [
        ...usageLogs.map(log => ({
            type: 'usage',
            id: log.id,
            title: `Used ${log.quantity} ${log.itemName}`,
            date: new Date(log.date),
            description: log.reason
        })),
        ...orders.map(order => ({
            type: 'order',
            id: order.id,
            title: `Order #${order.id} - ${order.status}`,
            date: new Date(order.date),
            description: `${order.items.length} items`
        }))
    ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5)

    return (
        <Card className="col-span-4 lg:col-span-3">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {activities.length === 0 && (
                        <p className="text-sm text-muted-foreground">No recent activity.</p>
                    )}
                    {activities.map((activity) => (
                        <div key={activity.id} className="flex items-center">
                            <div className="ml-4 space-y-1">
                                <p className="text-sm font-medium leading-none">{activity.title}</p>
                                <p className="text-sm text-muted-foreground">
                                    {activity.description} • {activity.date.toLocaleDateString()}
                                </p>
                            </div>
                            <div className="ml-auto font-medium">
                                {/* Could add +/- amount here */}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
