const booksContainer = document.querySelector(".books-container");

/**
 * Book Class
 */
class Book{
    constructor(title, author, pages, isRead){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }

    info(){
        return title + " by " + author + ", " + pages +
                       " pages, " + isRead;
    }
}

/**
 * Creating the Library array and adding two examples
 */
let myLibrary = [];
let example1 = new Book("The Hobbit", "J.R.R. Tolkien" , 310, "Not Read Yet");
myLibrary.push(example1);
updateLibrary();
let example2 = new Book("This House is Haunted","John Boyne",333,"Already Read");
myLibrary.push(example2);
updateLibrary();


Book.prototype.readToggle = function(){
    if(this.isRead == "Already Read"){
        this.isRead = "Not Read Yet";
    }
    else{
        this.isRead = "Already Read";
    }
}

/**
 * Creating the modal for adding new book.
 */
const openModalButtons = document.querySelectorAll('[data-modal-target]'); // Can be used For Multiple modals
const closeModalButtons = document.querySelectorAll('[data-exit-button]');
const overlay = document.getElementById("overlay");
openModalButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        const modal = document.querySelector(".modal");
        console.log(modal);
        openModal(modal);
    })
})
closeModalButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        const modal = document.querySelector('.modal');
        console.log(modal);
        closeModal(modal);
    })
})
function openModal(modal){
    if(modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
}
function closeModal(modal){
    if(modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

/**
 * Handles all the steps from when the book gets submitted. 
 * Adds the book to the library, resets the saved information and updates
 * the library.
 */
const submit = document.querySelector('.submit');
submit.addEventListener('click', function(title, name, number, read){
    title = document.querySelector(".title").value;
    name = document.querySelector('.name').value;
    number = document.querySelector('.number').value;
    if(document.getElementById("op1").checked){
        read = document.getElementById("op1").value;
    }
    else{
        read = document.getElementById("op2").value;
    }

    addBook(title, name, number, read);
    clearBookInfo();
    updateLibrary();

})
/**
 * Clears book information after submitting it and 
 * adding it to the Library
 */
function clearBookInfo(){
    document.querySelector(".title").value = "";
    document.querySelector('.name').value = "";
    document.querySelector('.number').value = "";
    document.getElementById("op1").checked = false;
    document.getElementById("op2").checked = false;
}


/**
 * Adds a new book to the Library.
 */
function addBook(title, name, number, read){
    let newBook = new Book(title, name, number, read);
    myLibrary.push(newBook);
}


/**
 * Updates the library
 */
function updateLibrary(){
    myLibrary.forEach((book) => {

        let newBook = document.createElement("div");
        newBook.classList = "book";
        let info = document.createElement("h3");
        info.classList.add('book-info');
        
        info.innerHTML =  book.title +"<br> By: <br>"+ book.author
                        + "<br><br> -Pages: " + book.pages + "<br><br> -Status: <br>" + book.isRead;

        newBook.appendChild(info);
        

        let removeButton = document.createElement('button');
        removeButton.classList = "remove";
        removeButton.innerHTML = "Remove";
        newBook.appendChild(removeButton);
        removeButton.addEventListener("click", function(){
            booksContainer.removeChild(newBook); 
        })

        let readButton = document.createElement('button');
        readButton.classList = "readBtn";
        readButton.innerHTML = "Change Read Status";
        newBook.appendChild(readButton);
        readButton.addEventListener('click', function(){
            book.readToggle();
            info.innerHTML =  book.title +"<br> By: <br>"+ book.author
                        + "<br><br> -Pages: " + book.pages + "<br><br> -Status: <br>" + book.isRead;
        })

        booksContainer.appendChild(newBook);
        myLibrary.pop(book);
        
    })
}