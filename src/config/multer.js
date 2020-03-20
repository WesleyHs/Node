//configurações de envio de arquivos

import multer from "multer";
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'), //caminho onde vai salvar o arquivo
        filename: (req, file, cb) => { //nome do arquivo
            crypto.randomBytes(16, (err, res) => {
                if (err) return cb(err);
                //hexadecimal
                return cb(null, res.toString('hex') + extname(file.originalname)); 
            })
        }
    })
};