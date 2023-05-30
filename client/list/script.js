const cookies = document.cookie.split(';');
let email = '';
for (let i = 0; i < cookies.length; i++) {
  const cookie = cookies[i].trim();
  if (cookie.startsWith('email=')) {
    email = decodeURIComponent(cookie.substring('email='.length));
    break;
  }
}
console.log(email); 

if(email) {
  const btnAccedi = document.getElementById("sign-in");
  const btnRegistrati = document.getElementById("sign-up");
  const btnAccount = document.getElementById("account");
  btnAccedi.classList.add("hide");
  btnRegistrati.classList.add("hide");
  btnAccount.classList.remove("hide");
}

var next = document.getElementById("next").addEventListener("click", nextPage);
var previous = document.getElementById("previous").addEventListener("click", previousPage);
var page = 1;

caricaRecords(page);

function ricercaPerFiltri() {
  //TODO
} 


function caricaRecords(page) {
  axios.get(`http://localhost:5500/bookList?page=${page}`)
    .then(function (response) {
      const bookData = response.data; // Dati degli utenti

      // Seleziona l'elemento della tabella
      const table = document.getElementById('bookTable');

      // Genera il markup della tabella
      let tableHTML = '';

      // Creazione dell'intestazione della tabella
      tableHTML += '<thead><tr><th>ISBN</th><th>TITOLO</th><th>CODICE AUTORE</th><th>ANNO DI PUBBLICAZIONE</th><th>EDIZIONE</th><th>CODICE EDITORE</th><th>COPIE</th><th>GENERE</th></tr></thead>';

      // Creazione del corpo della tabella
      tableHTML += '<tbody>';
      bookData.forEach(function (book) {
        tableHTML += `<tr><th>${book.isbn}</th><td>${book.titolo}</td><td>${book.cod_autore}</td><td>${book.anno_pubblicazione}</td><td>${book.edizione}</td><td>${book.cod_editore}</td><td>${book.num_copie}</td><td>${book.genere}</td></tr>`;
      });
      tableHTML += '</tbody>';

      // Inserisci il markup della tabella nell'elemento HTML
      table.innerHTML = tableHTML;

    })
    .catch(function (error) {
      console.log(error);
    });
}

function previousPage() {
  if (page > 1) {
    page--;
    caricaRecords(page);
  }
}

function nextPage() {
  page++;
  caricaRecords(page);
}

function trovaIsbn() {
  axios.get(`http://localhost:5500/findIsbn?isbn=${search}`)
    .then(function (response) {
      const bookData = response.data; // Dati degli utenti

      // Seleziona l'elemento della tabella
      const table = document.getElementById('bookTable');

      // Genera il markup della tabella
      let tableHTML = '';

      // Creazione dell'intestazione della tabella
      tableHTML += '<thead><tr><th>TITOLO</th><th>ISBN</th></thead>';

      // Creazione del corpo della tabella
      tableHTML += '<tbody>';
      bookData.forEach(function (book) {
        tableHTML += `<tr><td>${book.titolo}</td><td>${book.isbn}</td></tr>`;
      });
      tableHTML += '</tbody>';

      // Inserisci il markup della tabella nell'elemento HTML
      table.innerHTML = tableHTML;

    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
}