// import node fetch in order to make post requests in node environment (reg fetch needs browser)
import fetch from 'node-fetch';

// URL of external API
const apiURL = "https://jsonplaceholder.typicode.com";

// function to get data from API
const getPost = async () => {
    try {
    const response = await fetch(apiURL + "/posts/1");
    const data = await response.json(); // returns a promise that parses json into JS object
    console.log("Response after GET: ", data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// create a post
const post = {
    title: 'test title',
    body: 'test body',
    userId: 27
}

// function to post data to API
const createPost = async (post) => {
    try {
        const response = await fetch(apiURL + "/posts", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });
    
        const data = await response.json();
        // console.log("Response after POST: ", data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const changePostBody = async () => {
    const post = await getPost();
    post.body = 'hiii';
    const createdPost = await createPost(post);
    console.log("created POSTTT: ", createdPost);
}

// // call the functions
// getPosts();
// // createPost(post);
// createPost(post);

changePostBody();