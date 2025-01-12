const URL = 'http://localhost:3000/authentication/login';

export default async function login(loginData) {
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        if (!response.ok) {
            return response.JSON();
        }
        // console.log(response.json().then(data => console.log(data.access_token)));
        return response;
    } catch (error) {
        throw error;
    }
};