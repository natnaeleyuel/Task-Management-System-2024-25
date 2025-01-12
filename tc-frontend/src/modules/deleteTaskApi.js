const URL = 'http://localhost:3000/tasks';

export default async function deleteTask(accessToken, taskId) {
    try {
        console.log('Access Token:', accessToken); // Log the access token for debugging
        const response = await fetch(`${URL}/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
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