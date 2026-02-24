//Important global stuff up here
const cardContainer = document.querySelector(".flip-card");
const cardList = cardContainer.classList;

const title = document.querySelector("#name");
const desc = document.querySelector("#desc");

const frontH1 = document.querySelector(".flip-card-front").firstElementChild;
const backH1 = document.querySelector(".flip-card-back").firstElementChild;

const leftButton = document.querySelector("#left");
const rightButton = document.querySelector("#right");

const deckInfo = {
    deck: {},
    i: 0,
    length: 0
}

const deck = {}

//---------------------------------------------------------------------

function flipCard() {
    cardList.toggle("flipped");
}

cardContainer.addEventListener("click", flipCard);

//---------------------------------------------------------------------

function seePreviousCard() {
    deckInfo.i--;
    if (deckInfo.i < 0) {
        deckInfo.i = deckInfo.length - 1;
    }

    console.log(deckInfo.i);
    writeCard();
}

function seeNextCard() {
    deckInfo.i++;
    if (deckInfo.i > (deckInfo.length - 1)) {
        deckInfo.i = 0;
    }

    console.log(deckInfo.i);
    writeCard();
}

leftButton.addEventListener("click", seePreviousCard);
rightButton.addEventListener("click", seeNextCard);


//---------------------------------------------------------------------

async function getDecks() {
    const deck_res = await fetch("http://localhost:3000/decks");
    if (!deck_res.ok) throw new Error("Something went wrong while fetching from decks.");
    return deck_res.json();
}

async function getMetadata() {
    const metadata_res = await fetch("http://localhost:3000/metadata");
    if (!metadata_res.ok) throw new Error("Something went wrong while fetching from metadata");
    return metadata_res.json();
}

async function getCurrentDeck() {
    const deckArray = await getDecks();
    const metadata = await getMetadata();

    const currentId = metadata[0].currentId;

    const current = deckArray.filter((value) => {return (value.id === currentId)});
    return current[0];
}

function writeHeadings() {
    const deck = deckInfo.deck;

    title.innerHTML = deck.name;
    desc.innerHTML = deck.description;
}

function writeCard() {
    const deck = deckInfo.deck;
    const card = deck.questions[deckInfo.i]

    frontH1.innerHTML = card.front;
    backH1.innerHTML = card.back;
}

async function init() {
    deckInfo.deck = await getCurrentDeck();
    deckInfo.length = deckInfo.deck.questions.length;

    writeHeadings();
    writeCard();
}

init();