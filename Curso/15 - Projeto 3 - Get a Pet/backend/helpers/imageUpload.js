import multer from 'multer'
import path from 'path'

const imageStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        let folder = ''

        if (req.baseUrl.includes('users')) {
            folder = 'user'
        } else if (req.baseUrl.includes('pets')) {
            folder = 'pet'
        }

        callback(null, `../data/${folder}`)
    },
    filename: (req, file, callback) => {
        const num = Math.floor(Math.random() * 100)
        const name = Date.now() + String(num) + path.extname(file.originalname)
        callback(null, name)
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return callback(new Error('Envie apenas arquivos npg ou png.'))
        }
        callback(undefined, true)
    }
})

export {imageUpload}