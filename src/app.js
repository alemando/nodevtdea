const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
require('./helpers/funciones')
const {new_course, get_course, show_courses} = require ('./funciones');

const dirPublic = path.join(__dirname , '../public')
const dirNode_modules = path.join(__dirname , '../node_modules')
const dirPartials = path.join(__dirname , '../template/partials')
const dirViews = path.join(__dirname , '../template/views')
app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'))
app.use('/js', express.static(dirNode_modules + '/jquery/dist'))
app.use('/js', express.static(dirNode_modules + '/popper.js/dist/umd'))
app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'))

app.use(express.static(dirPublic))
hbs.registerPartials(dirPartials)
app.use(bodyParser.urlencoded({extended: false}))

app.set('views', dirViews)
app.set('view engine', 'hbs')

app.get('/', (req, res)=>{
    res.render('index')
})

app.get('/cursos', (req, res)=>{
    let courses = show_courses(false)
    res.render('cursos', {
        courses: courses
    })
})

app.get('/cursos/crear', (req, res)=>{
    res.render('crear_curso')
})

app.post('/cursos/crear', (req, res)=>{
    let course = req.body
    let men = {}
    resp = new_course(course)
    men = {
        men: resp
    }
    res.render('crear_curso', men)
    
    
})

app.get('*', (req, res)=>{
    res.render('error')
})

app.listen(3000, ()=> {
    console.log('Escuchando puerto 3000')
})