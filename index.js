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

app.post('/login', async (req, res) => {

    try {
        const {username,password} = req.body; // This will contain the data sent from Angular
        const collection1 = client.db('Mrriage-buearo').collection('Admin');
        const allData = await collection1.find({ "$or": [{ "username": username }, { "password": password }] }).toArray();
        if (allData.length > 0) {
            if (allData[0].username == username) {
                if (allData[0].password === password) {
                    let data = username
                    let token = jwt.sign(data, 'myToken')
                    res.send({ token: token, allData })
                } else {
                    res.status(403).json({ message: 'Incorrect passoword' })
                }
            } else {
                res.status(403).json({ message: "Incorrect Username" })
            }
        }
        else {
            res.status(403).json({ message: 'Enter valid credentials' })
        }
    }
    catch (error) {
        console.log(error)
    }
})

app.get('/profiles', async (req,res) => {
    try {
        const collection1 = client.db('Mrriage-buearo').collection('Marriage_Details');
        const result = await collection1.find({}).toArray()
        res.send(result)
    } catch (error) {
        
    }
})



app.listen(5000,async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB successfully!');
        console.log("http://localhost:5000")
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
})