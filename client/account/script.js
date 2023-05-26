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

function logout() {
  // Rimuovi il cookie
  document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Effettua il reindirizzamento alla pagina di accesso o a un'altra pagina appropriata
  window.location.href = "../sign-in/sign-in.html";
}

caricaRecords();

function caricaRecords() {
  axios.get(`http://localhost:5500/findExpireDate?email=${email}`)
    .then(function (response) {
      const result = response.data; // Dati degli utenti

      // Seleziona l'elemento della tabella
      const divDate = document.getElementById('expire-date');

      // Genera il markup della tabella
      let date = `<h2>${result.email}</h2>`;

      // Creazione del corpo della tabella

      // Inserisci il markup della tabella nell'elemento HTML
      divDate.innerHTML = date;

    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
}