//This is just for the homepage, so it only needs to get the most recently-opened decks.
const recentsRow = document.querySelector("#js-recents");
metaGlobal = {}

init();

async function init() {
    const decks = await getDecks();
    const metadata = await getMetadata();
    metaGlobal.metadata = metadata[0];

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

    column.innerHTML = `
        <div id=${deck_id} class="card m-2">
            <img src="./images/smile.jpg" >
            <h3 class="card-title my-3">${deck_name}</h3>
        </div>
    `;

    recentsRow.appendChild(column);
}

//---------------------------------------------------------------------------------------

function getParentDeckID (element) {
    const classArray = Object.values(element.classList);

    if (classArray.includes("card")) {
        return element.id;

    } else if (element.nodeName === "BODY") {
        console.log("Oops! Wasn't able to find that ID.")
        return null;

    } else {
        return getParentDeckID(element.parentNode);
    }
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

recentsRow.addEventListener("click", async (e) => {

    const deckID = getParentDeckID(e.target);

    if (deckID) {
        const newMetadata = updateMetadata(deckID, metaGlobal.metadata);
        putNewMetadata(newMetadata);

        window.location.href = "../html/deck.html";
    }
});

//---------------------------------------------------------------------------------

document.querySelector("#all-decks").addEventListener("click", () => {
    window.location.href = "./html/decks.html";
});

document.querySelector("#new-deck").addEventListener("click", () => {
    window.alert("Sorry! That feature hasn't been added yet.");
});

document.querySelector("#all-categories").addEventListener("click", () => {
    window.alert("Sorry! That feature hasn't been added yet.");
});
