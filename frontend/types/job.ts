export interface Job {
    id: string;
    email: string;
    status: "pending" | "processing" | "completed" | "failed";
    payment: "paid" | "unpaid";
    created: string;
    inputImages: string[];
    selectedImage: string | null;
    outputImage: string | null;
    error: string | null;
}
