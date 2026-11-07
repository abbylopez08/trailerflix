const express = require('express');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3008;
const DATA_PATH = process.env.DATA_PATH || './database/trailerflix.json';

const TRAILERFLIX= [];

try {
    const fileData = fs.readFileSync(DATA_PATH, 'utf-8');
    TRAILERFLIX= JSON.parse(fileData);
    console.log('Trailers cargados.');
} catch (error) {
    console.error('Error al intentar leer el archivo de datos:', error.message);
}

app.get('/', (req, res) => {
    res.send('<h1>Trailerflix</h1>');
});

app.get('/catalogo', (req, res) => {
    if (TRAILERFLIX.length === 0) {
        return res.status(404).json({ mensaje: 'No se pudo cargar el catálogo.' });
    }
    res.json(trailers);
});

app.get('/titulo/:title', (req, res) => {
    const titulo = req.params.title.toLowerCase();
    
    const matches = TRAILERFLIX.filter(item => 
        item.titulo && item.titulo.toLowerCase().includes(titulo)
    );

    if (matches.length === 0) {
        return res.status(404).json({ mensaje: 'No existen títulos que coincidan con la búsqueda.' });
    }

    res.json(matches);
});

app.get('/categoria/:cat', (req, res) => {
    const catParam = req.params.cat.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    const resultados = TRAILERFLIX.filter(item => item.categoria && item.categoria.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === catParam
    );

    if (resultados.length === 0) {
        return res.status(404).json({ 
            mensaje: `No hay resultados para la categoría: ${req.params.cat}` 
        });
    }

    res.json(resultados);
});

app.get('/reparto/:act', (req, res) => {
    const actor = req.params.act.toLowerCase();

    const matches = TRAILERFLIX.filter(item => 
        item.reparto && item.reparto.toLowerCase().includes(actor)
    );

    if (matches.length === 0) {
        return res.status(404).json({ mensaje: 'No se encontraron títulos para el actor/actriz ingresado.' });
    }

    const result = matches.map(item => {
        return {
            titulo: item.titulo,
            reparto: item.reparto
        };
    });

    res.json(result);
});

app.get('/trailer/:id', (req, res) => {
    const Id = parseInt(req.params.id, 10);

    if (isNaN(Id)) {
        return res.status(400).json({ mensaje: 'El ID ingresado es inválido, por favor ingrese un número nuevamente.' });
    }

    const item = TRAILERFLIX.find(item => item.id === Id || item.code === Id);

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
