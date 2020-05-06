const show = document.querySelector('.show')
const modal = document.querySelector('.modal')
const close = document.querySelector('.close')
const kpop = document.querySelector('.kpop')

show.addEventListener('click', () => {
    modal.style.display = 'block'
    show.style.display = 'none'
    modal.classList.add('show')
    console.warn('click')
    kpop.setAttribute('controls', '')
})

close.addEventListener('click', () => {
    console.warn('close')
    modal.style.display = 'none'
    show.style.display = 'block'
    kpop.pause()
})