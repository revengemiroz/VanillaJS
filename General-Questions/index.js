const minus = document.querySelectorAll('.minus')
const plus = document.querySelectorAll('.plus')
const icons = document.querySelectorAll('.icons')

plus.forEach(p => {
    p.style.display = 'block'
})

icons.forEach(i => {
    console.log(i)

    i.addEventListener('click', () => {

        const plus = i.querySelector('.plus')
        const minus = i.querySelector('.minus')


        console.log(plus)

        if (plus.style.display == 'block') {
            i.parentNode.style.borderBottom = '1px solid #a0c5e8'
            plus.style.display = 'none'
            minus.style.display = 'block'
            const parent = i.parentElement
            parent.nextElementSibling.style.display = 'block'
        }
        else {
            i.parentNode.style.borderBottom = 'none'

            plus.style.display = 'block'
            minus.style.display = 'none'
            const parent = i.parentElement
            parent.nextElementSibling.style.display = 'none'
        }
    })
})

