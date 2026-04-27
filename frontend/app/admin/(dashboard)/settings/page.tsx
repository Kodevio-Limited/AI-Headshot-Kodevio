"use client";

import { useAppForm } from "@/components/form/form-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, Shield, UserRound } from "lucide-react";
import { useMemo, useState } from "react";

type SettingsTab = "profile" | "security" | "notification";

const profileImage = "https://www.figma.com/api/mcp/asset/60d1da0a-fae3-4799-9636-5998faafceeb";

const settingsNav = [
    { key: "profile", label: "Profile", icon: UserRound },
    { key: "security", label: "Security", icon: Shield },
    { key: "notification", label: "Notification", icon: Bell },
] as const satisfies ReadonlyArray<{ key: SettingsTab; label: string; icon: React.ComponentType<{ className?: string }> }>;

function SettingsNav({ activeTab, onSelect }: { activeTab: SettingsTab; onSelect: (tab: SettingsTab) => void }) {
    return (
        <aside className="w-full rounded-[10px] border border-(--dashboard-border) bg-(--dashboard-surface) p-4 shadow-(--dashboard-card-shadow) lg:sticky lg:top-24">
            <nav className="mx-auto flex w-full max-w-56.25 flex-col gap-2.5">
                {settingsNav.map((item) => {
                    const isActive = activeTab === item.key;
                    const Icon = item.icon;

                    return (
                        <Button
                            key={item.key}
                            size="sm"
                            variant={isActive ? "default" : "ghost"}
                            className="h-12 w-full justify-start rounded-[20px] px-4 text-[16px] font-medium"
                            onClick={() => onSelect(item.key)}
                        >
                            <Icon />
                            <span>{item.label}</span>
                        </Button>
                    );
                })}
            </nav>
        </aside>
    );
}

function ProfilePanel() {
    const form = useAppForm({
        defaultValues: { name: "", email: "" },
    });

    return (
        <section className="dashboard-card min-w-0 overflow-hidden">
            <div className="border-b border-border px-6 py-4">
                <h2 className="text-xl font-semibold">Profile Setting</h2>
            </div>

            <div className="space-y-6 p-6">
                <div className="flex items-center gap-3">
                    <Avatar className="size-20">
                        <AvatarImage src={profileImage} alt="Jane Cooper" />
                        <AvatarFallback>JC</AvatarFallback>
                    </Avatar>

                    <div className="space-y-1">
                        <p className="text-xl font-medium text-foreground">Jane Cooper</p>
                        <p>jane@gmail.com</p>
                    </div>
                </div>

                <form
                    className="grid gap-6"
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                >
                    <div className="grid gap-6 lg:grid-cols-2">
                        <form.AppField name="name">
                            {(field) => <field.FormInput type="text" label="Name" placeholder="Enter your name" />}
                        </form.AppField>
                        <form.AppField name="email">
                            {(field) => <field.FormInput type="email" label="Email" placeholder="Enter your email" />}
                        </form.AppField>
                    </div>

                    <form.AppForm>
                        <div className="flex justify-end pt-2">
                            <form.FormSubmit label="Save Changes" className="h-12 w-88.5 rounded-[5px]" />
                        </div>
                    </form.AppForm>
                </form>
            </div>
        </section>
    );
}

function SecurityPanel() {
    const form = useAppForm({
        defaultValues: { currentPassword: "", newPassword: "", confirmNewPassword: "" },
    });

    return (
        <section className="dashboard-card min-w-0 overflow-hidden">
            <div className="border-b border-border px-6 py-4">
                <h2 className="text-xl font-semibold">Security</h2>
            </div>

            <form
                className="grid gap-4 p-6 pt-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
            >
                <form.AppField name="currentPassword">
                    {(field) => <field.FormInput type="password" label="Current Password" placeholder="Enter current password" />}
                </form.AppField>
                <form.AppField name="newPassword">
                    {(field) => <field.FormInput type="password" label="New Password" placeholder="Enter new password" />}
                </form.AppField>
                <form.AppField name="confirmNewPassword">
                    {(field) => <field.FormInput type="password" label="Confirm New Password" placeholder="Confirm new password" />}
                </form.AppField>
                <form.AppForm>
                    <div className="flex justify-end pt-2">
                        <form.FormSubmit label="Save Changes" className="h-12 w-88.5 rounded-[5px]" />
                    </div>
                </form.AppForm>
            </form>
        </section>
    );
}

function NotificationToggle({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (checked: boolean) => void }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onCheckedChange(!checked)}
            className="relative h-7 w-12.5 rounded-full bg-primary"
        >
            <span
                className={`absolute top-1/2 size-5 -translate-y-1/2 rounded-full bg-background transition-all ${checked ? "right-1" : "left-1"}`}
            />
        </button>
    );
}

function NotificationPanel() {
    const [newBackings, setNewBackings] = useState(true);
    const [highFidelityPreviews, setHighFidelityPreviews] = useState(true);
    const [autoSaveProjects, setAutoSaveProjects] = useState(true);

    return (
        <section className="dashboard-card min-w-0 overflow-hidden">
            <div className="border-b border-border px-6 py-4">
                <h2 className="text-xl font-semibold">Notification</h2>
            </div>

            <div className="space-y-4 p-6 pt-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                        <p className="text-lg font-medium">New Backings</p>
                        <p className="text-sm text-muted-foreground">Get notified when we add new backings to the catalog</p>
                    </div>
                    <NotificationToggle checked={newBackings} onCheckedChange={setNewBackings} />
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                        <p className="text-lg font-medium">High Fidelity Previews</p>
                        <p className="text-sm text-muted-foreground">Always load 4K textures in the backing viewer</p>
                    </div>
                    <NotificationToggle checked={highFidelityPreviews} onCheckedChange={setHighFidelityPreviews} />
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                        <p className="text-lg font-medium">Auto-save Projects</p>
                        <p className="text-sm text-muted-foreground">Automatically save changes to your mood boards</p>
                    </div>
                    <NotificationToggle checked={autoSaveProjects} onCheckedChange={setAutoSaveProjects} />
                </div>
            </div>
        </section>
    );
}

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

    const panel = useMemo(() => {
        if (activeTab === "security") return <SecurityPanel />;
        if (activeTab === "notification") return <NotificationPanel />;
        return <ProfilePanel />;
    }, [activeTab]);

    return (
        <section className="w-full h-full">
            <div className="dashboard-page-header">
                <h1 className="dashboard-page-title">Settings</h1>
                <p className="dashboard-page-subtitle">Customize your experience and account details.</p>
            </div>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_minmax(0,1fr)] xl:items-start">
                <SettingsNav activeTab={activeTab} onSelect={setActiveTab} />
                {panel}
            </div>
        </section>
    );
}
