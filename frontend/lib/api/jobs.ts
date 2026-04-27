import { Job } from "@/types/job";

// Mock data (would be replaced by actual fetch call to the backend)
const mockJobs: Job[] = [
  {
    id: "job-001",
    email: "alice@example.com",
    status: "pending",
    payment: "paid",
    created: "2026-04-27 10:00:00",
    inputImages: ["/assets/input1.jpg", "/assets/input2.jpg"],
    selectedImage: "/assets/input1.jpg",
    outputImage: "/assets/output1.jpg",
    error: null,
  },
  {
    id: "job-002",
    email: "bob@example.com",
    status: "failed",
    payment: "unpaid",
    created: "2026-04-27 09:30:00",
    inputImages: ["/assets/input3.jpg"],
    selectedImage: null,
    outputImage: null,
    error: "Processing error: invalid input format.",
  },
];

export async function fetchJobs(): Promise<Job[]> {
  // Simulate network request
  return new Promise((resolve) => setTimeout(() => resolve([...mockJobs]), 500));
}

export async function retryJob(jobId: string): Promise<Job> {
  // Simulate network request
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const jobIndex = mockJobs.findIndex(j => j.id === jobId);
      if (jobIndex === -1) return reject(new Error("Job not found"));
      
      const updatedJob: Job = { ...mockJobs[jobIndex], status: "pending", error: null };
      mockJobs[jobIndex] = updatedJob;
      resolve(updatedJob);
    }, 500);
  });
}
