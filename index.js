const express = require('express')
const mongoose = require("mongoose")

const redirect = require('./router/redirect')
const url = require('./router/url')
const app = express()
require('dotenv').config()
app.use(express.json())
    // database connection with mongoose 
mongoose.connect("mongodb://localhost/url", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('connected'))
    .catch((err) => console.log(err))

app.use('/', redirect)
app.use('/api/url', url)

// default error handler 
const errorHandler = (err, req, res, next) => {
    if (req.headersSent) {
        next(err)
    }
    res.status(500).json({ error: err })
}
app.use(errorHandler);

app.listen(4008, () => {
    console.log('Server listen at port 40008')
})