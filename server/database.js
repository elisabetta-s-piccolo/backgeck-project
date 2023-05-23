/*
    Una volta scaricato il modulo mysql2 scrivendo in terminale 'npm install mysql2',
    richiamarlo in una costante usando la seguente sintassi. Facendo così possiamo utilizzare
    tutti i metodi del modulo.
*/
const mysql = require("mysql2");
// readline-sync serve per scrivere dal terminale
const input = require("readline-sync");

// nel file query.json ci siamo salvati delle variabili a cui abbiamo assegnato le query da eseguire
const query = require("./query.json");

console.log("STIAMO USANDO MYSQL");

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

        // CONNESSIONE AL DATABASE -------------------------------------------------------------------------------------------------------

        // qui creiamo la costante connection che avrà i dati del nostro database
        const connection = mysql.createConnection({
            host: remoteHost,
            user: remoteUser,
            password: remotePwd
        });

        /* 
            qui ci connettiamo al database, lo facciamo tramite un arrow function.
            nella funzione passiamo il parametro error, che quando è true, quindi,
            quando l'errore si verifica ci stampa il messaggio di errore in console
            (throw error).
            alrtimenti, ci stampa in console un messaggio.
        */
        connection.connect((error) => {
            if (error) throw error;
            else console.log("Connessione al database avvenuta con successo!");
        });

        // CREIAMO IL DATABASE -------------------------------------------------------------------------------------------------

        /*
            con il metodo .query eseguiamo le query nel database.
            le query le passiamo all'interno del metodo come scritto sotto.
        */
        connection.query("CREATE DATABASE biblioteca", (error) => {
            if (error) throw error;
            else console.log("[MYSQL]: Creazione del database avvenuta con successo!");
        });

        // CREIAMO LE TABELLE DEL DATABASE -----------------------------------------------------------------------------------

        // creazione tabella utenti
        connection.query(query.queryTableUtenti, (error) => {
            if (error) throw error;
            else console.log("[MYSQL]: Creazione della tabella 'utenti' avvenuta con successo!");
        });

        // creazione tabella tessere
        connection.query(query.queryTableTessere, (error) => {
            if (error) throw error;
            else console.log("[MYSQL]: Creazione della tabella 'tessere' avvenuta con successo!");
        });

        // creazione tabella autori
        connection.query(query.queryTableAutori, (error) => {
            if (error) throw error;
            else console.log("[MYSQL]: Creazione della tabella 'autori' avvenuta con successo!");
        });

        // creazione tabella editori
        connection.query(query.queryTableEditori, (error) => {
            if (error) throw error;
            else console.log("[MYSQL]: Creazione della tabella 'editori' avvenuta con successo!");
        });

        // creazione tabella generi
        connection.query(query.queryTableGeneri, (error) => {
            if (error) throw error;
            else console.log("[MYSQL]: Creazione della tabella 'generi' avvenuta con successo!");
        });

        // creazione tabella libri
        connection.query(query.queryTableLibri, (error) => {
            if (error) throw error;
            else console.log("[MYSQL]: Creazione della tabella 'libri' avvenuta con successo!");
        });

        // creazione tabella prenotazioni
        connection.query(query.queryTablePrenotazioni, (error) => {
            if (error) throw error;
            else console.log("[MYSQL]: Creazione della tabella 'prenotazioni' avvenuta con successo!");
        });

        // CHIUDIAMO LA CONNESSIONE AL DATABASE -----------------------------------------------------------------------------------------

        // con questo metodo chiudiamo la connessione
        connection.end((err) => {
            if (err) throw err;
            else console.log('Connessione al database chiusa!');
        });
    }

} while (!checkValues);




