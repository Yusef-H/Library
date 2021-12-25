const booksContainer = document.querySelector(".books-container");

// function Book(title, author, pages, isRead){
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.isRead = isRead;
//     this.info = function(){
//         return title + " by " + author + ", " + pages +
//                " pages, " + isRead;
//     }
// }

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
        console.log(read);
    }

    addBook(title, name, number, read);

    document.querySelector(".title").value = "";
    document.querySelector('.name').value = "";
    document.querySelector('.number').value = "";
    document.getElementById("op1").checked = false;
    document.getElementById("op2").checked = false;

})



function addBook(title, name, number, read){
    let newBook = new Book(title, name, number, read);
    myLibrary.push(newBook);
    updateLibrary();
}

function updateLibrary(){
    myLibrary.forEach((book) => {
        console.log(book);
        let newCard = document.createElement("div");
        newCard.classList = "card";
        let info = document.createElement("h3");
        info.style.borderRadius = "8px";
        info.style.backgroundColor = "transparent";
        info.style.width = "120px";
        
        info.innerHTML =  book.title +"<br> By: <br>"+ book.author
                        + "<br><br> -Pages: " + book.pages + "<br><br> -Status: <br>" + book.isRead;

        newCard.appendChild(info);
        newCard.style.display = "flex";
        newCard.style.flexDirection = "column";

        let removeButton = document.createElement('button');
        removeButton.classList = "remove";
        removeButton.innerHTML = "Remove";
        newCard.appendChild(removeButton);
        removeButton.addEventListener("click", function(){
            booksContainer.removeChild(newCard); 
        })

        let readButton = document.createElement('button');
        readButton.classList = "readBtn";
        readButton.innerHTML = "Change Read Status";
        newCard.appendChild(readButton);
        readButton.addEventListener('click', function(){
            book.readToggle();
            info.innerHTML =  book.title +"<br> By: <br>"+ book.author
                        + "<br><br> -Pages: " + book.pages + "<br><br> -Status: <br>" + book.isRead;
        })


        
        booksContainer.appendChild(newCard);
        myLibrary.pop(book);
        
    })
}