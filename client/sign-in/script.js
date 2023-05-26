const form = document.getElementById("loginForm");
form.addEventListener('submit', (e) => {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    axios.post('/login', { email, password })
    .then((response) => {
        console.log("tutto apposto")
    })
    .catch((error) => {
        console.log("niente apposto")
    })
})




