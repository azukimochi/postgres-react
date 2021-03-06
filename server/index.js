const path = require("path")
const express = require("express")
const bodyparser = require("body-parser")

const db = require("./database")

const ENV = process.env.NODE_ENV
const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyparser.json())

app.use("/api/cities", require("./api/cities"))

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
})

db.query("SELECT NOW()", (err, res) => {
    if (err.error) {
        return console.log(err.error)
    } else {
        console.log(`PostgreSQL connected: ${res[0].now}.`)
    }
})

module.exports = app