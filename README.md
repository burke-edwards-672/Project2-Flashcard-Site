# Project 2: Fonty's Flashcards

Fonty's Flashcards is a simple way to let users store flashcard sets online! It's still in beta, but will eventually allow for the creation/modification/removal of decks. Note that this is **NOT** a per-user site, so everyone shares the same pool of decks in theory.

Definitely not perfect, I got to try out a handful of features for the first time!
- Fetching data to/from a .json file with json-server
- DOM API
- Adding Javascript functionality to a website
- Project file structure with a public folder
- Bootstrap

## User Guide

The **homepage** is a quick dashboard that links to the main pages. It features a simple bootstrap navbar that takes you everywhere you can reach at the moment. The orange *"jump back in"* section fetches the three most recently-opened card decks, and you can navigate to one by clicking on its respective pop-up. Similarly, the three *"manage your decks"* buttons allow quick access to the decks, the deck creator, and the categories (basically just folders to organize decks).

**Decks** is where you can find every deck currently stored in *db.json*. Clicking on it redirects you to the *"deck"* page. The new/edit/delete buttons aren't yet implemented, but they're pretty self-explanatory. The main thing to note is that *"edit"* would take you to a designated "editing" page.

Once a specific deck is clicked, its contents can be fully viewed on the **deck** page. Right now it just displays the deck's name and description, with two buttons to flip left and right through the cards. Clicking on the card toggles between the *front* (question) and *back* (answer).

Finally, the **upcoming** page is my personal log of features to implement! Nothing really to click on, it's basically a list.

## File Structure

This project's frontend files are all found within the *"public"* folder. Aside from that, it's just json-server and db.json stuff!

**html/** contains all of the HTML for the pages, excluding the homepage which is contained in *"index.html"*.

Similarly, **css/** and **js/** contain all of the CSS and Javascript respectively. Each file shares the same name as the HTML file that uses it. The only exeption so far is *"base.css"*, which is implemented by every HTML file.

**images/** is the most extensive folder here, and is split into five sub-folders:
1. *fonty/* stores the silly faces that Fonty makes, all the exact same width and height.
2. *icons/* is for any non-fonty picture that's usually meant to be clickable. *Edit*, *delete*, and *add* are all icons.
3. *illustrations/* are usually larger and/or more complex, and mostly don't need to be clicked on.
4. *patterns/* stores the repeatable background images used in CSS.
5. *references/* stores the wireframes, as well as any other reference material I may need.

### Wireframes

All of the wireframes made for this project can be found in *public/images/references".

Note that the current version is *very* different from the original wireframes!

### User Stories

1. As a student, I want a place to view flashcards so that I can study for my tests.
2. As a teacher, I want the ability to create new sets of flashcards for my students.
3. As a Fonty fan, I want to see the changes and upcoming features of my dearly-beloved flashcard website.

### Tools Used

- HTML
- CSS
- Bootstrap
- Javascript
- Fetch API (GET and PATCH)
- DOM API
- json.server
- Krita (for images and wireframes)
- git & Github
- Visual Studio Code

## Future Improvements

All of the future plans for the site can be found on the "upcoming" page, denoted by *"Coming Soon"* on the site's navbar.

