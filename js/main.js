const weatherApp = {
  API_KEY: "8068b5f9aca9a66872eaa2fa1fc5f183",
  isLoading: false,

  selector: document.querySelector(".weather"),
  insertData: function (el, inform) {
    this.selector.querySelector(el).innerText = inform;
  },
  fetchWeather: function (city) {
    this.isLoading = true;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.API_KEY}&lang=ua&units=metric`
    )
      .then((result) => result.json())
      .then((data) => this.renderWeather(data))
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
  renderWeather: function (info) {
    this.insertData(".city_name", info.name);
    this.insertData(".summary", "Today: " + info.weather[0].description);
    this.insertData(".temp", Math.round(info.main.temp) + " °C");
    this.insertData(".humidity", "Humidity: " + info.main.humidity + " %");
    this.insertData(".wind", "Wind speed: " + info.wind.speed + " km/h");
    this.insertData(
      ".feels-like",
      "Feels: " + Math.round(info.main.feels_like) + " °C"
    );
    this.selector
      .querySelector(".icon")
      .setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`
      );
    this.selector
      .querySelector(".icon")
      .setAttribute("alt", info.weather[0].main);
  },
};
document.forms[0].addEventListener("submit", function () {
  event.preventDefault();
  weatherApp.fetchWeather(document.forms[0].elements.city.value);
});

document
  .querySelector(".material-symbols-outlined")
  .addEventListener("click", function () {
    document.querySelector(".weather").classList.add("--open");
  });
