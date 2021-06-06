/* Global Variables */
const apiKey = '2be1d7f2240eabef4476456a59c51838';  //  api key bought from OpenWeatherMap

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth()}.${d.getDate()}.${d.getFullYear()}`;  //  Date format

/**
 * @description It is an Async function which gets API info from OpenWeatherMap and handle it to be used later
 * @param {value} zipCode
 */
const getData = async (zipCode) => {
    //  Here I will store the data which will be fetched using this apiURL in request const
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
    const request = await fetch (apiURL);
    try{
        const newData = await request.json();
        return newData; //  Then it will be returned
    }catch(error){
        console.log(error);
    }
};

/**
 * @description It is an Async function which saves data fetched by the above function in server side object
 * @param {string} url
 * @param {object} data
 */
const postData = async (url = '', data = {}) => {
    //  Here a post request will be made to store the data in the server side using fetch function with method 'POST'
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try{
        const sentData = await response.json();
        return sentData;
    }catch(error){
        console.log(error);
    }
};

/**
 * @description It is an Async function which will show information in the web page 
 */
const update = async () => {
    //  This line fetches the data posted in the server side by the previous function to display it in the web page
    const request = await fetch('/all');
    try{
        const updatingData = await request.json();  //  Preparing data in json format
        //  Display weather information on the web page using JS DOM
        document.querySelector('#name').textContent = `Location: ${updatingData.name}`;
        document.querySelector('#date').textContent = `Date: ${updatingData.date}`;
        document.querySelector('#temp').textContent = `Temperature: ${updatingData.temp}°C`;
        document.querySelector('#content').textContent = `Feeling: ${updatingData.feelings}`;
        return updatingData;
    }catch(error){
        console.log("error", error);
    }
}

//  Move to button event
//  Select the button
const button = document.querySelector("#generate");

//  An event listener will be added to the button when it is clicked
/**
 * @description Its callback function will call the previous 3 client side functions to dynamically update the web page
 */
button.addEventListener('click', getWeatherInfo = () => {
    // Preparing zipCode & feelings
    const zipCode = document.querySelector('#zip').value;
    const feelings = document.querySelector('#feelings').value;
    if(!zipCode){   //  Check if the user wrote zipCode
        alert(`Please Enter a Zip Code.`);  //  If not, Alert!
    } else {
        //  If it is written, The three previous functions will be called
        //  At first Data will be fetched from api by getData. Then the useful data will be extracted and sent to the server to be stored using postData.
        //  Finally, This useful data will be fetched again to be displayed on the web page using update function which modifies the web page dynamically.
        getData(zipCode).then((data) => postData("/sendData", {
            name: data.name,
            temp: data.main.temp,
            date: newDate,
            feelings: feelings
        })
        ).then(update());
    }
});