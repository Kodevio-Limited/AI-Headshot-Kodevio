// Renamed from add-song-dialog-content.tsx
"use client";

import { useAppForm } from "@/components/form/form-context";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type AddUserFormValues = {
    name: string;
    email: string;
    role: string;
    status: string;
};

export function AddUserDialogContent() {
    const form = useAppForm({
        defaultValues: {
            name: "",
            email: "",
            role: "",
            status: "",
        } satisfies AddUserFormValues,
    });

    return (
        <DialogContent className="dashboard-dialog">
            <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>Fill in the details for the new user.</DialogDescription>
            </DialogHeader>

            <form
                className="grid gap-6"
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
            >
                <div className="grid grid-cols-2 gap-4">
                    <form.AppField name="name">{(field) => <field.FormInput label="Name" placeholder="Enter user name" />}</form.AppField>
                    <form.AppField name="email">{(field) => <field.FormInput label="Email" placeholder="Enter email address" />}</form.AppField>
                </div>

                <form.AppField name="role">
                    {(field) => <field.FormInput label="Role" placeholder="Enter user role" />}
                </form.AppField>

                <form.AppField name="status">
                    {(field) => <field.FormInput label="Status" placeholder="Enter status (active/inactive)" />}
                </form.AppField>

                <div className="grid grid-cols-2 gap-4">
                    <DialogClose asChild>
                        <Button variant="outline" type="button" className="w-full rounded-md">
                            Cancel
                        </Button>
                    </DialogClose>

                    <form.AppForm>
                        <form.FormSubmit label="Add User" className="w-full rounded-md" />
                    </form.AppForm>
                </div>
            </form>
        </DialogContent>
    );
}
