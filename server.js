const express = require('express')
const cors = require('cors')
require('dotenv').config()


const app = express()
const http = require('http').createServer(app)
const path = require('path')
const queueRoutes = require('./api/queue-routes.js')

app.use(express.json())
app.use(express.urlencoded({extended: false})); // create the req.body object


const corsOptions = {
    origin: [
        'http://127.0.0.1:5173',
        'http://127.0.0.1:3000',
        'http://localhost:3000',
        'http://localhost:3001',
        'http://127.0.0.1:3001',
    ],
    credentials: true,
}

app.use(cors(corsOptions))
app.use('/api/queue', queueRoutes)

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

const port = process.env.PORT || 3030
http.listen(port, () => {
  console.log('Server is running on port: ' + port)
});