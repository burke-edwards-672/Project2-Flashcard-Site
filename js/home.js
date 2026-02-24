//This is just for the homepage, so it only needs to get the most recently-opened decks.


//Borrowing Frank's DOM-is-loaded checker verbatim.
document.addEventListener("DOMContentLoaded", () => {
    const recentsRow = document.querySelector("#js-recents");

    if (!recentsRow) return;

    init();
})

async function init() {
    const decks = await getDecks();
    const metadata = await getMetadata();

    const recent_ids = metadata[0].recentIds;
    console.log(recent_ids);
    console.log(decks);

    createDecks(decks, recent_ids);
}

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

function createDecks(decks, recent_ids) {

    //Extracting any decks with IDs found in metadata.recent_ids.
    for (let i of decks) {
        if (recent_ids.includes(i.id)) {
            createHTML(i);
        }
    }
}

function createHTML(deck) {
    //Frank's proj2 doesn't need to redefine the parent element here, but I do because it's not global I guess?
    const recentsRow = document.querySelector("#js-recents");
    const column = document.createElement("div");

    const deck_id = deck.id;
    const deck_name = deck.name;

    column.setAttribute("class", "col-sm-4");
    column.setAttribute("id", "recent-deck-" + deck_id);

    column.innerHTML = `
        <div class="card m-2">
            <img src="./images/smile.jpg" >
            <h3 class="card-title my-3">${deck_name}</h3>
        </div>
    `;

    recentsRow.appendChild(column);



}

