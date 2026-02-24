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
    row.setAttribute("id", deck_id);

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
            <button type="button" class="btn"><img src="../images/edit.png" height="50" title="edit"></button>
            <button type="button" class="btn"><img src="../images/delete.png" height="50" title="delete"></button>
        </div>
    `;

    deckContainer.appendChild(row);
}

function getParentDeckID (element) {
    const classArray = Object.values(element.classList);

    if (classArray.includes("row")) {
        return element.id;

    } else if (element.nodeName === "BODY") {
        console.log("Oops! Wasn't able to find that ID.")
        return null;

    } else {
        return getParentDeckID(element.parentNode);
    }
}

async function getMetadata() {
    const metadata_res = await fetch("http://localhost:3000/metadata");
    if (!metadata_res.ok) throw new Error("Something went wrong while fetching from metadata");
    return metadata_res.json();
}

function updateMetadata(recentID, meta) {
    const newRecents = meta.recentIds;

    if (newRecents.includes(recentID)) {
        idIndex = newRecents.indexOf(recentID);
        newRecents.splice(idIndex, 1);
        newRecents.unshift(recentID)

    } else {
        newRecents.unshift(recentID);
        newRecents.pop();
    }

    newData = {
        recentIds: newRecents,
        currentId: recentID
    };

    return newData;
}

async function putNewMetadata(meta) {
    await fetch("http://localhost:3000/metadata/1", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(meta)
    });
}

//handling user clicking on a deck
const deckContainer = document.querySelector("#js-decks");
deckContainer.addEventListener("click", async (e) => {

    const deckID = getParentDeckID(e.target);
    const metadata = await getMetadata();

    newMetadata = updateMetadata(deckID, metadata[0]);
    putNewMetadata(newMetadata);

    window.location.href = "./deck.html";

})