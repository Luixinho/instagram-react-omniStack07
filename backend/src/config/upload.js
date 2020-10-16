const multer = require('multer');
const path = require('path');

// configurando rota onde serão guardados os arquivos
module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: function (req, file, cb) {
            cb(null, file.originalname); // mudando o nome do arquivo para ser salvo
        }
    })
}