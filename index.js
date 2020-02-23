//importando o express
const express = require('express');

//criando o servidor
const server = express()

server.use(express.json())

const users = ['diego', 'claudio', 'victor'];

//middlewares global
server.use((req, res, next) =>{
    console.time('Request');
    console.log(`Metodo: ${req.method}; URL: ${req.url}`);

    next();

    console.timeEnd('Request');
})

//middlewares local 
function checkUserExists(req, res, next){
    if(!req.body.name){
        return res.status(400).json({ error: 'User name is required'})
    }

    return next();
}

//middlewares vericação
function checkUserInArray(req, res, next){

    const user = users[req.params.index]
    if (!users[req.params.index]){
        return res.status(400).json({ error: 'User does not exists required'})

    }
    req.user = user;

    return next()
}


//retorna todos usuarios
server.get('/users/',(req, res) => {
    return res.json(users);
})

//retorna um usuario
server.get('/users/:index', checkUserInArray, (req, res) => {
    return res.json(users);
})

//cria um usuario
server.post('/users',checkUserExists,(req, res)=>{
    const { name } = req.body;

    users.push(name);
    return res.json(users)
})

//altera um usuario
server.put('/users/:index', checkUserExists, checkUserInArray, (req, res) =>{
    const { index } = req.params;
    const { name } = req.body;


    users[index] = name

    return res.json(users)
})

//deletar um usuario

server.delete('/users/:index',checkUserInArray, (req, res)=> {
    const { index } = req.params;

    users.splice(index, 1) //splice percorre o vetor atrás da posição

    return res.send();

})


//porta que o servidor vai rodar
server.listen(3000);