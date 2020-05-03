let count = document.querySelector('.count')
const reset = document.querySelector('.reset')
const decrease = document.querySelector('.decrease')
const increaseBtn = document.querySelector('.increase')

increaseBtn.addEventListener('click', () => {
    let number = parseInt(count.innerText)
    count.innerText = number + 1
    checkColor(count.innerText)

})

decrease.addEventListener('click', () => {
    let decreasenumber = parseInt(count.innerText)
    count.innerText = decreasenumber - 1
    checkColor(count.innerText)
})

reset.addEventListener('click', () => {
    count.innerText = parseInt(0)
    checkColor(count.innerText)
})

window.onload = () => {
    count.innerText = 0
}

function checkColor(value) {
    value == 0 ? (count.style.color = '#222222') : (value >= 1 ? (count.style.color = 'green') : count.style.color = 'red')
}