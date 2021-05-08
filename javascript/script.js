
gsap.timeline({repeat: -1})
.to('#whiteSide', {duration: 0.4, y: 50, ease: 'expo'},0)
.to('#redSide', {duration: 0.4, y: -50, ease: 'expo'},0)
.to('#whiteSide', {duration: 0.4, y: 0, ease: 'expo'},0.8)
.to('#redSide', {duration: 0.4, y: 0, ease: 'expo'},0.8)
.to('#pokeball', {rotation: 360, transformOrigin:"50% 50%", ease: "power1", duration: 1},1.4);

gsap.timeline({repeat:-1})
.from(".pokeball__letter", {duration: .24 , opacity: .5, stagger: 0.24})

// const hideLoadingPokeball = () =>{
//     for (const bodyParts of document.querySelector('body').children) {
//         bodyParts.classList.forEach(bodyPartsClass => {
//             if (bodyPartsClass === 'hidden') {
//                 bodyParts.classList.remove('hidden')
//             }
//         })
//     }
//     const LoadingPokeball = document.querySelector('.pokeball-container');
//     LoadingPokeball.classList.add('hidden');
//     pokeballAnimation.pause();
//     loadingTextAnimation.pause();
// }    
// addEventListener('load', hideLoadingPokeball);