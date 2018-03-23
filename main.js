const express = require('express'),
    mongoose = require('mongoose')

const {
    MONGO_URI,
    NODE_ENV,
    PORT,
} = process.env

const possibleNames = [
    'Alfred',
    'Rico',
    'Roxy',
    'Lizzy',
    'Herbert',
    'Snuffles'
]

const KittenSchema = new mongoose.Schema({
    name: String
})

const Kitten = mongoose.model('Kitten', KittenSchema)

// when using docker, we will use the service 'mongo'
// uri will look like 'mongodb://mongo/DB_SLUG'
const dbInit = () => {
    mongoose.connect(MONGO_URI || 'mongodb://localhost/dnmtest')
    const db = mongoose.connection

    db.on('error', err => console.error(err))
    db.once('open', async () => {
        // seed cat
        const idx = Math.floor(Math.random() * possibleNames.length)
        const name = possibleNames[idx]
        console.log('seeding kitten with name', name)

        await Kitten.create({ name })
    })
}

dbInit()

const app = express()

app.get('*', async (req, res) => {
    const kittens = await Kitten.find()
    res.status(200).json([...kittens])
})

app.listen(PORT || 3000)
