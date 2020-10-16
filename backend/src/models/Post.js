const mongoose = require('mongoose');

// configurando tabela do banco de dados
const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
        type: Number,
        default: 0,
    }
}, {
    // cria dois campos adicionais em cada campo do banco de dados que guardarão a data de criação de cada registro e de alteração
    timestamps: true,
});

module.exports = mongoose.model('Post', PostSchema);