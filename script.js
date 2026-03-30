const openMetroUrl = 'https://api.open-meteo.com/v1/forecast?';
const pokeURL = "https://pokeapi.co/api/v2/pokemon/";
const backgroundButton = document.getElementById("bckg-button");


const editdash = document.getElementById("editDash");
const savedName = localStorage.getItem("dashboardName");
if (savedName) {
  editdash.textContent = savedName;
}
editdash.addEventListener("input", () => {
  localStorage.setItem("dashboardName", editdash.textContent);
});

//notes in textarea
const Enotes = document.getElementById("notes");
Enotes.value = localStorage.getItem("note") || "";
Enotes.addEventListener("input", ()=> {
localStorage.setItem("note", Enotes.value)
})

//codes to determine the weather forecast
function getWeatherCode(code){
  if (code == 0) return {text: 'Clear', icon:'🔆'};
  if (code == 1 || code == 2 || code == 3) return {text: 'Cloudy', icon:'☁️'};
  if (code == 45 || code == 48) return {text: 'Foggy', icon:'🌫️'};
  if (code >= 51 && code <= 67) return {text: 'Rainy', icon:'🌧️'};
  if ((code >= 71 && code <= 77) || (code == 85 || code == 86)) {
  return {text: 'Snowy', icon:'🌨️'};
  }
  if (code >= 95) return {text:'Lightning', icon:'🌩️'};

  return{text:'temp'};
}

//all purpose apifetch
async function apifetch(url){
  const response = await fetch(url);

  try{
    if(!response.ok){
      throw new Error("Couldnt not fetch image:" +response.statusText);
    }
    const data = await response.json();
    console.log(data)

    return data;
  } catch(error){
    throw new error("ApiFetch not work LAWL: "+error)
  }
}

//gets my location if accepted
function Geo(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(getWeather, showError);
  }
  else
  {
    console.error("Geolocation is not supported by this browser."); 
  }
}

Geo();

//error thrown if i block geolocation
function showError(error) {
  console.warn(`Location error: ${error.message}`);
  document.getElementById("weather-container").innerHTML = "<p>Nekad platsåtkomst.</p>";
}

//takes the geolocation and then throws it in the apikey
async function getWeather(pos) {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;

  const url = `${openMetroUrl}latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max&forecast_days=3&timezone=auto`
  const weatherContainer = document.getElementById("weather");

  try{
    const data = await apifetch(url)

    const daily = data.daily;

    let forecast = `<div class="forecast-row">`
    for(let i = 0; i < 3; i++){

      const temp = daily.temperature_2m_max[i];
      const weatherCode = daily.weather_code[i];

      const weather = getWeatherCode(weatherCode)


      let days = "";
      if(i == 0){
        days = "Today";
      }
      else if (i == 1){
        days = "Tomorrow";
      }
      else{
        const date = new Date(daily.time[i]);
        days = date.toLocaleDateString("en-EN", {weekday:"short"});

        days = days.charAt(0).toUpperCase() + days.slice(1);
      }

        forecast += `
        <div class="forecast-card">
          <span class="forecast-day"><strong>${days}</strong></span>
          <span class="forecast-icon">${weather.icon}</span>
          <span class="forecast-temp"> ${temp}°C</span>
          <span class="forecast-desc">${weather.text}</span>
        </div>`;
    }
    
        forecast += `</div>`;
        weatherContainer.innerHTML = forecast;

  } catch(error){
    console.error("error", error);
    weatherContainer.innerHTML = `<p>couldnt load weather</p>`
  };
}

const timeElement = document.getElementById("nav");

function timeAndDate() {
const realTime = new Date();

  const clock = Intl.DateTimeFormat("sv-SE",{
    hour: "2-digit",
    minute: "2-digit",
  }
  ).format(realTime);

  const currentdate = new Intl.DateTimeFormat("sv-SE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(realTime);

    timeElement.innerHTML = (` 
    <p><strong>
      ${clock} 
    </strong></p>
    <p> ${currentdate}</p>`
  );

}

setInterval(timeAndDate ,1000);

timeAndDate();

document.getElementById("editDash").contentEditable = true;

//Gets pokemon 
async function getPokemon(){
  let rndPokemon = Math.floor(Math.random() * 151) +1;
  
  //fetches pokemon from pokeAPI
  url = `${pokeURL}/${rndPokemon}`
  const container = document.getElementById("Pokemon");

  try{
    const response = await apifetch(url);
    console.log(response);
    const sprites = response.sprites.front_default;
    const pokeName = response.name;

    container.innerHTML= `
    <div class="poke-info">
      <img src="${sprites}" alt="${pokeName}">
      <h3>Pokemon: ${pokeName}</h3>
      <h3>PokeDex ID:${rndPokemon}</h3>
    </div>
    `
  }catch(error){
  console.error(error)
  console.log(rndPokemon)
  container.innerHTML = `<p> couldnt find the Pokemon </p>`;
  } 
}

getPokemon();


async function getBackground(){
 try{
  url = `https://api.unsplash.com/photos/random?client_id=8J-qzUidiQtaRCNuiXLHdkBR-EMusz6Yj-bGQ4dCpMk`
  const response = await apifetch(url);
  
  const imageUrl = response.urls.regular;
  
  document.body.style.backgroundImage = `url('${imageUrl}')`;

 }catch(error){
  console.error("couldnt fetch background" + error)
 }
}

backgroundButton.addEventListener("click", getBackground);
