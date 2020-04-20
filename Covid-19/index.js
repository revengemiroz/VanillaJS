const countryEl = document.querySelector('.country')
const cardEl = document.querySelectorAll('.countryCard')





async function country() {
    const res = await fetch(`https://restcountries.eu/rest/v2/all`)
    const data = await res.json()

    data.forEach(country => {
        console.log(country.name)
        const flagParentDiv = document.createElement('div')
        flagParentDiv.classList.add('flag')

        const imgNameSpan = document.createElement('div')
        const imgTag = document.createElement('img')
        imgTag.src = 'https://countryflags.io/' + country.alpha2Code + '/flat/48.png'

        flagParentDiv.setAttribute('title', country.name)
        flagParentDiv.setAttribute('data-code', country.alpha2Code)

        flagParentDiv.addEventListener('click', () => { alert('click') })

        imgNameSpan.appendChild(imgTag)
        //countryEl.innerHTML += (HTML)



    })
    console.log(data)

}




country()

