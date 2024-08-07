// URL of external API
const apiURL = "https://jsonplaceholder.typicode.com";

// function to fetch Data from API
const fetchPosts = () => {
    fetch(apiURL + "/posts")
    .then(response => response.json()) // returns a promise that parses json into JS object
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });
}

// call the function the fetch data
fetchPosts();