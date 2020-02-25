const express = require('express');
const routes = require('./routes');

//utilizando classes
class App {
    constructor(){
        this.server = express();

        this.middlewares();
        this.routes();

    }

    middlewares(){
        this.server.use(express.json()); //está pronta para utilizar o json
    }

    routes(){
        this.server.use(routes);
    }
}

module.exports = new App().server //esportando o server e o APP