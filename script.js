let myLibrary = []; 
const newBookBtn = document.getElementById("btn-new-book");

newBookBtn.addEventListener("click", () => {
    alert("you clicked!");
})

/* -- TESTER START -- */

const theHobbit = new Book("The Hobbit", "J. R. R. Tolkien", 295, true); 
const theHobbit2 = new Book("The Hobbit2", "J. R. R. Tolkien", 295, true);

addBookToLibrary(theHobbit);
addBookToLibrary(theHobbit2);
addBookToLibrary(theHobbit2);
addBookToLibrary(theHobbit2);
addBookToLibrary(theHobbit2);

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

function addBook() {
    
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
    container.style.textAlign = "center";
    
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
    bookCard.appendChild(container);
    display.appendChild(bookCard);
}