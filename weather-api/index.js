const temp = document.querySelector('.temp')
const country = document.querySelector('.country')
const btnHholder = document.querySelector('.btn-holder')
const btn = document.querySelector('.button-link')

btn.addEventListener('click', () => {
    btn.remove()
    const input = document.createElement('INPUT')
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Enter Country");
    input.setAttribute("value", `${country.innerText}`);
    input.setAttribute('onkeydown', 'enter(this)')
    input.classList.add('input-link')
    btnHholder.appendChild(input)


})

let farenhite = []
temp.addEventListener('click', () => {
    if (temp.innerHTML.includes('C')) {

        temp.innerHTML = `${farenhite[0]} &deg;F`
    }
    else {

        temp.innerHTML = `${toCelcius((farenhite[0]))} &deg;C`
    }


})

function enter(e) {
    if (event.key === 'Enter') {
        country.innerText = e.value
        toLatLong(e.value)
    }
}

// Get geo-coordinates

window.onload = () => {
    getLocation()

}

function getLocation() {
    fetch('https://ipinfo.io?token=d1b7d18cbb9812')
        .then(res => res.json())
        .then((data) => {
            getWeather(data.loc)
            country.innerText = `${data.city}, ${data.country}`
            // console.log('Output: ', data);
        }).catch(err => console.error(err));
}

function getWeather(weatherdata) {
    const location = weatherdata
    // console.log(weatherdata)    
    var darkSkyAPI = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/c1c79c93374cb0e0b5e2439d84fd12f5/${location}?exclude=minutely,hourly,daily`
    // console.log(darkSkyAPI)
    fetch(darkSkyAPI, { mode: 'cors' })
        .then(res => res.json())
        .then((data) => {
            getTime(data.currently.time)
            farenhite.pop()
            console.log(farenhite)
            farenhite.push(data.currently.temperature)
            console.log(farenhite)
            temp.innerHTML = `${toCelcius((data.currently.temperature))} &deg;C`
            console.log('Output: ', data);
        }).catch(err => console.error(err));

}

function getTime(time) {
    let unix_timestamp = time
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    // var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    // console.log(hours);
    return hours

}

function toCelcius(t) {

    return ((t - 32) * 5 / 9).toFixed(2)
}

async function toLatLong(country) {
    const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${country}&key=1f35f605f54c48f4a235c8e78421ff31`)
    const data = await res.json()
    const lat = data.results[0].geometry.lat
    const long = data.results[0].geometry.lng
    var geocode = `${lat.toFixed(4)},${long.toFixed(4)}`
    console.log(geocode)
    getWeather(geocode)

}

// https://maxdow.github.io/skycons/

// https://codepen.io/travisw/pens/public?cursor=ZD0wJm89MSZwPTEmdj0yNjMyMjExOQ==

// https://codepen.io/jescobedo/pen/ENMQKv