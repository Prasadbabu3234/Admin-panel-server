const express = require('express')
const { MongoClient, ServerApiVersion, CURSOR_FLAGS, ObjectId } = require('mongodb');
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
        const { username, password } = req.body; // This will contain the data sent from Angular
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

app.post('/addprofile', async (req, res) => {

    try {
        const data = req.body
        const collection1 = await client.db('Mrriage-buearo').collection('Marriage_Details');
        const result = await collection1.insertOne({
            "name": data.name,
            "DOB": data.dob,
            "imageName": data.name,
            "SkinColor": data.skin,
            "Weight": data.weight,
            "education": data.education,
            "gender": data.gender,
            "height": data.height,
            "occupation": data.occupation,
            "salary": data.salary,
            "address": {
                "doorNo": data.doorNo,
                "street": data.street,
                "mandal": data.mandal,
                "city": data.city,
                "pincode": data.pincode,
                "state": data.state,
                "country": data.country
            },
            "caste": data.caste,
            "fatherName": data.father,
            "motherName": data.mother,
            "mobile": data.mobile,
            "car": data.car,
            "brothers": data.brothers,
            "sisters": data.sisters,
            "familyProperty": data.familyProperty,
            "selfProperty": data.selfProperty,
            "requirement": data.requirement,
            "status": data.marriageStatus,
            "imageData": data.image

        })
        res.send(result)
    } catch (error) {
        console.log(error)
    }

})

app.get('/profiles', async (req, res) => {
    try {
        const collection1 = client.db('Mrriage-buearo').collection('Marriage_Details');
        const result = await collection1.find({}).toArray()
        res.send(result)
    } catch (error) {

    }
})

app.delete('/delete/:id',async (req,res) => {
    try {
        const collection1 = client.db('Mrriage-buearo').collection('Marriage_Details');
        const result = await collection1.deleteOne({"_id" : new ObjectId(req.params.id)})
        res.send(result)
    } catch (error) {
        
    }
})

app.get('/profile/:id', async (req, res) => {
    try {
        const collection1 = await client.db('Mrriage-buearo').collection('Marriage_Details');
        const result = await collection1.find({ "_id": new ObjectId(req.params.id) }).toArray()
        res.send(result[0])
    } catch (error) {

    }
})

app.put('/update', async (req, res) => {
    try {
        const data = req.body
        // console.log(data)
        const collection1 = await client.db('Mrriage-buearo').collection('Marriage_Details');
        const result = await collection1.updateOne({"_id": new ObjectId(data._id)},{$set:{
            "name": data.name,
            "DOB": data.DOB,
            "imageName": data.name,
            "SkinColor": data.SkinColor,
            "Weight": data.Weight,
            "education": data.education,
            "gender": data.gender,
            "height": data.height,
            "occupation": data.occupation,
            "salary": data.salary,
            "address": {
                "doorNo": data.address.doorNo,
                "street": data.address.street,
                "mandal": data.address.mandal,
                "city": data.address.city,
                "pincode": data.address.pinode,
                "state": data.address.state,
                "country": data.address.country
            },
            "caste": data.caste,
            "fatherName": data.fatherName,
            "motherName": data.motherName,
            "mobile": data.mobile,
            "car": data.car,
            "brothers": data.brothers,
            "sisters": data.sisters,
            "familyProperty": data.familyProperty,
            "selfProperty": data.selfProperty,
            "requirement": data.requirement,
            "status": data.status,
            "imageData": data.imageData

    }})
        res.send("success")
    } catch (error) {

    }
})



app.listen(5000, async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB successfully!');
        console.log("http://localhost:5000")
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
})