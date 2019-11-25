//Book
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI

function UI() {}
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById("book-list");
  const row = document.createElement("tr");
  row.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${book.isbn}</td><td><a href="#" class="delete">X</a></td>`;

  list.appendChild(row);
};

UI.prototype.clearField = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};
UI.prototype.showAlert = function(msg, className) {
  const div = document.createElement("div");
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(msg));
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");
  container.insertBefore(div, form);

  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
};
UI.prototype.deleteBook = function(target) {
  if (target.className === "delete") {
    target.parentNode.parentNode.remove();
  }
};

//Event

document.getElementById("book-form").addEventListener("submit", function(e) {
  const title = document.querySelector("#title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);

  const ui = new UI();

  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill all fields", "error");
  } else {
    ui.addBookToList(book);
    ui.showAlert("Success!", "success");
  }

  ui.clearField();

  e.preventDefault();
});

document.getElementById("book-list").addEventListener("click", function(e) {
  e.preventDefault();

  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert("Deleted!", "success");
});
