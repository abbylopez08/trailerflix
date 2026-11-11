const express = require('express');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3008;
const DATA_PATH = process.env.DATA_PATH || './database/trailerflix.json';

const datosCargados = () => {
    try {
        const datos = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
        console.log('Trailers cargados.');
        return datos;
    } catch (error) {
        console.error('Error al cargar el archivo de datos:', error.message);
        return null;
    };
}

const TRAILERFLIX = datosCargados();

app.use((req, res, next) => {
    if (!TRAILERFLIX) {
        return res.status(500).json({ mensaje: 'Error interno, no se pudo cargar el catálogo.' });
    }
    next();
});

app.get('/', (req, res,) => {
    res.send('<h1>Trailerflix</h1>');
});

const normalizar = (texto) =>
    texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

app.get('/catalogo', (req, res) => {
    if (TRAILERFLIX.length === 0) {
        return res.status(404).json({ mensaje: 'No se pudo cargar el catálogo.' });
    }
    res.json(TRAILERFLIX);
});

const MIN_LETRAS = 3;

app.get('/titulo/:title', (req, res) => {
    const titulo = normalizar(req.params.title);
    
    const matches = TRAILERFLIX.filter(item => 
        item.titulo && item.titulo.toLowerCase().includes(titulo)
    );

    if (titulo.length < MIN_LETRAS) {
        return res.status(400).json({ mensaje: `La búsqueda debe tener al menos ${MIN_LETRAS} letras.` });
    }

    if (matches.length === 0) {
        return res.status(404).json({ mensaje: 'No existen títulos que coincidan con la búsqueda.' });
    }

    res.json(matches);
});

app.get('/categoria/:cat', (req, res) => {
    const categoria = normalizar(req.params.cat);

    const matches = TRAILERFLIX.filter(item =>
        item.categoria && normalizar(item.categoria) === categoria
    );

    if (matches.length === 0) {
        return res.status(404).json({
            mensaje: `No hay resultados para la categoría: ${req.params.cat}`
        });
    }

    res.json(matches);
});

app.get('/reparto/:act', (req, res) => {
    const actor = normalizar(req.params.act);

    if (actor.length < MIN_LETRAS) {
        return res.status(400).json({ mensaje: `La búsqueda debe tener al menos ${MIN_LETRAS} letras.` });
    }

    const matches = TRAILERFLIX.filter(item =>
        item.reparto && normalizar(item.reparto).includes(actor)
    );

    if (matches.length === 0) {
        return res.status(404).json({ mensaje: `No se encontraron títulos para el actor/actriz: ${req.params.act}` });
    }

    const result = matches.map(item => ({
        titulo: item.titulo,
        reparto: item.reparto
    }));

    res.json(result);
});

app.get('/trailer/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ mensaje: 'El ID ingresado es inválido, por favor ingrese un número nuevamente.' });
    }

    const item = TRAILERFLIX.find(trailer => trailer.id === id);

    if (!item) {
        return res.status(404).json({ mensaje: 'El número de ID no corresponde a ninguna pelicula.' });
    }

    if (!item.trailer) {
        return res.status(404).json({
            id: item.id,
            titulo: item.titulo,
            mensaje: 'Este titulo no tiene un trailer asociado.'
        });
    }

    res.json({
        id: item.id,
        titulo: item.titulo,
        trailer: item.trailer
    });
});

app.use((req, res) => {
    res.status(404).json({ mensaje: 'La ruta solicitada no extiste .' });
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto http://localhost:${PORT}`);
});
