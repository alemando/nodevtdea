const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')

const dirPublic = path.join(__dirname , '../public')
const dirNode_modules = path.join(__dirname , '../node_modules')
const dirPartials = path.join(__dirname , '../template/partials')
const dirViews = path.join(__dirname , '../template/views')
app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'))
app.use('/js', express.static(dirNode_modules + '/jquery/dist'))
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'))
app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'))

app.use(express.static(dirPublic))

hbs.registerPartials(dirPartials)
app.set('views', dirViews)
app.set('view engine', 'hbs')

app.get('/', (req, res)=>{
    res.render('index')
})
 
app.listen(3000, ()=> {
    console.log('Escuchando puerto 3000')
})