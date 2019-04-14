//Global requires
require('./config/config')
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

//paths
const dirPublic = path.join(__dirname , '../public')
const dirNode_modules = path.join(__dirname , '../node_modules')

//Static
app.use(express.static(dirPublic))

//js and css libraries
app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'))
app.use('/js', express.static(dirNode_modules + '/jquery/dist'))
app.use('/js', express.static(dirNode_modules + '/popper.js/dist/umd'))
app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'))

//BodyParser
app.use(bodyParser.urlencoded({extended: false}))

//Routes
app.use(require('./routes/routes'))

app.listen(process.env.PORT, ()=> {
    console.log('Servidor en el puerto ' + process.env.PORT)
})