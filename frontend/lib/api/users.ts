import { User } from "@/types/user";
import { usersData } from "@/lib/data/users-data";

// Using the existing mock data from lib/data
let mockUsers: User[] = [...usersData];

export async function fetchUsers(): Promise<User[]> {
  // Simulate network request
  return new Promise((resolve) => setTimeout(() => resolve([...mockUsers]), 500));
}

export async function deleteUser(userId: string | number): Promise<void> {
  // Simulate network request
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const initialLength = mockUsers.length;
      mockUsers = mockUsers.filter(u => u.id !== userId);
      if (mockUsers.length === initialLength) return reject(new Error("User not found"));
      resolve();
    }, 500);
  });
}
