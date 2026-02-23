//Very similar to home.js, which is very similar to Frank's menu.js.


//Borrowing Frank's DOM-is-loaded checker verbatim.
document.addEventListener("DOMContentLoaded", () => {
    const recentsRow = document.querySelector("#js-decks");

    if (!recentsRow) return;

    init();
})

async function init() {
    const decks = await getDecks();
    for (deck of decks) {
        createHTML(deck);
    }
}

async function getDecks() {
    const deck_res = await fetch("http://localhost:3000/decks");
    if (!deck_res.ok) throw new Error("Something went wrong while fetching from decks.");
    return deck_res.json();
}

function createHTML(deck) {
    //Frank's proj2 doesn't need to redefine the parent element here, but I do because it's not global I guess?
    const deckContainer = document.querySelector("#js-decks");
    const row = document.createElement("div");

    const deck_id = deck.id;
    const deck_name = deck.name;
    const deck_desc = deck.description;

    row.setAttribute("class", "row deck border");
    row.setAttribute("id", "deck-" + deck_id);

    row.innerHTML = `
        <div class="col-md-4 middle">
            <img src="../images/smile.jpg" class="deck-icon">
        </div>
        <div class="col-md-3 middle">
            <h3>${deck_name}</h3>
        </div>
        <div class="col-md-4 middle">
            <p>${deck_desc}</p>
        </div>
        <div class="col-md-1 p-0 btn-group-vertical" role="group" aria-label="Vertical button group">
            <button type="button" class="btn"><img src="../images/edit.png" height="50"></button>
            <button type="button" class="btn"><img src="../images/delete.png" height="50"></button>
        </div>
    `;

    deckContainer.appendChild(row);



}

