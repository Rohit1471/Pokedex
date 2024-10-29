export async function getPokeAPI(API) {

    let callingAPI; 
    await fetch(API)
    .then(response => response.json())
    .then(data => { callingAPI = data});
    // console.log(callingAPI);

    return callingAPI;
}

