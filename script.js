const cards = document.querySelectorAll("#card")

let hasFlippedCard = false;
let lockTable = false;
let firstCard, secondCard;

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

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework
    isMatch?disableCards(): unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click",flipCard);
    secondCard.removeEventListener("click",flipCard);

    resetTable();
}

function resetTable () {
    [hasFlippedCard,lockTable] = [false,false];
    [firstCard,secondCard]=[null,null];
}

function unflipCards() {
    lockTable = true;

    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetTable();

    }, 700)
}

(function shuffle() {
    cards.forEach((card)=> {
        let randomPos=Math.floor(Math.random()*12);
        card.style.order=randomPos;
    })
}) ()