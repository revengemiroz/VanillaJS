const temp = document.querySelector('.temp')
const country = document.querySelector('.country')
const btnHholder = document.querySelector('.btn-holder')
const btn = document.querySelector('.button-link')
const buttondialspoke = document.querySelector('.button-dial-label')
const weather = document.querySelector('.weather')

btn.addEventListener('click', () => {
    btn.remove()
    const input = document.createElement('INPUT')
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "eg: Singapore or Beijing");
    // input.setAttribute("value", `${country.innerText}`);
    input.setAttribute('onkeydown', 'enter(this)')
    input.classList.add('input-link')
    btnHholder.appendChild(input)
    input.focus()


})

let farenhite = []
temp.addEventListener('click', () => {
    if (temp.innerHTML.includes('C')) {

        temp.innerHTML = `${farenhite[0]} &deg;F`
        temp.style.color = '#ff7a00'
    }
    else {
        temp.style.color = '#067cf8'
        temp.innerHTML = `${toCelcius((farenhite[0]))} &deg;C`
    }


})

function enter(e) {
    if (event.key === 'Enter') {

        buttondialspoke.style.animation = 'a 0.25s ease-in-out infinite'
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

    fetch(darkSkyAPI, { mode: 'cors' })
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            getTime(data.currently.time)

            setIcons(data.currently.icon)
            farenhite.pop()
            console.log(farenhite)
            farenhite.push(data.currently.temperature)
            console.log(farenhite)
            buttondialspoke.style.animation = ''
            weather.innerText = data.currently.summary
            temp.innerHTML = `${toCelcius((data.currently.temperature))} &deg;C`
            console.log('Output: ', data);
        }).catch(err => {
            console.error(err);
            alert('api has made to many request for a free version')
        }
        );

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
    if (country !== '') {

        const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${country}&key=1f35f605f54c48f4a235c8e78421ff31`)
        const data = await res.json()
        const lat = data.results[0].geometry.lat
        const long = data.results[0].geometry.lng
        var geocode = `${lat.toFixed(4)},${long.toFixed(4)}`
        console.log(geocode)
        getWeather(geocode)
    }
    else {
        alert('cant be empty')
    }

}

function setIcons(getIcon) {
    const iconName = document.querySelector('.iconName')
    iconName.innerText = getIcon
    var icons = new Skycons({ "color": "#067cf8" });
    icons.play();

    switch (getIcon) {
        case 'cloudy':
            icons.set("canvas", Skycons.CLOUDY);
            break
        case 'partly-cloudy-day':
            icons.set("canvas", Skycons.PARTLY_CLOUDY_DAY);
            break
        case 'clear-day':
            icons.set("canvas", Skycons.CLEAR_DAY);
            break
        case 'clear-night':
            icons.set("canvas", Skycons.CLEAR_NIGHT);
            break
        case 'partly-cloudy-night':
            icons.set("canvas", Skycons.PARTLY_CLOUDY_NIGHT);
            break
        case 'rain':
            icons.set("canvas", Skycons.RAIN);
            break
        case 'showers-day':
            icons.set("canvas", Skycons.SHOWERS_DAY);
            break
        case 'showers-night':
            icons.set("canvas", Skycons.SHOWERS_NIGHT);
            break
        case 'sleet':
            icons.set("canvas", Skycons.SLEET);
            break
        case 'rain-snow':
            icons.set("canvas", Skycons.RAIN_SNOW);
            break
        case 'rain-snow-showers-day':
            icons.set("canvas", Skycons.RAIN_SNOW_SHOWERS_DAY);
            break
        case 'rain-snow-showers-night':
            icons.set("canvas", Skycons.RAIN_SNOW_SHOWERS_NIGHT);
            break
        case 'snow':
            icons.set("canvas", Skycons.SNOW);
            break
        case 'snow-showers-day':
            icons.set("canvas", Skycons.SNOW_SHOWERS_DAY);
            break
        case 'snow-showers-night':
            icons.set("canvas", Skycons.SNOW_SHOWERS_NIGHT);
            break
        case 'wind':
            icons.set("canvas", Skycons.WIND);
            break
        case 'fog':
            icons.set("canvas", Skycons.FOG);
            break
        case 'thunder':
            icons.set("canvas", Skycons.THUNDER);
            break
        case 'thunder-rain':
            icons.set("canvas", Skycons.THUNDER_RAIN);
            break
        case 'thunder-showers-day':
            icons.set("canvas", Skycons.THUNDER_SHOWERS_DAY);
            break
        case 'thunder-showers-night':
            icons.set("canvas", Skycons.THUNDER_SHOWERS_NIGHT);
            break
        case 'hail':
            icons.set("canvas", Skycons.HAIL);
            break
        default:
            break
    }
}

// setIcons('sleet')
// https://maxdow.github.io/skycons/

// https://codepen.io/travisw/pens/public?cursor=ZD0wJm89MSZwPTEmdj0yNjMyMjExOQ==

// https://codepen.io/jescobedo/pen/ENMQKv