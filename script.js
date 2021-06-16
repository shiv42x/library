let myLibrary = []; 
const newBookBtn = document.getElementById("btn-new-book");
const modal = document.getElementById("div-new-book");
const span = document.getElementsByClassName("close")[0];

// New book button
document.getElementById("form-new-book").onsubmit = function() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    var hasRead = false; // False by default as "no" radio button checked by default
    if (document.querySelector("input[name=\"read\"]:checked").value == "yes") {
        hasRead = true;
    }
    const newBook = new Book(title, author, pages, hasRead);
    myLibrary.push(newBook); // First push so this book object can have a data-index value
    displayBook(newBook);
    modal.style.display = "none";
    return false;
}

newBookBtn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

/* -- TEST CODE
const b1 = new Book("The Hobbit", "J. R. R. Tolkien", 295, true); 
const b2 = new Book("The Hobbit2", "J. R. R. Tolkien", 295, true);
const b3 = new Book("The Hobbit2", "J. R. R. Tolkien", 295, true);
const b4 = new Book("The Hobbit2", "J. R. R. Tolkien", 295, true);
const b5 = new Book("The Hobbit2", "J. R. R. Tolkien", 295, true);

addBookToLibrary(b1);
addBookToLibrary(b2);
addBookToLibrary(b3);
addBookToLibrary(b4);
addBookToLibrary(b5);


myLibrary.forEach(book => displayBook(book));
 -- TEST CODE -- */

function Book(title, author, numPages, read) { 
    this.title = title;
    this.author = author;
    this.numPages = numPages; 
    this.read = read; 
    this.info = function () {
        if (this.read) {
            return this.title + " by " + this.author + ", " + numPages.toString() + " pages, " + "not read yet";
        }
        else { 
            return this.title + " by " + this.author +  ", " + numPages.toString() + " pages, " + " already read";
        }
    }
}

function addBookToLibrary(book) { 
    myLibrary.push(book); 
}

// Toggle whether book object's read value
function toggleRead(book, hasRead) {
    if (book.read) {
        book.read = false;
    }
    else {
        book.read = true; 
    }
}

// Remove book object from array
function deleteBook(id) {
    if (id > -1) {
        myLibrary.splice(id, 1);
    }
}

function displayBook(book) {
    // Create HTML for book card
    const display = document.getElementById("book-display");
    const container = document.createElement("container");
    const bookCard = document.createElement("div");
    const bookTitle = document.createElement("h4");
    const bookAuthor = document.createElement("p");
    const bookPages = document.createElement("p");
    const hasRead = document.createElement("p");
    const id = myLibrary.indexOf(book).toString(); 
    hasRead.id = "read-status-" + id; 
    container.style.textAlign = "center";

    // If cnd for whether read or not
    if (book.read) {
        hasRead.textContent = "You have read this book.";
    }
    else {
        hasRead.textContent = "Unread";
    }

    // Add class card to apply CSS
    bookCard.className = "card";
    
    // Set text content of card
    bookTitle.textContent = "Title: " + book.title;
    bookAuthor.textContent = "Author: " + book.author;
    bookPages.textContent = "Pages: " + book.numPages.toString();

    // Append accordingly
    container.appendChild(bookTitle);
    container.appendChild(bookAuthor);
    container.appendChild(bookPages);
    container.appendChild(hasRead);
    bookCard.appendChild(container);
    display.appendChild(bookCard);


    //Associate each remove icon to its book object's index in myLibrary
    container.innerHTML += "<img src=\"img/delete.png\" class=\"remove-btn\" id=\"img-" + id + "\"></img>";
    container.innerHTML += "<img src=\"img/read.png\" id=\"read-btn-" + id + "\"></img>";
    
    // Add unread or read buttons and event listeners
    document.getElementById("read-btn-" + id).addEventListener("click", () => {
        const readStatus = document.getElementById("read-status-" + id);
        toggleRead(book);
        if (book.read) {
            readStatus.textContent = "You have read this book.";
        }
        else {
            readStatus.textContent = "Unread";
        }
    })

    // Add event listeners to remove icon and call deleteBook func
    const removeIcon = document.getElementById("img-" + id);
    removeIcon.addEventListener("click", () => {
        const card = removeIcon.parentElement.parentElement;
        card.remove();
        deleteBook(parseInt(id));
    })
}