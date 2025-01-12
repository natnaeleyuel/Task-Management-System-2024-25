const URL = 'http://localhost:3000/authentication/signup';

export default async function signup(userData){
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.status === 403) {
            return response;
        }
        return response;
    } catch (error) {
        throw error;
    }
};