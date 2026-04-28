import { changePassword } from "./auth";

export interface UserProfile {
    name: string;
    email: string;
    profileImage: string;
}

export interface NotificationSettings {
    newBackings: boolean;
    highFidelityPreviews: boolean;
    autoSaveProjects: boolean;
}

// Mock Data
let mockProfile: UserProfile = {
    name: "Jane Cooper",
    email: "jane@gmail.com",
    profileImage: "https://www.figma.com/api/mcp/asset/60d1da0a-fae3-4799-9636-5998faafceeb",
};

let mockNotificationSettings: NotificationSettings = {
    newBackings: true,
    highFidelityPreviews: true,
    autoSaveProjects: true,
};

export async function fetchProfile(): Promise<UserProfile> {
    return new Promise((resolve) => setTimeout(() => resolve({ ...mockProfile }), 400));
}

export async function updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    return new Promise((resolve) => {
        setTimeout(() => {
            mockProfile = { ...mockProfile, ...data };
            resolve({ ...mockProfile });
        }, 500);
    });
}

// Delegates to the real Django change-password endpoint
export async function updateSecurity(data: { old_password: string; new_password: string }): Promise<void> {
    await changePassword({ old_password: data.old_password, new_password: data.new_password });
}

export async function fetchNotificationSettings(): Promise<NotificationSettings> {
    return new Promise((resolve) => setTimeout(() => resolve({ ...mockNotificationSettings }), 400));
}

export async function updateNotificationSettings(data: Partial<NotificationSettings>): Promise<NotificationSettings> {
    return new Promise((resolve) => {
        setTimeout(() => {
            mockNotificationSettings = { ...mockNotificationSettings, ...data };
            resolve({ ...mockNotificationSettings });
        }, 500);
    });
}

