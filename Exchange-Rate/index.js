
const fromcountryCode = document.querySelector('.fromcountryCode')
const tocountryCode = document.querySelector('.tocountryCode')

const fromcountryCodeDatalist = document.querySelector('#fromcountryCode')
const tocountryCodeDatalist = document.querySelector('#tocountryCode')

const tonumber = document.querySelector('.tonumber')
const toText = document.querySelector('.toText')

const fromnumber = document.querySelector('.fromnumber')

const fromAmount = document.querySelector('.fromAmount')
const toAmount = document.querySelector('.toAmount')

async function get(startingCountry = 'USD', from = 'USD', to = 'CAD') {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${startingCountry}`)
    const data = await res.json()
    const rates = data.rates
    console.log(data)

    const country = []
    const currencyRates = []

    for (const [keys, values] of Object.entries(rates)) {

        country.push(keys)
        currencyRates.push(values)
        // console.log(country, currencyRates)
        const option = document.createElement('option')
        const option2 = document.createElement('option')
        option.value = keys
        option2.value = keys
        fromcountryCodeDatalist.appendChild(option)
        tocountryCodeDatalist.appendChild(option2)
    }

    const index = country.indexOf(to)
    console.warn(index, to, currencyRates[index], country[index])

    toText.innerText = country[index]
    tonumber.innerText = `${currencyRates[index]} ${country[index]}`

    fromnumber.innerText = `1 ${startingCountry}`
    toAmount.value = currencyRates[index]
}

fromcountryCode.addEventListener('change', () => {
    console.log(fromcountryCode.value)
    get(fromcountryCode.value, fromcountryCode.value, tocountryCode.value)
})

tocountryCode.addEventListener('change', () => {
    console.log(fromcountryCode.value)
    get(fromcountryCode.value, fromcountryCode.value, tocountryCode.value)
})

const inputHandler1 = function (e) {
    // console.log(e.target.value)
    if (e.target.value == '' || e.target.value == 0) {
        e.target.value = 1
    }

    toAmount.value = parseInt(e.target.value) * parseFloat(tonumber.textContent)

}

const inputHandler2 = function (e) {
    console.log(e.target.value)
    if (e.target.value == '' || e.target.value == 0) {
        e.target.value = 1
    }

}

fromAmount.addEventListener('input', inputHandler1)
toAmount.addEventListener('input', inputHandler2)
get()


// country.push(Object.keys(rates))
    // currencyRates.push(Object.values(rates))
    // console.log(currencyRates)

    // for (let i = 0; i < country[0].length; i++) {
    //     const option = document.createElement('option')
    //     const option2 = document.createElement('option')
    //     option.value = country[0][i + 1]
    //     option2.value = country[0][i + 1]
    //     // fromcountryCode.value = 'USD'
    //     fromcountryCodeDatalist.appendChild(option)
    //     tocountryCodeDatalist.appendChild(option2)
    // }

    // const to = tocountryCode.value
    // const from = fromcountryCode.value

    // console.log(a.includes(to, 1))

    // console.warn(from, to, a)
    // toAmount.value = currencyRates[0][index]