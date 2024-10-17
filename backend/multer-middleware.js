import multer from "multer"
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const destination = join(__dirname, 'public', 'temp');


const storage = multer.diskStorage({
    destination,
    filename: function (req,file,cb) {
        cb(null, file.originalname);
    },
});

const upload = multer ({storage});

export default upload