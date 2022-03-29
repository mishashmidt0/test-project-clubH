import express from 'express'
import dotenv from 'dotenv'

dotenv.config({
    path: 'server/.env'
});

import {passport} from './core/passport'

const app = express()
const PORT = 5000

app.listen(PORT, () => {
    console.log(`SERVER RUNNER: ${PORT}`)
})
app.get('', (req, res) => {
    res.send('Server RUNNER!')
})

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/login'}),
    function (req, res) {
        res.send();
    });

