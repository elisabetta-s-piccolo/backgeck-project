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

// Importa la libreria Axios (assicurati di averla precedentemente installata tramite npm)
// nel tuo file HTML con <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
// o utilizzando require('axios') se stai lavorando con un bundler come webpack.
// Seleziona il modulo di login dal DOM
const loginForm = document.getElementById('loginForm');

// Aggiungi un gestore di eventi per l'invio del modulo
loginForm.addEventListener('submit', function (event) {
event.preventDefault(); // Impedisce il comportamento predefinito del browser

  // Recupera i valori inseriti dall'utente
  const email = document.getElementById('email').value;
  console.log(email);
  const password = document.getElementById('password').value;
  console.log(password);

  // Crea un oggetto con i dati del login
  const loginData = {
    email: email,
    password: password
  };

  // Invia la richiesta POST al server utilizzando Axios
  axios.post('http://localhost:5500/login', loginData)
    .then(function (response) {
      // Gestisci la risposta del server
      console.log(response.data);

      //creiamo il cookie
      document.cookie = `email=${encodeURIComponent(email)}; path=/`;

      // Effettua il reindirizzamento a una nuova pagina
      window.location.href = "../index.html";
    })
    .catch(function (error) {
      // Gestisci gli errori della richiesta
      console.error(error);
    });
});






