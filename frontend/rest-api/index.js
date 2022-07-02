const express = require("express")
const helmet = require("helmet")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())

const mongoString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.n7a8r.mongodb.net/blog?retryWrites=true&w=majority`

mongoose.connect(mongoString, {useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.on("error", function(error) {
  if (process.env.NODE_ENV === "development") {
    console.log(error)
  }
})

mongoose.connection.on("open", function() {
  console.log("Connected to MongoDB database.")
})

app.use(helmet())

app.use(require("./routes/index.js"))

app.listen(PORT, function () {
  console.log(`Express app listening on port ${PORT}`)
})