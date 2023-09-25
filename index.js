const express = require('express')
const { MongoClient, ServerApiVersion, CURSOR_FLAGS } = require('mongodb');
const jwt = require('jsonwebtoken')
// const {PORT}  = require('dotenv')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())


const url = "mongodb+srv://prasadbabuyanbu:prasad3234@cluster0.wdccmqo.mongodb.net/?retryWrites=true&w=majority";


const client = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


app.listen(5000,async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB successfully!');
        console.log("http://localhost:5000")
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
})