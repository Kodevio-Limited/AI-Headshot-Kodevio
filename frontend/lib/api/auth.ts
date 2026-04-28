const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// ─── Cookie helper ────────────────────────────────────────────────────────────
function getCookie(name: string): string {
    const v = `; ${document.cookie}`;
    const parts = v.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()!.split(";").shift() ?? "";
    return "";
}

// ─── CSRF ─────────────────────────────────────────────────────────────────────
// Call this before any state-mutating POST so Django sets the csrftoken cookie.
export async function fetchCsrf(): Promise<void> {
    await fetch(`${API}/auth/csrf/`, {
        credentials: "include",
    });
}

// ─── Sign In ──────────────────────────────────────────────────────────────────
export interface SignInData {
    email: string;
    password: string;
}

export interface AuthUser {
    username: string;
    email: string;
    name: string;
}

export async function signIn(data: SignInData): Promise<AuthUser> {
    await fetchCsrf();

    const res = await fetch(`${API}/auth/login/`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify({ email: data.email, password: data.password }),
    });

    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Login failed. Please check your credentials.");
    }

    const body = await res.json();
    return body.user as AuthUser;
}

// ─── Sign Out ─────────────────────────────────────────────────────────────────
export async function signOut(): Promise<void> {
    await fetch(`${API}/auth/logout/`, {
        method: "POST",
        credentials: "include",
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
        },
    });
}

// ─── Session Check ────────────────────────────────────────────────────────────
// Returns the current user if logged in, or null if not authenticated.
export async function getSession(): Promise<AuthUser | null> {
    const res = await fetch(`${API}/auth/session/`, {
        credentials: "include",
    });
    if (!res.ok) return null;
    const body = await res.json();
    return body.user as AuthUser;
}

// ─── Change Password ──────────────────────────────────────────────────────────
export interface ChangePasswordData {
    old_password: string;
    new_password: string;
}

export async function changePassword(data: ChangePasswordData): Promise<void> {
    const res = await fetch(`${API}/auth/change-password/`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Failed to update password.");
    }
}
