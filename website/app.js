/* Global Variables */
const apiKey = '0ef9c9d6a94d15f124e1e66e268c26ee&units=imperial';

const getTemperatureByZip = async (zipCode) => {
    let url = 'https://api.openweathermap.org/data/2.5/weather?zip=' + zipCode + ',de&appid=' + apiKey ;
    const response = await fetch(url);
    try {
        const weatherResponse = await response.json();
        return weatherResponse && weatherResponse.main.temp;
    } catch (error) {
        console.log('Can not retrieve current weather data', error);
    }
};

function buildRecentUserEntry(temperature) {
    let userInput = document.getElementById('feelings').value;
    let date = new Date();
    let newDate = date.getMonth() + '.' + date.getDate() + '.' + date.getFullYear();

    return {
        'temperature': temperature,
        'date': newDate,
        'userResponse': userInput
    };
}

const postRecentUserEntry = async (recentUserEntry) => {
    const response = await fetch('api/user-entry', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recentUserEntry)
    });

    try {
        const responseData = await response.json();
        console.log(responseData);
    } catch (error) {
        console.log('Could not post new data');
    }
};

const updateUiWithRecentData = async () => {
    const response = await fetch('/api/user-entry');
    try {
        const recentUserEntry = await response.json();
        document.getElementById('date').innerHTML = recentUserEntry.date;
        document.getElementById('temp').innerHTML = Math.round(recentUserEntry.temperature) + ' degrees';
        document.getElementById('content').innerHTML = recentUserEntry.userResponse;
    } catch (error) {
        console.log('Can not retrieve current user response', error);
    }
};

document.getElementById('generate').addEventListener('click', async () => {
    let zipCode = document.getElementById('zip').value;

    getTemperatureByZip(zipCode).then(
        (temperature) => {
            let recentUserEntry = buildRecentUserEntry(temperature);
            postRecentUserEntry(recentUserEntry);
            updateUiWithRecentData();
        }
    );
});