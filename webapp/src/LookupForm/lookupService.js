export async function postData(myJSON)  //Function to post Name and Zipcode to Service
{
    try {
        const url = 'http://127.0.0.1:5000/create_phrase';
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                mode: 'cors'
            },
            body: myJSON
        };
        const response = await fetch(url, options);
        return response.json();
    }
    catch (e) {
        console.error(e);
    }
}