// import node fetch in order to make post requests in node environment (reg fetch needs browser)
import fetch from 'node-fetch';

// URL of external API
const apiURL = "https://jsonplaceholder.typicode.com";

// function to get data from API
const getPosts = () => {
    fetch(apiURL + "/posts/1")
    .then(response => response.json()) // returns a promise that parses json into JS object
    .then(data => {
        console.log("Response after GET: ", data);
        return data;
    })
    .catch(error => {
        console.error(error);
    });
}

// create a post
const post = {
    title: 'test title',
    body: 'test body',
    userId: 27
}

// function to post data to API
const createPost = (post) => {
    fetch(apiURL + "/posts", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Response after POST: ", data);
    })
    .catch(error => {
        console.error(error);
    })
}

// call the functions
getPosts();
// createPost(post);
createPost(post);