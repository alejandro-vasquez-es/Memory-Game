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
        if (bodyParts.classList.contains('home')) {
            if (!bodyParts.classList.contains('game')) {
                bodyParts.classList.remove('hidden');
            }
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

// SHOW EASY/MEDIUM/HARD SECTION

const game = document.querySelector('#game');
const easy = document.querySelector('#easyGame')
const medium = document.querySelector('#mediumGame');
const hard = document.querySelector('#hardGame');

// Timer
let seconds = 0;
let minutes = 0;
let TextStopWatch = '';
let stopWatchInterval;

const startGame = (section) =>{
    game.classList.remove('hidden')
    section.classList.remove('hidden')
    
    // Faults
    
    
    // Timer
    const stopWatch = document.getElementById('stopWatch');
    stopWatchInterval =setInterval(()=>{
        seconds++
        if (seconds === 60) {
            seconds = 0
            minutes++
        }
        if (minutes === 0) {
            TextStopWatch = `time: ${seconds}s`;
        }else{
            TextStopWatch = `time: ${minutes}min ${seconds}s`;
        }
        stopWatch.textContent= TextStopWatch;
    },1000)
}
// GETTING EASY/MEDIUM/HARD CARD


const getPokemon = async id =>{
    const url= `https://pokeapi.co/api/v2/pokemon/${id}/`
    const res  = await fetch(url);
    return pokemon = await res.json();
}

const capitalizePokemonName = (name) =>{
    const firstLetterePokemon = name.charAt(0).toUpperCase();
    const remainPokemon = name.slice(1);
    return firstLetterePokemon + remainPokemon;
}

const getColorByType = (type) =>{
    switch (type) {
        case 'bug':
        return ['rgb(116,', 159,',', 63, ')']    
        case 'normal':
        return ['rgb(164,', 172,',', 175, ')']    
        case 'fighting':
        return ['rgb(213,', 103,',', 35, ')']    
        case 'flying':
        return ['rgb(61,', 199,',', 239, ')']    
        case 'poison':
        return ['rgb(185,', 127,',', 201, ')']    
        case 'ground':
        return ['rgb(171,', 152,',', 66, ')']    
        case 'rock':
        return ['rgb(163,', 140,',', 33, ')']    
        case 'ghost':
        return ['rgb(123,', 98,',', 163, ')']    
        case 'fire':
        return ['rgb(253,', 125,',', 36, ')']    
        case 'water':
        return ['rgb(69,', 146,',', 196, ')']    
        case 'grass':
        return ['rgb(155,', 204,',', 80, ')']    
        case 'electric':
        return ['rgb(238,', 213,',', 53, ')']    
        case 'psychic':
        return ['rgb(243,', 102,',', 185, ')']    
        case 'ice':
        return ['rgb(114,', 202,',', 233, ')']    
        case 'dragon':
        return ['rgb(83,', 164,',', 207, ')']
        default:
        return ['rgb(164,', 172,',', 175, ')']
    }
}

const winGame = (currentDifficulty) =>{
    clearInterval(stopWatchInterval)
    let totalScore = 0;
    switch (currentDifficulty) {
        case 'easy':
            totalScore = 50000 - 5000*numberOfFaults - ((seconds + minutes*60)-12)*200;
        break;
        case 'medium':
            totalScore = 150000 - 5000*numberOfFaults - ((seconds + minutes*60)-45)*600;
        break;
        default:
            totalScore = 300000 - 5000*numberOfFaults - ((seconds + minutes*60)-100)*1200;
        break;
    }

    if (Math.sign(totalScore) === -1) {
        totalScore = 0;
    }
    
    setTimeout(()=>{
        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message');
        successMessage.innerHTML = `
        <div id='success'>
            <h3 class=''>You won the game :)</h3>
            <i class="fas fa-check-circle"></i>
        </div>
        `;
        game.append(successMessage);
        gsap.to('#success', {duration: 1, opacity: 0.9})
    },600);

    


}

// Flip cards
let firstCardFlipped;
let CurrentCardFlipped;
let nameOfTheCurrentFlippedPokemon = '';
let nameOfTheFirstFlippedPokemon = '';

// faults
let numberOfFaults = 0;
let faultsText = document.getElementById('fault');
let flippingCard = false
let successfulCards = 0;
const flipCard = (e) =>{
    if (!flippingCard) {
        let difficultyFlipCard = 0;
        switch (e.currentTarget.dataset.difficulty) {
            case 'easy':
            difficultyFlipCard = 4;
            break;
            case 'medium':
            difficultyFlipCard = 8;
            break;
            default:
            difficultyFlipCard = 18;
            break;
        }
        e.currentTarget.style.transform = 'rotateY(180deg)';
        CurrentCardFlipped = e.currentTarget;
        nameOfTheCurrentFlippedPokemon = e.currentTarget.children[1].children[0].children[0].alt;
        if (!firstCardFlipped) {
            firstCardFlipped = e.currentTarget;
            nameOfTheFirstFlippedPokemon = nameOfTheCurrentFlippedPokemon;
        }else{
            if (CurrentCardFlipped.dataset.id !== firstCardFlipped.dataset.id) {
                if(nameOfTheCurrentFlippedPokemon === nameOfTheFirstFlippedPokemon){
                    successfulCards++
                    firstCardFlipped.removeEventListener('click', flipCard);
                    CurrentCardFlipped.removeEventListener('click', flipCard);
                    firstCardFlipped = undefined;
                    if (successfulCards === difficultyFlipCard) {
                        winGame(e.currentTarget.dataset.difficulty);
                    }
                }else{
                    flippingCard = true;
                    setTimeout(()=>{
                        firstCardFlipped.style.transform = "rotateY(0deg)";
                        CurrentCardFlipped.style.transform = "rotateY(0deg)";
                        firstCardFlipped = undefined;
                        flippingCard = false
                    },750);
                    
                    numberOfFaults++;
                    faultsText.innerHTML = `faults: ${numberOfFaults}`;
                }
            }
        }
    }
}

const addEventListenerCards = (fragment) =>{
    for (const card of fragment.children) {
        card.children[0].addEventListener('click', flipCard);
    }
} 

const createCardPokemon = async (pokemonNumbers, difficulty, cardContainerClass, cardClass, cardBackClass, cardFrontClass, imageContainerClass, textContainerClass, svgContainerClass) =>{
    const fragment = document.createDocumentFragment();
    const pokemonIds = [];
    let numberOfCardsAdded = 0;
    let id =0;;
    while (pokemonNumbers !== numberOfCardsAdded) {
        let randomNumber = Math.floor(Math.random() * (152 - 1) + 1);
        const pokemon = await getPokemon(randomNumber)
        while (!pokemonIds.includes(pokemon.id)) {
            numberOfCardsAdded++;
            pokemonIds.push(pokemon.id);
            for (let j = 1; j <= 2; j++) {
                id++
                // Create card back
                let cardBack = document.createElement('div');
                let cardBackParagraph1 = document.createElement('p');
                let cardBackParagraph2 = document.createElement('p');
                let cardBackImg = document.createElement('img');
                cardBackImg.src = "src/img/pokeball.svg";
                cardBackParagraph1.textContent = "Pokemon";
                cardBackParagraph2.textContent = "Pokemon";
                cardBack.classList.add(cardBackClass)
                cardBack.appendChild(cardBackParagraph1);
                cardBack.appendChild(cardBackImg);
                cardBack.appendChild(cardBackParagraph2);
                
                //create divs
                const cardContainer = document.createElement('div');
                cardContainer.style.order =  Math.floor(Math.random() * (pokemonNumbers*2 - 1) + 1);
                cardContainer.classList.add(cardContainerClass);
                const card = document.createElement('div');
                card.classList.add(cardClass);
                card.dataset.id = id;
                card.dataset.difficulty = difficulty.id.replace("Game", "");;
                const cardFront = document.createElement('div');
                cardFront.style.backgroundColor = getColorByType(pokemon.types[0].type.name).join('');
                cardFront.classList.add(cardFrontClass);
                
                // text
                const textContainer = document.createElement('div');
                textContainer.classList.add(textContainerClass);
                const textPokemon= document.createElement('h3');
                textPokemon.textContent = `${pokemon.id}. ${capitalizePokemonName(pokemon.name)}`
                textContainer.append(textPokemon)
                
                // image
                const imagePokemon = document.createElement('img');
                const imageContainer = document.createElement('div');
                imageContainer.classList.add(imageContainerClass);
                imagePokemon.src = pokemon.sprites.other["official-artwork"].front_default;
                imagePokemon.setAttribute('alt',`${capitalizePokemonName(pokemon.name)}`)
                imageContainer.append(imagePokemon);
                
                // SVG
                const svgContainer = document.createElement('div');
                svgContainer.innerHTML =
                `<svg viewBox="0 0 57 71" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5001 0H57L57.0003 71C51.5 40.5 21 38 8.50013 38C-3.99973 38 -1.49997 11.5 17.5001 0Z" fill ="${getColorByType(pokemon.types[0].type.name)[0] + (getColorByType(pokemon.types[0].type.name)[1]+15) + getColorByType(pokemon.types[0].type.name)[2] + (getColorByType(pokemon.types[0].type.name)[3] + 15) +getColorByType(pokemon.types[0].type.name)[4]}"/>
                </svg>`;
                svgContainer.classList.add(svgContainerClass);
                
                cardFront.append(imageContainer);
                cardFront.append(svgContainer)
                cardFront.append(textContainer);
                card.append(cardBack);
                card.append(cardFront);
                cardContainer.append(card);
                fragment.append(cardContainer);
            }
        }
    }
    
    
    addEventListenerCards(fragment);
    hideLoadingPokeball();
    difficulty.append(fragment);
    startGame(difficulty)
}

const getEasyCards = () =>{
    createCardPokemon(4, easy, 'card-easy__container', 'card-easy', 'card-easy__back', 'card-easy__front', 'card-easy__image-container', 'card-easy__title', 'card-easy__shadow');
}


const getMediumCards = () =>{
    createCardPokemon(8, medium, 'card-container', 'card', 'card__back', 'card__front', 'card-front__image-container', 'card-front__title', 'card-front__shadow');
}

const getHardCards = () =>{
    createCardPokemon(18, hard, 'card-hard__container', 'card-hard', 'card-hard__back', 'card-hard__front', 'card-hard__image-container', 'card-hard__title', 'card-hard__shadow');
}

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
            getEasyCards();
            break;
            case 'medium':
            getMediumCards();                
            break;
            case 'hard':
            getHardCards();
            break;
        }
    }
}

for (const playButton of playButtons) {
    playButton.addEventListener('click', hideDifficulty);
}