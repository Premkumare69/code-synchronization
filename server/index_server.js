const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const projectCode = require('./codeModel.js')
const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
    cors({
        origin: ["code-synchronization-qw8a2j5ew-premkumare69.vercel.app", "http://code-synchronization.onrender.com"],
    })
);

mongoose.set("strictQuery", false)
mongoose.connect("mongodb://premkumar:premkumar123@ac-jqztstm-shard-00-00.ghsr1lj.mongodb.net:27017,ac-jqztstm-shard-00-01.ghsr1lj.mongodb.net:27017,ac-jqztstm-shard-00-02.ghsr1lj.mongodb.net:27017/?ssl=true&replicaSet=atlas-uqxzgf-shard-0&authSource=admin&retryWrites=true&w=majority")

const db = mongoose.connection

db.on("error", function () {
    console.log("Not connected to DB")
})
db.on("open", function () {
    console.log("connected to DB")
}
)

app.get('/code', async (req, res) => {
    try {
        const code = await projectCode.find({});
        res.status(200).json(code);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/code/meet/:meetId', async (req, res) => {
    try {
        const { meetId } = req.params;
        const codeSync = await projectCode.find({
            "roomId": meetId
        })
        res.status(200).json(codeSync)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
})

app.get('/code/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        console.log(userId);
        const codeSync = await projectCode.find({
            user: userId
        })
        res.status(200).json(codeSync)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
})

app.post('/code', async (req, res) => {
    console.log(req.body);
    try {
        const codeSync = await new projectCode(req.body)
        codeSync.save();
        res.status(200).json(req.body)
    } catch (error) {
        console.log(error.meessage);
        res.status(500).json({ message: error.message })
    }
})


// update a code
app.put('/code/:meetId', async (req, res) => {
    try {
        const { meetId } = req.params;
        const codeSync = await projectCode.findOneAndUpdate({
            "roomId": meetId
        }, {
            $set: {
                "code": req.body.code
            }
        });
        if (!projectCode) {
            return res.status(404).json({ message: `cannot find any projectCode withn ID ${meetId}` })
        }
        res.status(200).json(codeSync)

    } catch (error) {
        console.log(error.meessage);
        res.status(500).json({ message: error.message })
    }
})

//  delete a projectCode 

app.delete('/code/:meetId', async (req, res) => {
    try {
        const { meetId } = req.params;
        const codeSync = await projectCode.findOneAndDelete({
            "roomId": meetId
        });
        if (!codeSync) {
            return res.status(404).json({ message: `cannot find any projectCode with ID ${meetId}` })
        }
        res.status(200).json("DELETED SUCCESSFULLY");

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


app.post("/saveroom", (req, res) => {
    const output = req.body
    console.log(output);
    res.send("SUCCESS")
})

 app.listen(3000)
// app.listen("code-synchronization-qw8a2j5ew-premkumare69.vercel.app")

