import express from 'express'
import dotenv from 'dotenv'
import multer from 'multer'
import cors from 'cors'
import {nanoid} from 'nanoid'
import sharp from 'sharp'

dotenv.config({
    path: 'server/.env'
});

import './core/dataBase'

import {passport} from './core/passport'

const app = express()
const upload = multer({
    storage: multer.diskStorage({
        destination: function (_, __, cb) {
            cb(null, 'public/avatars')
        },
        filename: function (_, file, cb) {
            cb(null, file.fieldname + '-' + nanoid(6) + '.' + file.originalname.split('.').pop())
        }
    })
})


app.use(cors())
app.use(passport.initialize());

const PORT = 5000

app.listen(PORT, () => {
    console.log(`SERVER RUNNER: ${PORT}`)
})
app.get('', (req, res) => {
    res.send('Server RUNNER!')
})

app.post('/upload', upload.single('photo'), (req, res) => {
    res.json(req.file)
});


app.post('/upload', upload.single('photo'), (req, res) => {
    const filePath = (req.file as Express.Multer.File).path
    sharp(filePath)
        .resize(150, 150)
        .toFormat('jpeg')
        .toFile(filePath.replace('.png', '.jpeg'), (err) => {
            if (err) {
                throw err
            }
            res.json(req.file)
        })


})

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/login'}),
    function (req, res) {
        res.send(`<script> window.opener.postMessage('${JSON.stringify(req.user)}', '*');window.close();</script>`) // передаем данные полученные с Гита. Закрывает popup после авторизации по github
    });

