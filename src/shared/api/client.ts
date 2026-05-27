const BASE_URL = 'https://dummyjson.com';

export async function apiGet<TResponse>(endpoint: string): Promise<TResponse> {
    const response = await fetch(`${BASE_URL}${endpoint}`);

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    return await response.json() as Promise<TResponse>;
}