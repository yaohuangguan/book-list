class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    const row = document.createElement("tr");
    row.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${book.isbn}</td><td><a href="#" class="delete">X</a></td>`;

    list.appendChild(row);
  }

  showAlert(msg, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentNode.parentNode.remove();
    }
  }
  clearField() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

class Store {
  static getBook() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static displayBook() {
    const books = Store.getBook();
    books.forEach(function(book) {
      const ui = new UI();
      ui.addBookToList(book);
    });
  }
  static addBook(book) {
    const books = Store.getBook();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(isbn, index) {
    const books = Store.getBook();
    books.forEach(function(book) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}
document.addEventListener("DOMContentLoaded", Store.displayBook());

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
    Store.addBook(book);
    ui.showAlert("Success!", "success");
  }

  ui.clearField();

  e.preventDefault();
});

document.getElementById("book-list").addEventListener("click", function(e) {
  e.preventDefault();

  const ui = new UI();
  ui.deleteBook(e.target);
  Store.removeBook(e.target.parentNode.previousElementSibling.textContent);
  ui.showAlert("Deleted!", "success");
});
