const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

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
    Object.entries(book).forEach(([key, value]) => {
      let td = document.createElement("td");
      if (key === "read") {
        td.textContent = value ? "Yes" : "No";
      } else {
        td.textContent = value;
      }
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  form.reset();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  addBookToLibrary();
});

for (let i = 0; i < myLibrary.length; i++) {
  console.log(myLibrary[i]);
}
