//adding service worker for pwa
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

//console.log("js file");

//count = 0;
// count=0 was great, but when i refresh my app, the notes would disappear.
//So, to make it persistent across refreshes, I had to store the count and the notes title,body in local Storage

//Number(), because string is returned by default. (Later we have to do count++ when we add a note, and count-- when we remove a note)
let count = Number(window.localStorage.getItem("count"));
//initially count wont be there in localStorage, so add it
//if(!count) checks if count exists or not.
if (!count) {
  window.localStorage.setItem("count", "0");
}

function removeItem(e) {
  //console.log("X clicked");
  if (e.target.classList.contains("delete")) {
    if (confirm("Are you sure you want to delete the notes")) {
      let li = e.target.parentElement.parentElement;
      let ul = document.getElementById("notes");

      ul.removeChild(li);
    }
  }
  count -= 1;
  window.localStorage.setItem("count", count);

  //to remove the item from localStorage
  //the current element which is being clicked is button
  //e.target = >button
  //.previousElementSiblin =>h2
  //.innerText =>h2 SomeNote ()
  window.localStorage.removeItem(e.target.previousElementSibling.innerText);

  //This code makes "No notes added yet, comment reappear, if we clicked on 'X'Button of the last standing note "
  if (count < 1) {
    document.getElementById("no-notes").className = "";
  }
}

//create a stocker note i.e.an li, with a, button and p to be inserted in ul
function createNote(noteTitle, noteBody) {
  // count += 1;
  let li = document.createElement("li");
  let a = document.createElement("a");
  let h2 = document.createElement("h2");
  let p = document.createElement("p");
  let xButton = document.createElement("Button");

  //now add the content to these elements
  xButton.classList.add("delete");
  let xText = document.createTextNode("X");
  let h2TN = document.createTextNode(noteTitle);
  let pTN = document.createTextNode(noteBody);

  h2.appendChild(h2TN);
  p.appendChild(pTN);
  xButton.appendChild(xText);

  a.appendChild(h2);
  a.appendChild(xButton);
  a.appendChild(p);

  a.setAttribute("href", "#");

  li.appendChild(a);

  document.getElementById("notes").appendChild(li);

  // To vanish the text that says "No notes added yet", as asson as we add the note
  document.getElementById("no-notes").classList.add("hidden");
}

function createNoteFromInput(e) {
  //console.log("linked");
  e.preventDefault();

  // console.log("inside file function");
  let noteTitle = document.getElementById("new-note-title-input").value;
  let noteBody = document.getElementById("new-note-body-input").value;

  //   console.log(noteBody);
  //   console.log(noteTitle);

  document.getElementById("new-note-title-input").value = "";
  document.getElementById("new-note-body-input").value = "";

  //increment the counter when we add a note
  count += 1;
  window.localStorage.setItem("count", count);

  while (window.localStorage.getItem(noteTitle)) {
    noteTitle = noteTitle + " ";
  }

  window.localStorage.setItem(noteTitle, noteBody);

  //   //here we handle the corner case,where if user enters
  //   two stickers which have same noteTitle, then, after prefreshing
  //  the screen, only one of those two cards will be shown, as in localStorage the
  // itemValue gets overwritten.
  // add a hyphen to the title and then create the Note

  createNote(noteTitle, noteBody, noteTitle);
  //console.log("inside file function");
}

//count+1 because, in localstorage, count is also an 'key' and its value is 'value'
//so, it will display a card, with title as count and body as value-of-count
for (let i = 0; i < count + 1; i++) {
  let noteTitle = window.localStorage.key(i);
  let noteBody = window.localStorage.getItem(noteTitle);

  if (noteTitle !== "count" && noteTitle != null)
    createNote(noteTitle, noteBody);
}
//This code below is an eventlistener, which executes when the user inputs a note in 'input' and clicks on submit
//Alternative to this is, you can create a function for button's onclick event.
document
  .getElementById("inputForm")
  .addEventListener("submit", createNoteFromInput, false);

document.getElementById("notes").addEventListener("click", removeItem, false);
