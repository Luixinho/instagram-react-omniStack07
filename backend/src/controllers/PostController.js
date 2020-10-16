const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt'); //ordenando posts por data de criação

        return res.json(posts);
    },

    async store(req, res) {
        // pegando informaçoes especificas de dentro do req.body (formulário)
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;

        //transfomando imagens em jpg
        const [name] = image.split('.');
        const fileName = `${name}.jpg`;

        //redimenciona imagem para um formato menor e menos pesado
        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
            )

        // apaga imagem em tamanho original
        fs.unlinkSync(req.file.path);

        //salva post no banco de dados
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName,
        });

        // envia uma mensagem para todos os usuários da aplicação
        req.io.emit('post', post);

        return res.json(post)
    }
};