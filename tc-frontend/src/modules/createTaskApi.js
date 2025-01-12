const URL = 'http://localhost:3000/tasks';

export default async function createTask(userData, accessToken) {
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(userData),
            credentials: 'include',
        });

        console.log('Response Status:', response.status); // Log the response status for debugging
        if (response.status === 401) {
            console.error('Unauthorized: Invalid or expired token');
        } else if (response.status === 403) {
            return response;
        }
        return response;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}