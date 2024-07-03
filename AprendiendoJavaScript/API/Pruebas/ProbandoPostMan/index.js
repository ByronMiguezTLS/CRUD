const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.get('/ojo', (req, res) => {
    res.status(404).send({
        ojo: '👀',
        size: 'large'
    });
});

app.post('/ojo/:id', (req, res) => {
    const { id } = req.params;
    const { logo } = req.body;

    if (!logo) {
        return res.status(418).send({
            message: 'Debe enviar un logo'
        });
    }

    res.status(200).send({
        ojo: `👀 con tu ${logo} y ${id} ID`,
    });
});
