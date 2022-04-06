import express from 'express'
import dotenv from 'dotenv'
import multer from 'multer'
import cors from 'cors'
import {nanoid} from 'nanoid'
import sharp from 'sharp'
import * as fs from "fs";

const {Code} = require('../models');

declare global {
    namespace Express {
        interface User extends UserDate {

        }
    }
}


dotenv.config({
    path: 'server/.env'
});

import './core/dataBase'

import {passport} from './core/passport'
import {UserDate} from "../pages";
import {Axios} from "../core/axios";


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
app.use(express.json())

const PORT = 5000

app.listen(PORT, () => {
    console.log(`SERVER RUNNER: ${PORT}`)
})
app.get('', (req, res) => {
    res.send('Server RUNNER!')
})

app.post('/upload', upload.single('photo'), (req, res) => {
    const filePath = (req.file as any).path

    sharp(filePath)
        .resize(300, 300)
        .toFormat("jpeg", {mozjpeg: true})
        .toFile(filePath.replace(/\.\w*/, '.jpeg'), (err) => {
            if (err) {
                throw err
            }
            fs.unlinkSync(filePath);

            res.json({
                url: `/avatars/${(req.file as any).filename.replace(/\.\w*/, '.jpeg')}`
            })
        })


})

app.get('/auth/sms', async (req, res) => {
    const phone = req.query.phone;
    const userId = (req.user as UserDate).id
    if (phone) {
        return res.status(400).send();
    }
    try {
        const data = await Axios.get(`https://sms.ru/code/call?phone=${phone}&api_id=${process.env.SMS_API_KEY}`)

        await Code.create({
            code: (data as any).code,
            user_id: userId
        })
    } catch (err) {
        res.status(500).json({
            message: 'Error when sending SMS'
        })
    }
});


app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/login'}),
    function (req, res) {
        res.send(`<script> window.opener.postMessage('${JSON.stringify(req.user)}', '*');window.close();</script>`) // передаем данные полученные с Гита. Закрывает popup после авторизации по github
    });

