export const GET_REQUEST=async(url)=> {
    const response = await fetch(url, {
        'method' : 'GET',
        'Content-Type' : 'application/json',
        'Accept' : 'application/json', 
        'Access-Control-Allow-Origin': '*'
    })
    return await response.json();
}