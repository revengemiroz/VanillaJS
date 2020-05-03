const allList = document.querySelectorAll('li')
const ul = document.querySelector('ul')
const closeBtn = document.querySelector('.close')
const sidebar = document.querySelector('.sidebar')
const layer1 = document.querySelector('#Layer_1')
const hamburger = document.querySelector('.hamburger')

console.log(allList, ul)

allList.forEach(li => {
    li.addEventListener('click', () => {
        allList.forEach(list => {
            list.classList.remove('active')
        })
        li.classList.add('active')

    })
})

closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('block')
    sidebar.classList.add('close')
})

hamburger.addEventListener('click', () => {
    layer1.classList.add('transform')
    sidebar.style.display = 'block'
    sidebar.classList.add('block')
})



// list.forEach(li => {
//     li.addEventListener('click', () => {
//         li.classList.remove('active')
//     })
// })