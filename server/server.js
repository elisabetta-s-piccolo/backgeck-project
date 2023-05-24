const mysql = require('mysql2');
const express = require('express');

const input = require('readline-sync');

const query = require('./query.json');
const { error } = require('console');

const app = express();

var checkValues = false;
do {
    //fase inserimenti
    const remoteHost = input.question("Inserisci il tuo host del database mysql: ");
    const remoteUser = input.question("Inserisci il tuo username mysql: ");
    const remotePwd = input.question("Inserisci la tua password mysql: ");
    //stampa valori
    console.log("host: " + remoteHost);
    console.log("username: " + remoteUser);
    console.log("password: " + remotePwd);

    var confirm = input.question("Confermi i dati che hai inserito? (si/no) ");
    if (confirm !== 'si' && confirm !== 'no') {
        console.log("Inserisci 'si' o 'no'.");
    }

    if (confirm === 'si') {
        checkValues = true;

        //creazione della connessione a mysql
        const connection = mysql.createConnection({
            host: remoteHost,
            user: remoteUser,
            password: remotePwd
        })
        
        //avvio connessione mysql
        connection.connect((error) => {
            if(error) throw error;
            else console.log("[MYSQL]: Connessione a mysql avvenuta con successo!");
        })

        //selezioniamo il database biblioteca
        connection.query('use ' + query.databaseName + ";", (error) => {
            if(error) throw error;
            else console.log("[MYSQL]: Database selezionato correttamente!");
        })

        //mettiamo in ascolto il nostro server sulla porta 3000
        const port = 3000;
        app.listen(port, () => {
            console.log(`[EXPRESS]: Il server è in ascolto sulla porta ${port}...`);
        })

        //usiamo come content type json
        app.use(express.json());

        app.post('/register', (req, res) => {
            const email = req.body.email;
            const password = req.body.password;
            const nome = req.body.nome;
            const cognome = req.body.cognome;
            const data_nascita = req.body.data_nascita;
            const num_telefono = req.body.num_telefono;
            const residenza = req.body.residenza;
            const ruolo = req.body.ruolo;

            const query = 'insert into utenti (email, password, nome, cognome, data_nascita, num_telefono, residenza, ruolo) values (?,?,?,?,?,?,?,?)';

            connection.query(query, [email, password, nome, cognome, data_nascita, num_telefono, residenza, ruolo], (error) => {
                if(error) {
                    console.err("[MYSQL]: Errore durante l'inserimento dell'utente! " + error);
                    res.status(500).json({ error: 'Errore durante l\'inserimento dell\'utente!'});
                } else {
                    console.log("[MYSQL]: Inserimento utente avvenuto con successo!");
                    res.status(200).json({ message: 'Inserimento utente avvenuto con successo!' });
                }
            });
        });


    }
} while(!checkValues);

