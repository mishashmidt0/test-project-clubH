import express from 'express'
import config from 'config'
import dotenv from 'dotenv'

const app = express()
const PORT = config.get('port') || 5000

app.listen(PORT, () => {
    try {
        console.log('Start Server...')
    } catch (err) {
        throw Error('Error Start Server')
    }
})

dotenv.config({
    path: 'server/.env'
})
import {passport} from './core/passport'

app.get('/auth/github', passport.authenticate('github'));
// При перезоде на /auth/github, вызываем стратегию из файла passport.
// В стратегию передаём переменные из файла .env. Благодаря dotenv

app.get('/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/login'}),
    function (req, res) {
        res.send();
    });
// Ответ от стратегии gitHub
