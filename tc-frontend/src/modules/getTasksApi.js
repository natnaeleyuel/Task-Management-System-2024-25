const URL = 'http://localhost:3000/tasks/group/';

// for manager
export default async function getTasks(accessToken, groupId) {
    try {
        const response = await fetch(URL+`${groupId}`, {
            method: 'Get',
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
        return response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}