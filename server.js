const express = require ('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');

const app = express();

app.use(bodyParser.json())
app.use(cors())

const database = {
    users: [
        {
            id: 1,
            name: 'Daniel',
            email: 'daniel@gmail.com',
            password: 'goodness',
            entries: 0,
            joined: new Date()
        },
        {
            id: 2,
            name: 'Sandra',
            email: 'sandra@gmail.com',
            password: 'goodnews',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res)=> {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
   if(req.body.email === database.users[0].email && 
    req.body.password === database.users[0].password){
    res.json(database.users[0]);
   }else {
    res.status(400).json('Failed to login')
   }
})

app.post('/register', (req, res) => {

    const {email, name, password} = req.body;
    // bcrypt.hash(password, null, null, function(err, hash) {
    //   console.log(hash);    
    // });
    database.users.push({
        id: 003,
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length -1])
})

app.get('/profile/:id', (req, res) => {
    let found = false;
    const { id } = req.params;
    database.users.forEach(user => {
        if(user.id == id){
            found = true;
            return res.json(user)
        }
    })
    if (!found) {
        
            res.status(404).json('user not found');
    }
})

app.put('/image', (req, res) => {
let found = false;
const { id } = req.body;
database.users.forEach(user => {
    if(user.id == id) {
        found = true;
        user.entries++;
        return res.json(user.entries)
    }
})
if (!found) {
    res.status(404).json('not found');
}
})


 // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3001, ()=> {
    console.log("App is running on port 3001")
})

