const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const Clarifai = require('clarifai');
require('dotenv').config();

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
      host : 'postgresql-pointy-18094',
      port : 5432,
      user : '',
      password : '',
      database : 'smart-brain'
    }
  });

const app = express();

app.use(bodyParser.json())
app.use(cors())
app.get('/', (req, res) => {res.send('It is Working')})
// app.get('/', (req, res)=> {
// db.select('*').from('users')
//     .then(user => {res.json(user);
//     })
// })

app.post('/signin',signin.handleSignin(db, bcrypt)) //using nested function to inject dependencies
app.post('/register',(req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id',(req, res) => {profile.handleProfileGet(req, res,db)});
app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

app.listen(process.env.PORT || 3001, () => {
    console.log(`App is running on port ${process.env.PORT}`)
})

