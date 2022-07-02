export const fetchPost = async (route, body = {}) => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    return await fetch(route, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    })
    .then(function(response) {
        return response.json();
    })
    .then((data) => {
        return data;
    })
    .catch((err) => {
        console.log(err);
        return err;
    })
};