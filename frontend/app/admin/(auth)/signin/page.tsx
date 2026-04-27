"use client";

import { useAppForm } from "@/components/form/form-context";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";

const signinSchema = z.object({
    email: z.email("Enter your email address"),
    password: z.string().min(6, "Password must be at least 6 characters").max(32, "Password must be at most 32 characters"),
    remember: z.boolean(),
});

export default function Signin() {
    const router = useRouter();

    const form = useAppForm({
        defaultValues: { email: "", password: "", remember: false },
        validators: { onChange: signinSchema },
        onSubmit: async ({ value }) => {
            console.log("Signin:", value);
            router.push("/admin");
        },
    });

    return (
        <div className="my-20 mx-auto flex w-full max-w-150 flex-col gap-6 rounded-lg border px-6 py-12">
            <h2 className="text-center text-2xl font-bold">Sign In</h2>

            <form
                className="grid gap-6"
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
            >
                <form.AppField name="email">
                    {(field) => <field.FormInput type="email" label="Email" placeholder="Enter your email" />}
                </form.AppField>

                <form.AppField name="password">
                    {(field) => <field.FormInput type="password" label="Password" placeholder="Enter your password" />}
                </form.AppField>

                <div className="flex items-center justify-between">
                    <form.AppField name="remember">
                        {(field) => (
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="remember"
                                    checked={field.state.value}
                                    onCheckedChange={(c) => field.handleChange(c === true)}
                                />
                                <label htmlFor="remember" className="text-sm text-muted-foreground">
                                    Remember me
                                </label>
                            </div>
                        )}
                    </form.AppField>

                    <Link href="/admin/forgot-password" className="text-primary font-medium hover:underline">
                        Forgot password?
                    </Link>
                </div>

                <form.AppForm>
                    <form.FormSubmit label="Sign In" />
                </form.AppForm>
            </form>

            <p className="text-center text-muted-foreground">
                Do not have account?{" "}
                <Link href="/signup" className="text-foreground font-medium hover:underline">
                    Sign up
                </Link>
            </p>
        </div>
    );
}
