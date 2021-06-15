let myLibrary = []; 
const newBookBtn = document.getElementById("btn-new-book");
const modal = document.getElementById("div-new-book");
const span = document.getElementsByClassName("close")[0];
const removeButtons = document.getElementsByClassName("remove-btn");
console.log(removeButtons);

document.getElementById("form-new-book").onsubmit = function() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    var hasRead = false; // False by default as "no" radio button checked by default
    if (document.querySelector("input[name=\"read\"]:checked").value == "yes") {
        hasRead = true;
    }
    const newBook = new Book(title, author, pages, hasRead);
    displayBook(newBook);
    myLibrary.push(newBook);
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

/* -- TESTER START -- */
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
/* -- TESTER END -- */

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

function displayBook(book) {
    // Create HTML for book card
    const display = document.getElementById("book-display");
    const container = document.createElement("container");
    const bookCard = document.createElement("div");
    const bookTitle = document.createElement("h4");
    const bookAuthor = document.createElement("p");
    const bookPages = document.createElement("p");
    const hasRead = document.createElement("p");
    const id = "book-" + myLibrary.indexOf(book).toString(); 
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
    container.innerHTML += "<img src=\"delete.png\" class=\"remove-btn\" id=\"" + id + "\"></img>";
    bookCard.appendChild(container);
    display.appendChild(bookCard);
}