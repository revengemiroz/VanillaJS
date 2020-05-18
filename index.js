const open = document.getElementById('open');
const close = document.getElementById('close');
const modal = document.getElementById('modal_container');
const video = document.querySelector('.video')


close.addEventListener('click', () => {

    console.log('close')
    video.innerHTML = `<video class="video" width="320" height="240">
    <source
        src="Jack-Black.mp4"
        type="video/mp4">
    <source src="movie.ogg" type="video/ogg">
    Your browser does not support the video tag.
</video>`
    modal.classList.remove('show');
});

//close modal when clicked outside the the modal
document.onclick = (e) => {
    if (e.target.classList.contains('modal-container')) {
        video.innerHTML = `<video class="video" width="320" height="240">
        <source
            src="Jack-Black.mp4"
            type="video/mp4">
        <source src="movie.ogg" type="video/ogg">
        Your browser does not support the video tag.
    </video>`
        modal.classList.remove('show');
    }
}

//close modal when clicked escape button
document.onkeydown = (e) => {
    if (e.key == 'Escape') {
        console.log('close')
        video.innerHTML = `<video class="video" width="320" height="240">
            <source
                src="Jack-Black.mp4"
                type="video/mp4">
            <source src="movie.ogg" type="video/ogg">
            Your browser does not support the video tag.
        </video>`
        modal.classList.remove('show');

    }
}

const projects = [
    {
        name: 'Covid-19',
        github: 'https://github.com/revengemiroz/VanillaJS/tree/master/Covid-19'

    },
    {
        name: 'Background-Picker',
        github: 'https://github.com/revengemiroz/VanillaJS/tree/master/Background-Picker'

    },
    {
        name: 'Counter',
        github: 'https://github.com/revengemiroz/VanillaJS/tree/master/Counter'

    },
    {
        name: 'Sidebar',
        github: 'https://github.com/revengemiroz/VanillaJS/tree/master/Sidebar'

    },
    {
        name: 'Clash-Of-Clans',
        github: 'https://github.com/revengemiroz/VanillaJS/tree/master/Clash-Of-Clans'

    },
    {
        name: 'Modal',
        github: 'https://github.com/revengemiroz/VanillaJS/tree/master/Modal'

    },
    {
        name: 'Exchange-Rate',
        github: 'https://github.com/revengemiroz/VanillaJS/tree/master/Exchange-Rate'

    },
    {
        name: 'Nepali-Calendar',
        github: 'https://github.com/revengemiroz/VanillaJS/tree/master/Nepali-Calendar'
    },
    {
        name: 'Slider',
        github: 'https://github.com/revengemiroz/VanillaJS/tree/master/Slider'

    },
    {
        name: 'Todo-List',
        github: 'https://github.com/revengemiroz/VanillaJS/tree/master/Todo-List'

    }

]

const containerEl = document.querySelector('.container')


const display = (p) => {
    p.forEach((project, index) => {
        const boxEl = document.createElement('li')
        boxEl.classList.add('box')

        const CardHtml = `
         
            <div class="c-subscribe-box u-align-center">
                    <div class="rainbow"><span></span><span></span></div>
                    <div class="c-subscribe-box__wrapper">
                            <a href="/${project.name}/index.html">
                                <img src='/${project.name}/design/desktop-preview.jpg'></img> 
                            </a>
                        <h3 class="c-subscribe-box__title">${index + 1}.  ${formatNames(project.name)}</h3>

                                                    
                    </div>
                    <div class="links">
                                    <ul>
                                    <li><a href="">
                                        <i class="fab fa-facebook-f"></i>
                                        </a></li>

                                    <li><a href=${project.github}>
                                        <i class="fab fa-github"></i>
                                        </a></li>

                                    <li><a href="">
                                        <i class="fab fa-instagram"></i>
                                        </a></li>
                                    </ul>
                                </div>
            </div>
            
          `

        boxEl.innerHTML = CardHtml
        containerEl.appendChild(boxEl)
    })
}


const formatNames = (n) => {
    return n.split('-').map(word => word[0].toUpperCase() + word.slice(1))
        .join(' ')

}



display(projects)
var pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'x', 'x', 'x'];
var current = 0;

var keyHandler = function (event) {

    // If the key isn't in the pattern, or isn't the current key in the pattern, reset
    if (pattern.indexOf(event.key) < 0 || event.key !== pattern[current]) {
        current = 0;
        return;
    }

    // Update how much of the pattern is complete
    current++;

    // If complete, alert and reset
    if (pattern.length === current) {
        current = 0;
        containerEl.innerHTML = ''
        const arr = []
        arr.push(...projects, {
            name: 'Slider1',
            github: 'https://github.com/revengemiroz/VanillaJS/tree/master/Slider1'

        })
        console.warn(arr)
        display(arr)
        //     modal.classList.add('show');

        //     video.innerHTML = `<video autoplay class="video" width="320" height="240" loop>
        //     <source
        //         src="Jack-Black.mp4"
        //         type="video/mp4">
        //     <source src="movie.ogg" type="video/ogg">
        //     Your browser does not support the video tag.
        // </video>`
    }


};

// Listen for keydown events
document.addEventListener('keydown', keyHandler, false);



// <div class='imageScale'>

// <a href="/${project.name}/index.html">
// <img src='/${project.name}/design/desktop-preview.jpg'></img>            </a>

// </div>
// <p class='title'>${index + 1}.  ${formatNames(project.name)}<p>

// <div class='socials'>
// <a href='https://www.instagram.com/mirozuzamaki/?hl=en'> 
// <i class='fab fa-instagram fa-3x'></i>

// </a>

// <a href=${project.github}> 
// <i class='fab fa-github fa-3x'></i>

// </a>

// </div>








//output https://epic-sinoussi-268bd1.netlify.com/
