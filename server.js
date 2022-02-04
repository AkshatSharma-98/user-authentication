const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const keys = require('./config/keys')

const app = express()

app.use(express.json())
app.use(cors())

const uri = keys.mongoURI

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected To DB'))
    .catch(err => console.log(err))

//USE ROUTES
const users = require('./router/api/routes')
app.use('/api', users)

const PORT = process.env.PORT || 5050
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))