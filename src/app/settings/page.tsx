"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
    return (
        <div className="p-8 space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">Manage your clinic preferences and application settings.</p>
            </div>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Clinic Profile</CardTitle>
                        <CardDescription>
                            Update your clinic's information.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="clinic-name">Clinic Name</Label>
                            <Input id="clinic-name" defaultValue="Bright Smile Dental" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" defaultValue="123 Main St, Cityville" />
                        </div>
                        <Button>Save Changes</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>
                            Configure how you receive alerts.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between space-x-2">
                            <Label htmlFor="email-alerts" className="flex flex-col space-y-1">
                                <span>Email Alerts</span>
                                <span className="font-normal leading-snug text-muted-foreground">
                                    Receive emails when stock is low.
                                </span>
                            </Label>
                            {/* Using a simple checkbox for now as Switch component isn't installed yet */}
                            <input type="checkbox" id="email-alerts" className="h-4 w-4" defaultChecked />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between space-x-2">
                            <Label htmlFor="expiry-alerts" className="flex flex-col space-y-1">
                                <span>Expiration Alerts</span>
                                <span className="font-normal leading-snug text-muted-foreground">
                                    Get notified 30 days before items expire.
                                </span>
                            </Label>
                            <input type="checkbox" id="expiry-alerts" className="h-4 w-4" defaultChecked />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
