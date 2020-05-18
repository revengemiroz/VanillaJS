
// console.log(`%c` + localStorage.getItem('todoList'),
//     'background: #f49ac2;       border-radius:20px;     padding:0.5em;     color:white');
//  check localstorage for empty or not if nonempty retrive it if non existant create two arrays to store them
var data = (localStorage.getItem('todoListv1')) ? JSON.parse(localStorage.getItem('todoListv1')) : {
    todo: [],
    completed: []
}



const removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
const completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

const inputEl = document.getElementById('item')
const addEl = document.getElementById('add')

addEl.addEventListener('click', () => {
    checkEmpty()
})

inputEl.addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
        checkEmpty()
        inputEl.value = ''
    }

})

const checkEmpty = () => {
    if (inputEl.value == '') {
        return ConsoleLOG('error', 'cannot be empty', 'input field')
    }
    else {
        //check if the value already exist in the local storage or not
        if (data.todo.indexOf(inputEl.value) > -1) {
            //if exist throw error
            ConsoleLOG('error', 'data already exist', 'todo')
        }
        else {
            //add to local storage
            addItem(inputEl.value)
        }
    }
}

render()

const addItem = (getinput) => {
    //push the data into the todo array
    createElements(getinput)
    data.todo.push(getinput)
    //now push to localstorage it reqrites the local storage everytime
    addTolocalStorage()

    console.log(data.todo)
}


const addTolocalStorage = () => {
    //add two arrays to local storage 'todoListv1'
    localStorage.setItem('todoListv1', JSON.stringify(data))
}


function createElements(text, completed) {

    var list = (completed) ? document.getElementById('completed') : document.getElementById('todo')

    var item = document.createElement('li')
    item.classList.add('li')
    item.draggable = true
    item.innerText = text

    var div = document.createElement('div')
    div.classList.add('buttons')


    var remove = document.createElement('button')
    remove.classList.add('remove')
    remove.innerHTML = removeSVG

    var complete = document.createElement('button')
    complete.classList.add('complete')
    complete.innerHTML = completeSVG

    div.appendChild(remove)
    div.appendChild(complete)

    item.appendChild(div)

    complete.addEventListener('click', completedItem)

    remove.addEventListener('click', removeItem)
    list.insertBefore(item, list.childNodes[0])

    Drag()
}

function completedItem() {

    var item = this.parentNode.parentNode
    console.log(item)
    var parent = item.parentNode
    var id = parent.id
    var value = item.innerText

    if (id == 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1)
        data.completed.push(value)
    }
    else {
        data.completed.splice(data.completed.indexOf(value), 1)
        data.todo.push(value)
    }
    var color = document.querySelector('.todo')
    color.style.color = 'red'
    addTolocalStorage()

    var target = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo')
    parent.removeChild(item)
    target.insertBefore(item, target.childNodes[0])
}

function removeItem() {
    var item = this.parentNode.parentNode
    var parent = item.parentNode
    var id = parent.id
    var value = item.innerText

    if (id == 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1)
    }
    else {
        data.completed.splice(data.completed.indexOf(value), 1)
    }
    addTolocalStorage()
    parent.removeChild(item)
}


function render() {
    if (!data.todo.length && !data.completed.length) {
        return
    }

    for (let i = 0; i < data.todo.length; i++) {
        var value = data.todo[i]
        createElements(value)
    }

    for (let j = 0; j < data.completed.length; j++) {
        var value = data.completed[j]
        createElements(value, true)
    }

}


function Drag() {
    const draggables = document.querySelectorAll('li')
    const containers = document.querySelectorAll('ul')

    draggables.forEach(dragable => {
        dragable.addEventListener('dragstart', () => {
            dragable.classList.add('dragging')
        })

        dragable.addEventListener('dragend', () => {
            dragable.classList.remove('dragging')
        })
    });

    containers.forEach(container => {
        container.addEventListener('dragover', e => {
            e.preventDefault()
            const afterElement = getDragAfterElement(container, e.clientY)
            const draggable = document.querySelector('.dragging')
            if (afterElement == null) {
                container.appendChild(draggable)
            } else {
                container.insertBefore(draggable, afterElement)
            }
        })
    })

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect()
            const offset = y - box.top - box.height / 2
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child }
            } else {
                return closest
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element
    }



}



function ConsoleLOG(status, message, location) {
    if (status == 'success') {
        console.log(`%c` + `${message} at ${location}`,
            'background: #00a86b;       border-radius:20px;     padding:0.5em;      color:white');
    }
    else {
        console.log(`%c` + `${message} at ${location}`,
            'background: #d21f3c;       border-radius:20px;     padding:0.5em;      color:white');
    }
}

