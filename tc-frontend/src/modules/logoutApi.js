const URL = 'http://localhost:3000/authentication/logout';

export default async function logout(accessToken) {
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            return response;
        }
        return response;
    } catch (error) {
        throw error;
    }
};