"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, FileText } from "lucide-react"

export default function ReportsPage() {
    return (
        <div className="p-8 space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
                <p className="text-muted-foreground">View analytics and generate inventory reports.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Inventory Value
                        </CardTitle>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$12,450.00</div>
                        <p className="text-xs text-muted-foreground">
                            +2.5% from last month
                        </p>
                        <div className="mt-4 h-[200px] flex items-center justify-center bg-muted/20 rounded-md border border-dashed">
                            <span className="text-muted-foreground text-sm">Chart Placeholder</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Usage Trends
                        </CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">145 Items</div>
                        <p className="text-xs text-muted-foreground">
                            Consumed this month
                        </p>
                        <div className="mt-4 h-[200px] flex items-center justify-center bg-muted/20 rounded-md border border-dashed">
                            <span className="text-muted-foreground text-sm">Chart Placeholder</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
