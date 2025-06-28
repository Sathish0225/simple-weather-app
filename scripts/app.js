const form = document.querySelector('form');
const time = document.getElementById('time');
const icon = document.getElementById('icon');
const weatherInfo = document.querySelector('.weather-info');
const appBody = document.querySelector('.app-body');



const getInfo = async city => {
    const cityData = await getCity(city);
    const weatherData = await getWeather(cityData.Key);
    console.log(cityData, weatherData);
    return {cityData, weatherData};
};


const updateUi = (data) => {

    const {cityData, weatherData} = data;


    let timeSrc = weatherData.IsDayTime ? './images/time/day.svg': './images/time/night.svg';
    time.setAttribute('src', timeSrc);


    icon.setAttribute('src', `./images/icons/${weatherData.WeatherIcon}.svg`);


    const cityName = String(cityData.LocalizedName).toUpperCase();
    const weatherDetails = `<p id="city">${cityName}</p>
                            <P id="status">${weatherData.WeatherText}</P>
                            <p id="temp">${weatherData.Temperature.Metric.Value} &#8451;</p>`;
    
    weatherInfo.innerHTML = weatherDetails; 
    

    appBody.style.display = "block";
    



};

// getting user input
form.addEventListener('submit', e => {
    // preventing defalut action
    e.preventDefault();

    const city = form.userLocation.value.trim();
    form.reset();

    localStorage.setItem('cityName', city);

    getInfo(city)
        .then(data => {
            updateUi(data);
        })
        .catch(err => console.log(err));


});

// updating prevoius check
if(localStorage.getItem('cityName')) {
    getInfo(localStorage.getItem('cityName'))
    .then(data =>  updateUi(data))
    .catch(err => console.log(err));
}