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
    modal.style.animation = 'show 0.5s ease-in'
})

close.addEventListener('click', () => {
    console.warn('close')
    modal.style.animation = 'exits 0.5s ease-in'

    setTimeout(function () {
        modal.style.display = 'none'
        show.style.display = 'block'
    }, 500);
    kpop.pause()
})


