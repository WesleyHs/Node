//importando o express
const express = require('express');

//criando o servidor
const server = express()

//primeira rora
server.get('/teste', (req, res) => {
    return res.send('heloo world');
})


//porta que o servidor vai rodar
server.listen(3000);