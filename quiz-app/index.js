// https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple

const container = document.querySelector('.container')
const score = document.querySelector('.score')
const question = document.querySelector('.question')
const answerContainer = document.querySelector('.answerContainer')
const passbtn = document.querySelector('.pass')

score.innerText = 0
let count = 0
const a = []
let id = 1
let inputno = []

async function getAPI(amount) {
    const all10Question = []
    const res = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=15&difficulty=easy&type=multiple`)
    const data = await res.json()
    const all = data.results
    a.push(all)
    console.log(a[0])
}



function updateUI(data) {
    console.log(data)

    count++
    answerContainer.innerHTML = ''
    const answers = []
    answers.push(...data.incorrect_answers, data.correct_answer)
    console.warn(answers)

    question.innerHTML = `${id}. ${data.question}`


    buttons(answers)
    const allanswers = document.querySelectorAll('.answer')
    console.log(allanswers)

    allanswers.forEach(a => {
        let q = a.textContent


        a.addEventListener('click', () => {
            alert(q)
            checkAnswer(a, data)
        })
    })
    id++

}

passbtn.addEventListener('click', () => {
    if (count < inputno[0]) {
        updateUI(a[0][count])

    }
    else {
        container.innerHTML = `
        <p>All Question are Completed</>
        `
    }
})

const buttons = (a) => {
    console.log(a)
    let b = shuffle(a)
    console.log(b)
    b.forEach((element, idx) => {
        const btn = document.createElement('button')
        btn.classList.add(`answer`)
        btn.dataset.answers = element


        btn.innerHTML = element
        answerContainer.appendChild(btn)

    });
}

function checkAnswer(clickedanswer, data) {

    const button = clickedanswer
    const clickedAnswer = clickedanswer.textContent

    const correctAnswer = document.querySelector('.hiddenAnswer')
    correctAnswer.innerHTML = data.correct_answer

    console.warn(clickedanswer, data.correct_answer, correctAnswer)

    let s = parseFloat(score.textContent)
    console.warn(s)


    if (clickedAnswer == correctAnswer.textContent) {

        score.textContent = s + 1
        scoreColor(parseFloat(score.textContent))
        // button.classList.add('right')

        if (count < inputno[0]) {

            updateUI(a[0][count])

        }
        else {
            container.innerHTML = `
            <p>All question are completed</>
            `
        }

    }
    else {
        score.innerText = (s - 0.25)
        scoreColor(parseFloat(score.textContent))
        button.classList.add('wrong')
        button.disabled = true

    }
}


window.onload = () => {
    question.innerHTML = `
    <div class='amount'>
    <label>Enter the amount of question that you want to answer</label>
    <input type='text' class='input' maxlength='2' onkeydown='enter(this)' placeholder='Enter the amount'></>
    <small>press enter </small>
    <div>
    `

    passbtn.style.display = 'none'

}



function enter(e) {
    if (event.key === 'Enter') {
        if ((e.value > 0 && e.value <= 50)) {

            getAPI(e.value)
            inputno.push(e.value)
            setTimeout(function () {
                updateUI(a[0][count])
                passbtn.style.display = 'block'
            }, 1000);

        }
        else {
            alert(`Invalid format (must be between 1 and 50)`)
        }
    }

}

//stack overflow to randomize an array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function scoreColor(scoretext) {
    return (scoretext < 0) ? (score.style.color = 'red') : (score.style.color = 'green')
}









































// https://codepen.io/bugrakocak/details/WmJjVG\

// https://codepen.io/sanketvaghela/pen/LKLYLq

// https://codepen.io/sumdavran/pen/XwqvOG

// pokmon in react https://pokedb.now.sh/