export type Category = "Equipment" | "Instrument" | "Consumable"
export type SterilizationStatus = "Sterile" | "Contaminated" | "InProgress" | "NA"

export interface InventoryItem {
    id: string
    name: string
    category: Category
    quantity: number
    minLevel: number
    unit: string
    location: string
    expiryDate?: string // ISO date string
    sterilizationStatus?: SterilizationStatus
    supplierId?: string
    lastUpdated: string
}

export interface Supplier {
    id: string
    name: string
    contactPerson: string
    email: string
    phone: string
}

export interface Order {
    id: string
    supplierId: string
    date: string
    status: "Pending" | "Received" | "Cancelled"
    items: {
        itemId: string
        quantity: number
    }[]
    totalCost: number
}

export interface UsageLog {
    id: string
    itemId: string
    itemName: string
    quantity: number
    date: string
    reason: string // e.g., "Patient Procedure", "Expired", "Damaged"
    userId: string
}
