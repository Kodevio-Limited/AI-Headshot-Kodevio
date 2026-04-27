export async function signIn(data: Record<string, any>): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Signing in with:", data);
            resolve();
        }, 500);
    });
}

export async function forgotPassword(data: Record<string, string>): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Forgot password for:", data);
            resolve();
        }, 500);
    });
}

export async function verifyOTP(code: string): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Verifying OTP:", code);
            resolve();
        }, 500);
    });
}

export async function resetPassword(data: Record<string, string>): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Resetting password with:", data);
            resolve();
        }, 500);
    });
}
