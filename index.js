let fetch = require('node-fetch');

async function checkResponseStatus(response) {
    if(response.ok) {
        return response;
    } else {
        throw new Error(`The HTTP status of the response is ${response.status} (${response.statusText})`);
    }
}

exports.handler = async (env) => {
    // hotel's booking process
    try {
        let response = await fetch('https://xxx.execute-api.ap-northeast-1.amazonaws.com/Prod/museum', {
            method: 'POST',
            body: JSON.stringify(env),
            headers: {'Content-Type': 'application/json'}
        })
        let body = await checkResponseStatus(response);
        return await body.json();
    } catch (err) {
        console.error(err.message);
    }
}