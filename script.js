const btnAddBook = document.querySelector('.btn-add-book');
const modalForm = document.getElementById('modal-container')
const containerCards = document.querySelector('.container-card');
const formInputs = document.querySelector('form');
const bntFormCancel = document.querySelector('.btn-form-cancel')

let myLibrary = [];
let index = 0;

btnAddBook.addEventListener('click', () => {
  modalForm.style.display = 'block';
});

bntFormCancel.addEventListener('click', () => {
  modalForm.style.display = 'none';
})

formInputs.addEventListener('submit', (e) => {
  e.preventDefault();
  newBookEntry();
  clearForm();
  modalForm.style.display = 'none';
})

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.index = null;
}

function clearForm() {
  const title = document.getElementById('book_title');
  const author = document.getElementById('book_author');
  const pages = document.getElementById('book_pages');

  title.value = '';
  author.value = '';
  pages.value = '';
}

function newBookEntry() {
  const title = document.getElementById('book_title').value.toLowerCase();
  const author = document.getElementById('book_author').value.toLowerCase();
  const pages = parseInt(document.getElementById('book_pages').value);
  const read = document.getElementById('book_read').checked

  addToLibrary(title, author, pages, read);
}

function addToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  book.index = index; // Changes the index value from null to the index number
  myLibrary.push(book);
  createCard();
}

function createCard() {
  divIndex = index;
  index++;

  const divCard = document.createElement('div');
  divCard.classList.add('card');
  divCard.setAttribute('data-index', `${divIndex}`)

  containerCards.appendChild(divCard);
  populateCard(divIndex);
}

function populateCard(i) {
  const divCard = document.querySelector(`[data-index="${i}"]`);
  const bookIndex = myLibrary.findIndex(book => book.index == divIndex);
  console.log(bookIndex);

  const pBookTitle = document.createElement('p');
  const pTitle = document.createElement('p');
  const pBookAuthor = document.createElement('p');
  const pAuthor = document.createElement('p');
  const pBookPages = document.createElement('p');
  const pPages = document.createElement('p');
  const bRead = document.createElement('button');
  const bDelete = document.createElement('button');

  pBookTitle.classList.add('book', 'title');
  pBookTitle.textContent = `Book:`;
  pTitle.classList.add('book');
  pTitle.textContent = `${myLibrary[bookIndex].title}`;

  pBookAuthor.classList.add('book', 'author');
  pBookAuthor.textContent = `Author:`;
  pAuthor.classList.add('book');
  pAuthor.textContent = `${myLibrary[bookIndex].author}`;

  pBookPages.classList.add('book', 'pages');
  pBookPages.textContent = `Pages:`;
  pPages.classList.add('book');
  pPages.textContent = `${myLibrary[bookIndex].pages}`;

  if (myLibrary[bookIndex].read) {
    bRead.classList.add('btn', 'read');
    bRead.textContent = `Read`;
  } else {
    bRead.classList.add('btn', 'read', 'active');
    bRead.textContent = `Not Read`;
  }

  bDelete.classList.add('btn', 'delete');
  bDelete.textContent = 'Delete';

  divCard.appendChild(pBookTitle);
  divCard.appendChild(pTitle);
  divCard.appendChild(pBookAuthor);
  divCard.appendChild(pAuthor);
  divCard.appendChild(pBookPages);
  divCard.appendChild(pPages);
  divCard.appendChild(bRead);
  divCard.appendChild(bDelete);

  queryButtons();
}

function queryButtons() {
  btnRead = document.querySelectorAll('.read')
  btnDelete = document.querySelectorAll('.delete')

  btnRead.forEach((button) => {
    button.addEventListener('click', buttonRead);
  })

  btnDelete.forEach((button) => {
    button.addEventListener('click', deleteCard);
  });
}

function buttonRead(event) {
  const button = event.target;
  const buttonIndex = button.parentElement.dataset.index;
  const bookIndex = myLibrary.findIndex(book => book.index == buttonIndex);

  if(myLibrary[bookIndex].read) {
    myLibrary[bookIndex].read = false;
    button.textContent = 'Not Read';
  } else {
    myLibrary[bookIndex].read = true;
    button.textContent = 'Read';
  }

  button.classList.toggle('active');
}

function deleteCard(event) {
  const button = event.target;
  const buttonIndex = button.parentElement.dataset.index;
  const cardIndex = myLibrary.findIndex(book => book.index == buttonIndex);

  if (cardIndex !== -1) {
    myLibrary.splice(cardIndex, 1);
    button.parentElement.remove();
  }
}