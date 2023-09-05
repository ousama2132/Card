// select elements with class card and restart
const cards = document.querySelectorAll("#card");
const restarts = document.querySelector("#restart");

// initialize variables to track the game state
let hasFlippedCard = false;
let lockTable = false;
let firstCard, secondCard;

cards.forEach((card) => card.addEventListener("click",flipCard));

// Function to handle card flipping when clicked
function flipCard() {
    if (lockTable) return ;
    if (this === firstCard) return;

    this.classList.add("flip");

    if (!hasFlippedCard) {
        hasFlippedCard =true;
        firstCard = this;
        return;
    }
    secondCard=this;
    checkForMatch();
}

// function to check if two flipped cards match
function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch?disableCards(): unflipCards();
}

// disable matched cards
function disableCards() {
    firstCard.removeEventListener("click",flipCard);
    secondCard.removeEventListener("click",flipCard);

    resetTable();
}

// unflip unmatched cards
function unflipCards() {
    lockTable = true;

    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetTable();

    }, 700);
}

// reset game state
function resetTable () {
    [hasFlippedCard,lockTable] = [false,false];
    [firstCard,secondCard]=[null,null];
}

// shuffle cards
(function shuffle() {
    cards.forEach((card)=> {
        let randomPos=Math.floor(Math.random()*12);
        card.style.order=randomPos;
    });
}) ();

// screen handling
var splashScreen = document.querySelector('.splash');
splashScreen.addEventListener('click',()=>{
  splashScreen.style.opacity = 0;
  setTimeout(()=>{
    splashScreen.classList.add('hidden');
  },610);
});

restart.addEventListener("click", restartMemory);

// restart memory 
function restartMemory() {
    cards.forEach(card => {
        card.classList.remove("flip");
        card.addEventListener("click", flipCard); 
    });
    (function shuffle() {
        cards.forEach((card)=> {
            let randomPos=Math.floor(Math.random()*12);
            card.style.order=randomPos;
        });
    }) ();
}