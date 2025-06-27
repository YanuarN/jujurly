interface RegisterPayload {
    username: string;
    email: string;
    password: string;
}

function registerUser(payload: RegisterPayload): Promise<unknown> {
    return fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(async response => {
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Register failed');
        }
        return data;
    });
}

interface LoginPayload {
    emailOrUsername: string;
    password: string;
}

function loginUser(payload: LoginPayload): Promise<string> {
    return fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return response.json();
    });
}

function userLookup(userId: string): Promise<{ user_identifier: string }> {
    return fetch(`${import.meta.env.VITE_API_URL}/api/user/lookup/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
        });
}

interface ResetPasswordPayload {
    email: string;
}

function resetPassword(payload: ResetPasswordPayload): Promise<string> {
    return fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(async response => {
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Reset password failed');
        }
        return data.message || 'Reset password link sent successfully';
    });
}

function feedbackForUser(userId: string): Promise<unknown[]> {
    return fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}/feedbacks`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch feedbacks');
            }
            return response.json();
        });
}

export default { loginUser, registerUser, userLookup, resetPassword, feedbackForUser };