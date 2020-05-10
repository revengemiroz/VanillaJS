
const fromcountryCode = document.querySelector('.fromcountryCode')
const tocountryCode = document.querySelector('.tocountryCode')

const dates = document.querySelector('.date')

const fromcountryCodeDatalist = document.querySelector('#fromcountryCode')
const tocountryCodeDatalist = document.querySelector('#tocountryCode')

const tonumber = document.querySelector('.tonumber')
const toText = document.querySelector('.toText')

const fromnumber = document.querySelector('.fromnumber')

const fromAmount = document.querySelector('.fromAmount')
const toAmount = document.querySelector('.toAmount')

const fullName = {
    HKD: 'Honk Kong dollar',
    AED: 'United Arab Emirates Dirham',
    ARS: 'Argentine Peso',
    AUD: 'Australian Dollar',
    BGN: 'Bulgarian Lev',
    BRL: 'Brazilian Real',
    BSD: 'Bahamian Dollar',
    CAD: 'Canadian Dollar',
    CHF: 'Swiss Franc',
    CLP: 'Chilean Peso',
    CNY: 'Chinese Yuan',
    COP: 'Colombian Peso',
    CZK: 'Czech Koruna',
    DKK: 'Danish Krone',

    DOP: 'Dominican Peso',
    EGP: 'Egyptian Pound',
    EUR: 'Euro',
    FJD: 'Fijian Dollar',
    GBP: 'Pound sterling',
    GTQ: 'Guatemalan Quetzal',
    HRK: 'Croatian Kuna',
    HUF: 'Hungarian Forint',
    IDR: 'Indonesian Rupiah',

    ILS: 'Israeli New Shekel',
    INR: 'Indian Rupee',
    ISK: 'Icelandic Króna',
    JPY: 'Japanese Yen',
    KRW: 'South Korean won',
    KZT: 'Kazakhstani Tenge',
    MXN: 'Mexican Peso',
    MYR: 'Malaysian Ringgit',
    NOK: 'Norwegian Krone',

    NZD: 'New Zealand Dollar',
    PAB: 'Panamanian Balboa',
    PEN: 'Sol',
    PHP: 'Philippine peso',
    PKR: 'Pakistani Rupee',
    PLN: 'Poland złoty',
    PYG: 'Paraguayan Guarani',
    RON: 'Romanian Leu',
    RUB: 'Russian Ruble',

    SAR: 'Saudi Riyal',
    SEK: 'Swedish Krona',
    SGD: 'Singapore Dollar',
    THB: 'Thai Baht',
    TRY: 'Turkish lira',
    TWD: 'TWD',
    UAH: 'Ukrainian hryvnia',
    USD: 'United States Dollar',
    UYU: 'Uruguayan Peso',
    ZAR: 'South African Rand'
};


async function get(startingCountry = 'USD', from = 'USD', to = 'CAD') {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${startingCountry}`)
    const data = await res.json()
    const rates = data.rates
    console.log(data)

    timeConverter(data.time_last_updated)

    const country = []
    const currencyRates = []

    for (const [keys, values] of Object.entries(rates)) {

        country.push(keys)
        currencyRates.push(values)
    }

    const index = country.indexOf(to)
    console.warn(index, to, currencyRates[index], country[index])

    toText.innerText = country[index]
    tonumber.innerText = `${currencyRates[index]} ${country[index]}`

    fromnumber.innerText = `1 ${startingCountry}`
    toAmount.value = currencyRates[index]

    for (const [keys, values] of Object.entries(fullName)) {
        if (keys == startingCountry.toUpperCase() && keys == to.toUpperCase()) {
            tonumber.innerText = `${currencyRates[index]} ${values}`
            fromnumber.innerText = `1 ${values}`
        }
        else if (keys == startingCountry.toUpperCase()) {
            fromnumber.innerText = `1 ${values}`
        }

        if (keys == to.toUpperCase()) {
            tonumber.innerText = `${currencyRates[index]} ${values}`
        }
    }
}

fromcountryCode.addEventListener('change', () => {
    console.log(fromcountryCode.value)
    fromAmount.value = 1
    get(fromcountryCode.value, fromcountryCode.value, tocountryCode.value.toUpperCase())
})

tocountryCode.addEventListener('change', () => {
    console.log(fromcountryCode.value)
    get(fromcountryCode.value, fromcountryCode.value, tocountryCode.value.toUpperCase())
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


window.onload = () => {
    for (const [keys] of Object.entries(fullName)) {

        const option = document.createElement('option')
        const option2 = document.createElement('option')

        option.value = keys
        option2.value = keys

        fromcountryCodeDatalist.appendChild(option)
        tocountryCodeDatalist.appendChild(option2)
    }
}


function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return dates.innerText = `${time} - Last Updated`;
}  