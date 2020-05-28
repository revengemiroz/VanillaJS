const btn = document.getElementById("submitBtn");
const searchBox = document.getElementById("searchBox");
const info_container = document.querySelector(".info-container");
const loaderWrapper = document.querySelector(".col");

loaderWrapper.style.display = `none`


searchBox.value = 'golf'

const key = "5195f9adbfc19c0b025872318a34c54e9db613a1";

const alldata = async () => {
  loaderWrapper.style.display = `block`
  await fetch(`https://emoji-api.com/emojis?&access_key=${key}`)
    .then(res => { return res.json() })
    .then(data => {
      loaderWrapper.style.display = `none`
      data.forEach(element => {
        const innerHtml = `<div class="card text-center bg-secondary mb-3 col-md-3" style="max-width: 18rem; min-height: 20rem; border-width: 5px; border-color: white;">
                          <h1 class="text-center card-header">${element.character}</h1>

                          <div class="card-body">
                             <h5 class="card-title">${element.unicodeName}</h5>
                             <p class="card-text">This emoji belongs to the group of ${element.group}.</p>
                             <p class="card-text">This emoji belongs to the sub-group of ${element.subGroup}.</p>
                         </div>
                        </div>`
        const row = document.createElement('div')
        row.classList.add('row')
        row.innerHTML = innerHtml
        info_container.appendChild(row)

      })
      console.log(data)
    })
    .catch(err => console.log(err))

  const allchildrens = [...info_container.children]
  console.log(allchildrens)

}


function loader(init) {
  loaderWrapper.style.display = `block`
  init


}

loader(alldata())



btn.addEventListener('click', e => {
  e.preventDefault()
  loader(search())



})

const search = () => {
  loaderWrapper.style.display = `block`
  fetch(`https://emoji-api.com/emojis?search=${searchBox.value}&access_key=${key}`)
    .then(res => { return res.json() })
    .then(data => {
      data.forEach(element => {
        loaderWrapper.style.display = `none`
        const innerHtml = `<div class="card text-center bg-secondary mb-3 col-md-3" style="max-width: 18rem; min-height: 20rem; border-width: 5px; border-color: white;">
                        <h1 class="text-center card-header">${element.character}</h1>

                        <div class="card-body">
                           <h5 class="card-title">${element.unicodeName}</h5>
                           <p class="card-text">This emoji belongs to the group of ${element.group}.</p>
                           <p class="card-text">This emoji belongs to the sub-group of ${element.subGroup}.</p>
                       </div>
                      </div>`
        const row = document.createElement('div')
        row.classList.add('row')
        row.innerHTML = innerHtml
        info_container.appendChild(row)

      })
      console.log(data)
    })
    .catch(err => {
      console.log(`${alert('dont have that emoji')}`)
      loaderWrapper.style.display = `none`
    })

  const allchildrens = [...info_container.children]
  clearolddata(info_container, allchildrens)
}


function clearolddata(parent, child) {
  child.forEach(element => {
    parent.removeChild(element)
  })
}