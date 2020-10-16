const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload')
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

// configuração de rotas, serve como o app que usamos para usar o get ou post para renderizar os caminhos da aplicação
const routes = new express.Router();
const upload = multer(uploadConfig); // multer usado para fazer o express entender corpo em formato mult partedata para receber tanto texto quanto arquivos


routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);

routes.post('/posts/:id/like', LikeController.store);

// exportando as rotas para serem usadas no servidor
module.exports = routes;