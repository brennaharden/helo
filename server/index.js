require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const app = express();
const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env
const ctrl = require('./controller')

app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24},
    secret: SESSION_SECRET
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then( db => {
    app.set('db', db)
    console.log('db connected')
}).catch( err => console.log(err))

app.post('/auth/register', ctrl.register);
app.post('/auth/login', ctrl.login);
app.get('/auth/user', ctrl.getUser);
app.get('/auth/logout', ctrl.logout);

app.listen(SERVER_PORT, () => console.log(`here comes the hateful ${SERVER_PORT}`))