// manipulation problems to practice:
// find distinct of x attribute (e.g. if given an array of attendees at a conference, find all distinct companies) --> SET
// find count of attendees per company --> MAP

// import node fetch in order to make post requests in node environment (reg fetch needs browser)
import fetch from 'node-fetch';

// URL of external API
const apiURL = "https://dummyjson.com";

// function to get data from API
const getUsers = async () => {
    try {
        const response = await fetch(apiURL + "/users?limit=100");
        const data = await response.json(); // returns a promise that parses json into JS object
        console.log("Response after GET: ", data);
        return data.users;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// // create a post
// const post = {
//     title: 'test title',
//     body: 'test body',
//     userId: 27
// }

// function to post data to API
const postData = async (post) => {
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

const getDistinctEyeColors = async () => {
    const distinctEyeColors = new Set();

    const allUsers = await getUsers();
    allUsers.filter((user) => { distinctEyeColors.add(user.eyeColor) });
    return distinctEyeColors;
}

const getNumberOfUsersPerEyeColor = async () => {
    const eyeColorsMap = new Map();

    const allUsers = await getUsers();
    allUsers.map((user) => {
        if (eyeColorsMap.has(user.eyeColor)) {
            let numUsersWithThisEyeColor = eyeColorsMap.get(user.eyeColor);
            numUsersWithThisEyeColor += 1;
            eyeColorsMap.set(user.eyeColor, numUsersWithThisEyeColor);
        } else {
            eyeColorsMap.set(user.eyeColor, 1);
        }
    })

    return eyeColorsMap;
}

const getAverageAgeOfUsers = async () => {
    const allUsers = await getUsers();
    console.log("SUM OF AGES: " , typeof(allUsers.reduce((acc, currUser) =>
        acc + currUser.age
    , 0)));
    console.log("TOTAL # OF USERS: ", typeof(allUsers.length))
    const avgAge = allUsers.reduce((acc, currUser) =>  acc + currUser.age, 0) / allUsers.length;
    return avgAge;
}

const getNumberOfUsersPerCompany = async () => {
    const companiesMap = new Map();

    const allUsers = await getUsers();
    allUsers.map((user) => {
        const company = user.company.name;

        if (companiesMap.has(company)) {
            let companyCount = companiesMap.get(company);
            companyCount += 1;
            companiesMap.set(company, companyCount);
        } else {
            companiesMap.set(company, 1);
        }
    })

    return companiesMap;
}

const getNumberOfUsersPerState = async () => {
    const statesMap = new Map();

    const allUsers = await getUsers();
    allUsers.map((user) => {
        const state = user.address.state;

        if (statesMap.has(state)) {
            let stateCount = statesMap.get(state);
            stateCount += 1;
            statesMap.set(state, stateCount);
        } else {
            statesMap.set(state, 1);
        }
    })
    return statesMap;
}

const getUserWithHeighestWeight = async () => {
    let userWithHeighestWeight = {
        name: "",
        weight: 0
    }

    const allUsers = await getUsers();

    allUsers.map((user) => {
        if (user.weight > userWithHeighestWeight.weight) {
            userWithHeighestWeight.name = user.firstName + " " + user.lastName;
            userWithHeighestWeight.weight = user.weight;
        }
    })

    return userWithHeighestWeight;
}

const getAllChiefExecutives = async () => {
    const allUsers = await getUsers();

    const chiefExecutives = allUsers.filter((user) => {
        if (user.company.title.includes("Chief")) {
            return user;
        }
    })

    return chiefExecutives;
}

// // call the functions
console.log(await getDistinctEyeColors());
console.log(await getNumberOfUsersPerEyeColor());
console.log(await getAverageAgeOfUsers());
console.log(await getNumberOfUsersPerCompany());
console.log(await getNumberOfUsersPerState());
console.log(await getUserWithHeighestWeight());
console.log(await getAllChiefExecutives());