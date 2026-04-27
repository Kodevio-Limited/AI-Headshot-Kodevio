import { Button } from "@/components/ui/button";
import { useFormContext } from "./form-context";

export function FormSubmit({ label, className }: { label: string; className?: string }) {
    const Form = useFormContext();

    return (
        <Form.Subscribe selector={(state): [boolean] => [state.canSubmit]}>
            {([canSubmit]: [boolean]) => (
                <Button type="submit" className={className ?? "rounded-md"} disabled={!canSubmit}>
                    {label}
                </Button>
            )}
        </Form.Subscribe>
    );
}
