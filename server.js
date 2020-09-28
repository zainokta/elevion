require('dotenv').config()
const http = require('http')
const express = require('express');
const jsend = require('jsend')
const helmet = require('helmet')
const cors = require('cors')
const router = require('./routers')
const swaggerUI = require('swagger-ui-express')
const swagger = require('./swagger')
const app = express();

app.use(jsend.middleware)
app.use(cors())
app.use(helmet())
app.use(express.json({
    limit: '50mb'
}));
app.use(express.urlencoded({
    extended: false,
    limit: '50mb'
}));

app.use('/api/v1', router)
app.use('/explore', swaggerUI.serve, swaggerUI.setup(swagger.default()))
app.get('*', (req, res, next) => {
    res.status(200).json({
        message: "Welcome to the beginning of nothingness.",
        status: 200
    })
})


const port = process.env.PORT || '8001'
const server = http.createServer(app)

server.listen(port, async () => {
    console.log(`Server running at port ${port}`)
})