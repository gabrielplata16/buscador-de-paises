// Este es el input
const searchInput = document.querySelector('#search');
// Aca es en donde va a ir todo el contenido
const container = document.querySelector('.container');
const container2 = document.querySelector('.container2')

const body = document.querySelector('.main');
const loader = document.querySelector('.loader');
const formContainer = document.querySelector('.form-container');
const title = document.querySelector('.title');

// Los paises descargados desde la api se guardan en el array de countries
// La api deberia pedirse solo una vez
// Usar este array para crear el filtrado
let countries = [];

// Funcion que pide todos los paises
const getCountries = async () => {
  try {
    
    const resp = await fetch('https://restcountries.com/v3.1/all',)
    if (resp){
      // Faltaba el await, se pone porque el json es una promesa
      countries = await resp.json()
    }
  } catch (error) {
    console.error(error.message)
  }

}
getCountries();

const getWeather = async (lat,lon) => {
  try {
    const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5a300823206e3e8acc111289782b8189`)
    if (resp){
      // Faltaba el await, se pone porque el json es una promesa
      i = await resp.json()
      return i

    }
  } catch (error) {
    console.error(error.message)
  }
}

searchInput.addEventListener('input', async e => { 
  
  container.innerHTML=[];
  
  container2.innerHTML=[];
  container.innerHTML = `<div class="loader"></div>`;
  
  const filtered = countries.filter(country => {
    return country.name.common
      .toLowerCase()
      .startsWith(searchInput.value.toLowerCase())
  });

  if (filtered.length < 11 && searchInput != '' && filtered.length !=1) {
    container.innerHTML='';
    container2.classList.remove('with-padding')
    // Mostrar los paises
    for (const country of filtered) {
      
      const div = document.createElement('div');
      div.classList.add('country-first-info')
      div.innerHTML =  `
      <div class="div-flags">
      <img src="${country.flags.svg}" alt="" width="120" height="80" class='flags'>
      </div>
      <p class="countries-name">${country.name.common}</p>`
      container.append(div)
    }

    console.log(filtered);
  } else if( filtered.length >=11) {
    container2.classList.remove('with-padding')
    container.innerHTML = `
    <h1 class='message-text' >Hay muchos paises porfavor se mas especifico</h1>`
  }else if (filtered.length === 1){
    const pDePais = filtered[0]; 
    const div = document.createElement('div')
    div.classList.add('one-country-info')
    const weatherInfo =await getWeather(pDePais.latlng[0],pDePais.latlng[1])
    console.log(weatherInfo);
    container2.innerHTML= `

    <div class='div-flags-1'>
    <img src="${pDePais.flags.svg}" alt="" class='flags-1'>
    </div>
    
    
    <div class='one-country-h2'>
    <h1 class="nombre-pais">${pDePais.name.common}</h1>
    <h2>Capital: ${pDePais.capital}</h2>
    <h2>Poblacion: ${pDePais.population.toLocaleString()}</h2>
    <h2>Continente: ${pDePais.region}</h2>
    <h2>Huso Horario: ${pDePais.timezones}</h2>
    <h2>Subcontinente: ${pDePais.subregion}</h2>
    <h2>Temperatura: ${weatherInfo.main.temp} </h2>

    <div class='weather-n-icon'>
    <h2>Clima: ${weatherInfo.weather[0].main}</h2>
    <img src= 'https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png' alt="" class='weather-icon'>
    </div>
    
    
    </div>`
    container2.classList.add('with-padding');
    container.innerHTML='';
  }
  

});

// <h2>Temperature: ${weather.main.temp} </h2>
// https://openweathermap.org/img/wn/10d2x.png
// https://openweathermap.org/img/wn/10d@2x.png

// 5a300823206e3e8acc111289782b8189

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=5a300823206e3e8acc111289782b8189


