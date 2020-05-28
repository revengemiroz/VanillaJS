
const cardEl = document.querySelectorAll('.countryCard')


fetch(`https://api.covid19api.com/summary`)
  .then(res => res.json())
  .then(data => {
    console.log(data.Global)

    document.getElementById('title').innerText = "COVID-19 STATISTICS - GLOBAL";

    document.getElementById('total').innerHTML = `<div class="stats">
      <div class="number">${data.Global.TotalConfirmed}</div>
      <div class="factor">Infected</div>
    </div>`;

    document.getElementById('recover').innerHTML = `<div class="stats">
      <div class="number">${data.Global.TotalRecovered}</div>
      <div class="factor">Recovered</div>
    </div>`;

    document.getElementById('sick').innerHTML = `<div class="stats">
      <div class="number">${data.Global.NewConfirmed}</div>
      <div class="factor">Sick</div>
    </div>`;

    document.getElementById('dead').innerHTML = `<div class="stats">
      <div class="number">${data.Global.TotalDeaths}</div>
      <div class="factor">Deaths</div>
    </div>`;

  })



const countryEl = document.querySelector('.flags')

async function country() {
  const res = await fetch(`https://restcountries.eu/rest/v2/all`)
  const data = await res.json()

  data.forEach(country => {

    const flagParentDiv = document.createElement('div')
    flagParentDiv.classList.add('flag')

    const imgNameSpan = document.createElement('div')
    const imgTag = document.createElement('img')
    imgTag.src = 'https://countryflags.io/' + country.alpha2Code + '/flat/48.png'

    flagParentDiv.setAttribute('title', country.name)
    flagParentDiv.setAttribute('data-code', country.alpha2Code)

    flagParentDiv.addEventListener('click', () => {
      const allflags = document.querySelectorAll('.selected')
      console.log(allflags)
      allflags.forEach(flag => {

        flag.classList.remove('selected')
      })
      flagParentDiv.classList.add('selected')

      console.log(country.alpha2Code)
      getCountrydata(country.alpha2Code)
      window.scrollTo(0, 0)
    })

    imgNameSpan.innerText = country.name
    flagParentDiv.appendChild(imgTag)
    flagParentDiv.appendChild(imgNameSpan)

    countryEl.appendChild(flagParentDiv)
    //countryEl.innerHTML += (HTML)



  })

}

async function getCountrydata(code) {
  await fetch(`https://api.thevirustracker.com/free-api?countryTotal=${code}`)
    .then(res => res.json())
    .then(data => {
      console.log(code)
      console.log(data)
      document.getElementById('title').innerHTML = `COVID-19 STATISTICS - ${data.countrydata[0].info.title}`

      // total infected
      document.getElementById('total').innerHTML = `<div class='stats'>
            <div class='number'>${data.countrydata[0].total_cases}</div>
            <div class='factor'>Total Infected</div>
            </div>`

      // total recovered
      document.getElementById('recover').innerHTML = `<div class="stats">
            <div class="number">${data.countrydata[0].total_recovered}</div>
            <div class="factor">Recovered</div>
          </div>`;

      // total sick people
      document.getElementById('sick').innerHTML = `<div class="stats">
            <div class="number">${data.countrydata[0].total_active_cases}</div>
            <div class="factor">Sick</div>
            </div>`;

      // total deaths
      document.getElementById('dead').innerHTML = `<div class="stats">
            <div class="number">${data.countrydata[0].total_deaths}</div>
            <div class="factor">Deaths</div>
            </div>`;

    })
    .catch(err => {
      document.getElementById('title').innerHTML = `No data available for this country`

      document.getElementById('total').innerHTML = `<div class="stats">
      <div class="number">XX</div>
      <div class="factor">Infected</div>
    </div>`;

      document.getElementById('recover').innerHTML = `<div class="stats">
      <div class="number">XX</div>
      <div class="factor">Recovered</div>
    </div>`;

      document.getElementById('sick').innerHTML = `<div class="stats">
      <div class="number">XX</div>
      <div class="factor">Sick</div>
    </div>`;

      document.getElementById('dead').innerHTML = `<div class="stats">
      <div class="number">XX</div>
      <div class="factor">Deaths</div>
    </div>`;
      console.log('Not Infected yet', err);
    })

}


country()

