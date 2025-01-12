const URL = 'http://localhost:3000/users/me';

export default async function getUserInfo(accessToken) {
    try {
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            credentials: 'include',
        });

        if (response.status === 401) {
            
        } else if (response.status === 403) {
            return response;
        }
        return response;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}