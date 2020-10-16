const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


const app = express();

// dividindo servidor para suportar protocolo http e websocket(permite fazer comunicação em tempo real)
const server = require('http').Server(app);
const io = require('socket.io')(server);

// link do banco de dados gerado pelo MongoDBAtlas
mongoose.connect('mongodb+srv://Luixinho:635293@cluster0.gmtfn.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true, // dizendo que estamos usando string(link) novo pra conectar com o Mongo (banco de dados)
    useUnifiedTopology: true,
})

// exportando o req.io para todas as rotas para ser usado em todos os controlers
app.use((req, res, next) => {
    req.io = io;

    // faz com que essa "função seja execultada sem travar a execulsão dos seguintes "
    next();
});

//permite que o front acesse o back pelo react mesmo estando em dominios diferentes
app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

// configuração para o servidor reconhecer as rotas dentro do arquivo "routes"
app.use(require('./routes'));


server.listen(3333);