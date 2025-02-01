const myLibrary = [];

function Book(title, author, pages, read) {
  this.bookId = `book${++Book.id}`;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
Book.id = 0;

const newBook = document.querySelector("#new-book");
const form = document.getElementById("book-form");
form.style.display = "none";

newBook.addEventListener("click", function () {
  form.style.display = "block";
});

function addBookToLibrary() {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const isRead = document.querySelector("#read").checked;

  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);

  //Show the  array
  console.log("Books: ", myLibrary);

  let table = document.querySelector("#library-table");
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  myLibrary.forEach((book) => {
    let tr = document.createElement("tr");
    tr.classList.add(book.bookId);

    Object.entries(book).forEach(([key, value]) => {
      if (key !== "bookId") {
        let td = document.createElement("td");

        if (key === "read") {
          let readButton = document.createElement("button");
          readButton.textContent = value ? "Readed" : "Unread";

          readButton.addEventListener("click", function () {
            book.read = !book.read;
            this.textContent = book.read ? "Readed" : "Unread";
          });

          td.appendChild(readButton);
        } else {
          td.textContent = value;
        }
        tr.appendChild(td);
      }
    });

    table.appendChild(tr);
    const removeButton = document.createElement("button");
    tr.appendChild(removeButton);
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", removeBook);
  });
  form.reset();
  form.style.display = "none";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  addBookToLibrary();
});

for (let i = 0; i < myLibrary.length; i++) {
  console.log(myLibrary[i]);
}

function removeBook() {
  const bookId = this.parentElement.classList[0];
  const findBook = myLibrary.findIndex((element) => element.bookId === bookId);
  myLibrary.splice(findBook, 1);
  this.parentElement.remove();
}
