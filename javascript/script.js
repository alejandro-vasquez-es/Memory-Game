

// // // POKEBALL

const pokeballAnimation = gsap.timeline({repeat: -1}) // Creating the pokeball animation with GSAP
.to('#whiteSide', {duration: 0.4, y: 50, ease: 'expo'},0)
.to('#redSide', {duration: 0.4, y: -50, ease: 'expo'},0)
.to('#whiteSide', {duration: 0.4, y: 0, ease: 'expo'},0.8)
.to('#redSide', {duration: 0.4, y: 0, ease: 'expo'},0.8)
.to('#pokeball', {rotation: 360, transformOrigin:"50% 50%", ease: "power1", duration: 1},1.4);

const loadingTextAnimation = gsap.timeline({repeat:-1}) // Creating the text loading animation with GSAP
.from(".pokeball__letter", {duration: .24 , opacity: .7, stagger: 0.24})

const LoadingPokeball = document.querySelector('.pokeball-container');
const hideLoadingPokeball = () =>{ // Function to hide de loading pokeball when 
    for (const bodyParts of document.querySelector('body').children) {
        if (bodyParts.classList.contains('hidden')) {
            bodyParts.classList.remove('hidden')
        }
    }
    LoadingPokeball.classList.add('hidden');
    pokeballAnimation.pause();
    loadingTextAnimation.pause();
}    
addEventListener('load', hideLoadingPokeball);

// // // HOME

const playNowButton = document.getElementById('playNowButton');
const homeContent = document.getElementById('hideHome');
const difficulty = document.getElementById('difficulty')
const hideHomeContent = () =>{
    homeContent.classList.add('hidden');
    difficulty.classList.remove('hidden')
}
playNowButton.addEventListener('click', hideHomeContent)



// // // DIFFICULTY

const difficultyCards = document.querySelectorAll('.difficulty__card');

for (const difficultyCard of difficultyCards) {
    difficultyCard.addEventListener('click', function(){
        if (!this.classList.contains('difficulty__selected')) {
            for (const difficultyCard of difficultyCards) {
                difficultyCard.classList.remove('difficulty__selected');
            }
            this.classList.add('difficulty__selected');
        }
    })
}

const playButtons = document.querySelectorAll('.difficulty__button');
const home = document.querySelector('#home');

const hideDifficulty = (e) =>{
    let cardClicked = e.currentTarget.parentNode.parentNode;
    if (cardClicked.classList.contains('difficulty__selected')) {
        difficulty.classList.add('hidden');
        LoadingPokeball.classList.remove('hidden');
        pokeballAnimation.play();
        loadingTextAnimation.play();
        home.classList.add('hidden')
        switch (cardClicked.id) {
            case 'easy':
                console.log(cardClicked.id);
                break;
            case 'medium':
                console.log(cardClicked.id);
                break;
            case 'hard':
                console.log(cardClicked.id);
                break;
        }
    }
}

for (const playButton of playButtons) {
    playButton.addEventListener('click', hideDifficulty);
}