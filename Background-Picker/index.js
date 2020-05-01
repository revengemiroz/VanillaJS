const randomColor = document.querySelector('.randomColor')
const colorCode = document.querySelector('.colorCode')
const body = document.body
const nav = document.querySelector('.nav')
const convert = document.querySelector('.convert')

const latestColor = []
const goodColors = ['#696969',
    '#e1b382',
    '#2d545e',
    '#12343b',
    '#7d3cff',
    '#fceed1',
    '#7c677f',
    '#9bc400',
    '#478559',
    '#161748',
    '#39a0ca',
    '#f95d9b',
    '#FF5733',
    '#FFA07A',
    '#ffb6c1',
    '#f08080',
    '#c39797',
    '#468499',
    '#0e2f44',
    '#6897bb',
    '#990000',
    '#CB4335 ',
    '#f6546a',
    '#51d0de',
    '#4f5f76',
    '#DCC7AA',
    '#F7882F',
    '#6B7A8F',
    '#F7C331',
    '#09868b',
    '#3d7c47',]

console.warn(goodColors.length)

window.onload = () => {
    getRandom()
    hex()
}

function getRandom() {
    const length = goodColors.length
    const min = Math.ceil(0);
    const max = Math.floor(length);
    console.warn(Math.floor(Math.random() * (max - min)) + min)
    return Math.floor(Math.random() * (max - min)) + min;

}

randomColor.addEventListener('click', () => {
    hex()

})


function hex() {
    const color = goodColors[getRandom()].toLowerCase()
    latestColor.pop()
    latestColor.push(color)
    console.warn(latestColor)
    colorCode.innerText = color
    colorCode.style.color = color
    nav.style.color = color
    body.style.backgroundColor = color
    convert.style.border = `2px solid ${color}`
    convert.style.color = color
}

convert.addEventListener('click', () => {
    toggle()

})

function toggle() {
    //rgb to hex button
    const text = convert.innerText

    if (text == 'To RGB') {
        convert.innerText = 'To HEX'
        const hexRgb = hexToRgb(latestColor[0])
        console.log(hexRgb)
        colorCode.innerText = `rgb (${hexRgb})`
    }
    else {
        convert.innerText = 'To RGB'

        colorCode.innerText = latestColor
    }
}

const hexToRgb = hex =>
    hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
        , (m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map(x => parseInt(x, 16))

