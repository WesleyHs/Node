//importando o express
const express = require('express');

//criando o servidor
const server = express()

server.use(express.json())

const users = ['diego', 'claudio', 'victor'];

//retorna todos usuarios
server.get('/users/', (req, res) => {
    return res.json(users);
})

//retorna um usuario
server.get('/users/:index', (req, res) => {
    const { index } = req.params;

    return res.json(users[index]);
})

//cria um usuario
server.post('/users', (req, res)=>{
    const { name } = req.body;

    users.push(name);
    return res.json(users)
})

//altera um usuario
server.put('/users/:index', (req, res) =>{
    const { index } = req.params;
    const { name } = req.body;


    users[index] = name

    return res.json(users)
})

//deletar um usuario

server.delete('/users/:index', (req, res)=> {
    const { index } = req.params;

    users.splice(index, 1) //splice percorre o vetor atrás da posição

    return res.send();

})


//porta que o servidor vai rodar
server.listen(3000);