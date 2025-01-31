import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

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
    const { nimi, sahkoposti } = req.body; 
    res.send(`Kiitos palautteestasi, ${nimi}! Otamme sinuun tarvittaessa yhteyttä sähköpostitse osoitteeseen ${sahkoposti}.`);
});


app.listen(port, host, () => {
    console.log(`${host}:${port} kuuntelee...`);
});
