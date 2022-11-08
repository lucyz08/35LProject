const express = require('express')
const bodyParser = require('body-parser')
const { Collection } = require('mongodb')
const app = express()
const MongoClient = require('mongodb').MongoClient


MongoClient.connect('connection-string',
 {useUnifiedTopology: true})
 .then(client => {
     console.log('Connected to 35 Database')
     const db = client.db('songsDB')
     const songsCollection = db.collection('Songs')
     const promptsCollection = db.collection('Prompts')
     const userCollection = db.collection('Users')



     app.set('view engine', 'ejs')
     app.use(bodyParser.urlencoded({ extended: true}))
     app.use(bodyParser.json())
     app.use(express.static('public'))

    app.get('/', (req, res) => {
        songsCollection.find().toArray()
        .then(songResults => {
            Songs = songResults
            promptsCollection.find().toArray()
            .then(promptResults => {
                Prompts = promptResults
                userCollection.find().toArray()
                .then(userResults => {
                    Users = userResults
                    res.render('index.ejs', {Songs: Songs, Prompts: Prompts, Users: Users})
                })
            })
        })
        .catch(/*...*/)

    })

    app.post('/prompts', (req, res) => {
        promptsCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/')
        })
        .catch(error => console.error(error))
    })

    
     app.post('/songs', (req, res) => {
            songsCollection.insertOne(req.body)
              .then(result => {
                res.redirect('/') 
            })
            .catch(error => console.error(error))

    })

    app.post('/users', (req, res) => {
        userCollection.insertOne(req.body)
          .then(result => {
            res.redirect('/') 
        })
        .catch(error => console.error(error))

})


    app.put('/songs', (req, res) => {
        songsCollection.findOneAndUpdate(
            { name : "Sweet Emotion" },
            {
                $set: {
                    name: req.body.name,
                    artist: req.body.artist
                }
            },
           {
               upsert: true
           }
        )
        .then(result => {
            res.json('Success')
        })
        .catch(error => console.error(error))
    })
       
    app.delete('/songs', (req, res) => {
        songsCollection.deleteOne(
            { name: req.body.name }
        )
        .then(result => {
            if (result.deletedCount === 0) {
                return res.json('No slang to boot')
            }
            res.json('Removed New Slang jack-a-roe')
        })
        .catch(error => console.error(error))
    })
   

    app.listen(3000, function() {
        console.log('listening on 3000') })

 })
 .catch(error => console.error(error))
