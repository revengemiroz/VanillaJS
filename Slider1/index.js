const slider = document.querySelector('.slider')
const next = document.querySelector('.next')
const prev = document.querySelector('.prev')
const container = document.querySelector('.container')
const imgId = document.querySelector('.imgId')

console.warn(screen.width, screen.height)

const imagePath = ['a.jpg', 'b.jpeg', 'c.jpg', 'd.jpg', 'e.jpg', 'f.jpg', 'g.jpg']
console.warn(imagePath.length)
var newImg = new Image;
newImg.onload = function () {
    slider.src = this.src;
    console.log(`width : ${this.width},height : ${this.height}`)

    dimension(this.width, this.height)
}
newImg.src = `${imagePath[0]}`
imgId.innerText = '1'
let counter = 0;

function dimension(w, h) {
    if (w == 4912 && h == 7360) {
        container.style.width = `${w / 10}px`
        container.style.height = `${h / 10}px`
    }

    else if (w > 4800 && h > 3500) {
        container.style.width = `${w / 5}px`
        container.style.height = `${h / 5}px`
    }

    else if (w < 800 && w < 800) {
        container.style.width = `${w}px`
        container.style.height = `${h}px`
    }

    else if (w > 600 && w < 1200) {
        container.style.width = `${w - 300}px`
        container.style.height = `${h - 300}px`
    }

    else {
        container.style.width = `${w - 600}px`
        container.style.height = `${h - 800}px`
    }
}



function inc(count) {

    if (count < 0) {
        counter = imagePath.length - 1
        imgId.innerText = `${counter + 1}`
    }

    else if (count <= 0 || count > imagePath.length - 1) {
        counter = 0
        newImg.src = `${imagePath[counter]}`
        imgId.innerText = `${counter + 1}`
    }

    else if (count >= 0) {
        newImg.src = `${imagePath[counter]}`
        imgId.innerText = `${counter + 1}`
    }
    else {
        newImg.src = `${imagePath[counter]}`
        imgId.innerText = `${counter + 1}`
    }
}


next.addEventListener('click', () => {
    console.log(counter)
    counter++
    newImg.style.transform = `-50%`
    inc(counter)
})

prev.addEventListener('click', () => {
    counter = counter - 1
    inc(counter)
    console.log(counter)
    newImg.src = `${imagePath[counter]}`
})

