import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const host = 'localhost';
const port = 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

app.use('/styles', express.static(path.join(__dirname, 'includes/styles')));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render('palaute');
});

app.post('/palaute', (req, res) => {
    const { nimi, sahkoposti, palaute } = req.body;

    const uusiPalaute = {
        nimi,
        sahkoposti,
        palaute,
        aika: new Date().toISOString(), 
    };

    const tiedostoPolku = path.join(__dirname, 'data.json');

    
    fs.readFile(tiedostoPolku, 'utf8', (err, data) => {
        let palautteet = [];
        if (!err && data) {
            try {
                palautteet = JSON.parse(data); 
            } catch (parseError) {
                console.error('Virhe JSON käsittelyssä:', parseError);
            }
        }

        palautteet.push(uusiPalaute); 

        fs.writeFile(tiedostoPolku, JSON.stringify(palautteet, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Virhe tallennettaessa palautetta:', writeErr);
                return res.status(500).send('Virhe palautteen tallennuksessa.');
            }

            // Kiitosviesti
            res.send(`Kiitos palautteestasi, ${nimi}! Otamme sinuun tarvittaessa yhteyttä sähköpostitse osoitteeseen ${sahkoposti}.`);
        });
    });
});

// Käynnistä palvelin
app.listen(port, host, () => {
    console.log(`${host}:${port} kuuntelee...`);
});
