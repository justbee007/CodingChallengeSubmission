export async function getzipcodes()  //Function to post Signup data into database
{
    try {
        const url = 'http://127.0.0.1:5000/getzipcodes';
        const options = {
            method: 'POST',
            headers: {
                mode: 'cors'
            },
        };
        const response = await fetch(url, options);
        return response.json();
    }
    catch (e) {
        console.log(e);
    }
}

