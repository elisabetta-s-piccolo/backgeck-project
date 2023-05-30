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

// funzione che fa la chiamata della registrazione
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    //recuperiamo i dati
    const nome = document.getElementById("nome").value;
    const cognome = document.getElementById("cognome").value;
    const dataDiNascita = document.getElementById("data").value;
    const residenza = document.getElementById("residenza").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    //impacchettiamo i dati
    const data = {
        nome: nome,
        cognome: cognome,
        dataDiNascita: dataDiNascita,
        residenza: residenza,
        email: email,
        password: password
    }

    //mandiamo la richiesta.
    axios.post('http://localhost:5500/register', data)
    .then(function(response) {
        console.log(response.data);
        document.cookie = `email=${encodeURIComponent(email)}; path=/`;
        window.location.href = "../index.html";
    })
    .catch(function(error) {
        console.log(error);
    })
});