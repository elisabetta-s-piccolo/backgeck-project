caricaRecords();

function caricaRecords() {
  axios.get(`http://localhost:5500/findExpireDate?`)
    .then(function (response) {
      const cardData = response.data; // Dati degli utenti

      // Seleziona l'elemento della tabella
      const table = document.getElementById('datediv');

      // Genera il markup della tabella
      let tableHTML = '';

      // Creazione dell'intestazione della tabella
      tableHTML += '<div></div>';

      // Creazione del corpo della tabella
      //tableHTML += '<tbody>';
      //bookData.forEach(function (book) {
       // tableHTML += `<tr><th>${book.isbn}</th><td>${book.titolo}</td><td>${book.cod_autore}</td><td>${book.anno_pubblicazione}</td><td>${book.edizione}</td><td>${book.cod_editore}</td><td>${book.num_copie}</td><td>${book.genere}</td></tr>`;
      //});
      //tableHTML += '</tbody>';

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