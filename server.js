const express = require('express')
const app = express()
const fs = require('fs')
const { title } = require('process')
const PORT = process.env.PORT || 8080
const path = require('path')

app.get('/notes', function (req, res) {
    const options = {
        root: path.join(__dirname)
    };
    res.sendFile("./public/notes.html", options) 
})

app.get('/api/notes', function (req, res) {
    fs.readFile('./public/db/db.json', function(err, data) {
        let json = JSON.parse(data)
        res.json(json);
        console.log("json", json)
    }); 
})

app.post('/api/notes', function (req, res) {
    let title = req.param("title")
    let text = req.param("text")
    fs.readFile('./public/db/db.json', function(err, data) {
        let json = JSON.parse(data)
        let note = {title, text}
        json.push(note)
        console.log("note", note)
        console.log("json", json)
        const dataOut = JSON.stringify(json)
        fs.writeFile('./public/db/db.json',dataOut, () => {
            res.json(json)
        })
    }); 
})

app.listen(PORT)

app.get('/', function (req, res) {
    const options = {
        root: path.join(__dirname)
    };
    res.sendFile("./public/index.html", options) 
  })

