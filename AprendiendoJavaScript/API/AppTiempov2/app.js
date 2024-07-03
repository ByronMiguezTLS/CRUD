const apiKey = "fdcb5752ab955b647ac2b6a8bf43d7a6";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        switch (data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "./images/clouds.png";
                break;
            case "Rain":
                weatherIcon.src = "./images/rain.png";
                break;
            case "Clear":
                weatherIcon.src = "./images/clear.png";
                break;
            case "Drizzle":
                weatherIcon.src = "./images/drizzle.png";
                break;
            case "Mist":
                weatherIcon.src = "./images/mist.png";
                break;
            case "Snow":
                weatherIcon.src = "./images/snow.png";
                break;
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none"; // Ocultar mensaje de error si hubo uno antes
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.querySelector(".error").style.display = "block"; // Mostrar mensaje de error en caso de fallo en la solicitud
        document.querySelector(".weather").style.display = "none"; // Ocultar sección de clima
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Escuchar el evento submit en el formulario para manejar también el Enter
searchBox.parentElement.addEventListener("submit", () => {
    event.preventDefault(); // Evitar el envío automático del formulario
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", () => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evitar el envío automático del formulario
        checkWeather(searchBox.value);
    }
});