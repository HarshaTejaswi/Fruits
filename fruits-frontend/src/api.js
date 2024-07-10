const API_URL = 'http://13.201.188.254:5000';

export const login = async (username, password) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      throw new Error('Login failed');
    }
    return response.json();
  };

export const getFruits = async () => {
    const response = await fetch(`${API_URL}/fruits`);
    if (!response.ok) {
        console.error('Error details:', response.status, await response.text());
    }
    return response.json();
};

export const addFruits = async (names) => {
    const response = await fetch(`${API_URL}/fruits/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ names }) // Ensuring the key 'names' is used
    });
    if (!response.ok) {
      throw new Error('Failed to fetch: ' + response.statusText);
    }
    return response.json();
  };
  

export const removeFruits = async (ids) => {
    const response = await fetch(`${API_URL}/fruits/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids }),
    });
    if (!response.ok) {
        console.error('Error details:', response.status, await response.text());
    }
    return response.json();
};

export const updateFruitQuantity = async (id, quantity) => {
    const response = await fetch(`${API_URL}/fruits/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, quantity }),
    });
    if (!response.ok) {
        console.error('Error details:', response.status, await response.text());
    }
    return response.json();
};
