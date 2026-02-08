import { SummaryCards } from "@/components/dashboard/summary-cards"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Overview of your clinic's inventory status.</p>
      </div>

      <SummaryCards />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RecentActivity />
        {/* Placeholder for another widget, maybe quick actions or charts */}
      </div>
    </div>
  )
}
