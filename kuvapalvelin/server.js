// Ensin kirjastojen importit
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // Hakee tiedoston polun
const __dirname = path.dirname(__filename); // Hakee hakemiston nimen



// Luodaan express-palvelin instanssi
const app = express();

// Otetaan käyttöön EJS-moottori
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

// Otetaan käyttöön staattiset tiedostot
app.use('/styles', express.static(path.join(__dirname, 'includes/styles')));


// Määritellään vakiot
const port = 3000;
const host = 'localhost';

// Etusivun reitti
app.get('/', (req, res) => {
    const nimi = req.query.nimi || 'vierailija'; // Jos 'nimi' puuttuu, oletusarvo on 'vierailija'
    res.render('index', { nimi }); // Lähetetään 'nimi' EJS:lle
});

// Kissat-reitti EJS-sivupohjalla
app.get('/kissat', (req, res) => {
    const images = [
        { src: '/styles/images/pika.png', alt: 'Pika' },
        { src: '/styles/images/pexels-pixabay-416160.jpg', alt: 'Pixabay cat' }
    ];
    res.render('kissat', { images }); // Lähetetään kuvat EJS-sivupohjalle
});

// Virhesivu
app.use((req, res) => {
    res.status(404).send('Vituiks meni.');
});


// Käynnistetään palvelin
app.listen(port, host, () => console.log(`${host}:${port} kuuntelee...`));
