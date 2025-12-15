// Use /api in production, localhost in development
const API_URL = import.meta.env.DEV ? 'http://localhost:5000/api' : '/api';

export const checkStatus = async () => {
    try {
        const res = await fetch(`${API_URL}/status`);
        return await res.json();
    } catch (error) {
        // If server is down, assume not in maintenance
        return { maintenance: false, error: true };
    }
};

export const submitProject = async (data) => {
    try {
        const res = await fetch(`${API_URL}/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return await res.json();
    } catch (error) {
        return { success: false, message: 'Server Connection Failed' };
    }
};
