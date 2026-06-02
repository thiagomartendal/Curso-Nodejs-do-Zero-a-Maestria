import express from 'express'
import path from 'path'

const router = express.Router()
const basePath = path.join(import.meta.dirname, '../templates')

router.get('/', (req, res) => {
    res.sendFile(basePath + '/page.html')
})

export default router