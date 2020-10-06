const API_URL = 'http://localhost:4000'

export const list_log_entries = async () => {
    const response = await fetch(`${API_URL}/api/logs`);
    return response.json();
}

export const create_log_entry = async (data) => {
    const response = await fetch(`${API_URL}/api/logs`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return response.json()
}