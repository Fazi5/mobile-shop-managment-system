"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { InventoryItem, Supplier, Order, UsageLog } from "@/types/inventory"

interface InventoryContextType {
    inventory: InventoryItem[]
    suppliers: Supplier[]
    orders: Order[]
    usageLogs: UsageLog[]
    addInventoryItem: (item: InventoryItem) => void
    updateInventoryItem: (item: InventoryItem) => void
    deleteInventoryItem: (id: string) => void
    addSupplier: (supplier: Supplier) => void
    addUsageLog: (log: UsageLog) => void
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined)

const MOCK_INVENTORY: InventoryItem[] = [
    {
        id: "1",
        name: "Dental Mirror",
        category: "Instrument",
        quantity: 15,
        minLevel: 10,
        unit: "pcs",
        location: "Cabinet A",
        sterilizationStatus: "Sterile",
        lastUpdated: new Date().toISOString(),
    },
    {
        id: "2",
        name: "Latex Gloves (M)",
        category: "Consumable",
        quantity: 5,
        minLevel: 20,
        unit: "box",
        location: "Storage Room",
        expiryDate: "2024-12-01",
        lastUpdated: new Date().toISOString(),
    },
    {
        id: "3",
        name: "Lidocaine",
        category: "Consumable",
        quantity: 50,
        minLevel: 10,
        unit: "vials",
        location: "Fridge",
        expiryDate: "2025-06-15",
        lastUpdated: new Date().toISOString(),
    },
]

const MOCK_SUPPLIERS: Supplier[] = [
    {
        id: "1",
        name: "Dental Depot Inc.",
        contactPerson: "John Doe",
        email: "john@dentaldepot.com",
        phone: "555-0123",
    },
]

export function InventoryProvider({ children }: { children: React.ReactNode }) {
    const [inventory, setInventory] = useState<InventoryItem[]>(MOCK_INVENTORY)
    const [suppliers, setSuppliers] = useState<Supplier[]>(MOCK_SUPPLIERS)
    const [orders, setOrders] = useState<Order[]>([])
    const [usageLogs, setUsageLogs] = useState<UsageLog[]>([])

    const addInventoryItem = (item: InventoryItem) => {
        setInventory((prev) => [...prev, item])
    }

    const updateInventoryItem = (item: InventoryItem) => {
        setInventory((prev) =>
            prev.map((i) => (i.id === item.id ? item : i))
        )
    }

    const deleteInventoryItem = (id: string) => {
        setInventory((prev) => prev.filter((i) => i.id !== id))
    }

    const addSupplier = (supplier: Supplier) => {
        setSuppliers((prev) => [...prev, supplier])
    }

    const addUsageLog = (log: UsageLog) => {
        setUsageLogs((prev) => [log, ...prev])
        // Automatically deduct from inventory
        const item = inventory.find((i) => i.id === log.itemId)
        if (item) {
            updateInventoryItem({
                ...item,
                quantity: item.quantity - log.quantity,
                lastUpdated: new Date().toISOString(),
            })
        }
    }

    return (
        <InventoryContext.Provider
            value={{
                inventory,
                suppliers,
                orders,
                usageLogs,
                addInventoryItem,
                updateInventoryItem,
                deleteInventoryItem,
                addSupplier,
                addUsageLog,
            }}
        >
            {children}
        </InventoryContext.Provider>
    )
}

export function useInventory() {
    const context = useContext(InventoryContext)
    if (context === undefined) {
        throw new Error("useInventory must be used within an InventoryProvider")
    }
    return context
}
