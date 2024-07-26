const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// MongoDB URI (reemplaza con tu propia URI)
const uri = 'mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/resultados-electorales?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const resultadosSchema = new mongoose.Schema({
    partido: String,
    votos: Number,
    porcentaje: Number,
    color: String
});

const Resultado = mongoose.model('Resultado', resultadosSchema);

app.use(cors());
app.use(bodyParser.json());

// Endpoint para obtener resultados
app.get('/resultados', async (req, res) => {
    try {
        const resultados = await Resultado.find();
        res.json(resultados);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Endpoint para guardar resultados
app.post('/resultados', async (req, res) => {
    try {
        const resultados = req.body;
        await Resultado.deleteMany({});
        await Resultado.insertMany(resultados);
        res.status(200).send('Resultados guardados');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en puerto ${port}`);
});
