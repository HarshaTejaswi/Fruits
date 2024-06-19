const API_URL = 'http://localhost:5000';

export const login = async (username, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    return response.json();
};

export const getFruits = async () => {
    const response = await fetch(`${API_URL}/fruits`);
    return response.json();
};

export const addFruit = async (name) => {
    const response = await fetch(`${API_URL}/fruits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
    });
    return response.json();
};

export const removeFruit = async (id) => {
    const response = await fetch(`${API_URL}/fruits/${id}`, {
        method: 'DELETE',
    });
    return response.json();
};
