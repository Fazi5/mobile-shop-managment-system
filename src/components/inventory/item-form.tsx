"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useInventory } from "@/context/store"
import { InventoryItem } from "@/types/inventory"
// import { v4 as uuidv4 } from "uuid"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    category: z.enum(["Equipment", "Instrument", "Consumable"]),
    quantity: z.coerce.number().min(0),
    minLevel: z.coerce.number().min(0),
    unit: z.string().min(1),
    location: z.string().min(1),
    expiryDate: z.string().optional(),
})

interface ItemFormProps {
    initialData?: InventoryItem
    onSuccess?: () => void
}

export function ItemForm({ initialData, onSuccess }: ItemFormProps) {
    const { addInventoryItem, updateInventoryItem } = useInventory()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: initialData ? {
            name: initialData.name,
            category: initialData.category,
            quantity: initialData.quantity,
            minLevel: initialData.minLevel,
            unit: initialData.unit,
            location: initialData.location,
            expiryDate: initialData.expiryDate || "",
        } : {
            name: "",
            category: "Consumable",
            quantity: 0,
            minLevel: 0,
            unit: "pcs",
            location: "",
            expiryDate: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const itemData: InventoryItem = {
            id: initialData?.id || Math.random().toString(36).substr(2, 9), // Simple ID generation
            ...values,
            lastUpdated: new Date().toISOString(),
        }

        if (initialData) {
            updateInventoryItem(itemData)
        } else {
            addInventoryItem(itemData)
        }

        if (onSuccess) {
            onSuccess()
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Item name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Equipment">Equipment</SelectItem>
                                        <SelectItem value="Instrument">Instrument</SelectItem>
                                        <SelectItem value="Consumable">Consumable</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="unit"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Unit</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. box, pcs" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Quantity</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="minLevel"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Min Level</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input placeholder="Storage location" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Expiry Date (Optional)</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    {initialData ? "Update Item" : "Add Item"}
                </Button>
            </form>
        </Form>
    )
}
