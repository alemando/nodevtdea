const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')

//methods
const {new_course, show_courses, new_registration, course_status, delete_student} = require ('./../funciones')

const dirPartials = path.join(__dirname , '../../template/partials')
const dirViews = path.join(__dirname , '../../template/views')

//hbs helpers
require('./../helpers/helpers')

//hbs
app.set('view engine', 'hbs')
app.set('views', dirViews)
hbs.registerPartials(dirPartials)


app.get('/', (req, res)=>{
    res.render('index')
})

app.get('/cursos', (req, res)=>{
    let courses = show_courses(false)
    let courses_user = show_courses(true) 
    res.render('cursos', {
        courses: courses,
        courses_user : courses_user
    })
})

app.post('/cursos', (req, res)=>{
    let course = req.body.course
    course_status(course)
    let courses = show_courses(false)
    let courses_user = show_courses(true) 
    res.render('cursos', {
        courses: courses,
        courses_user : courses_user
    })
})

app.get('/cursos/crear', (req, res)=>{
    res.render('crear_curso')
})

app.post('/cursos/crear', (req, res)=>{
    let course = req.body
    resp = new_course(course)
    let send = {
        men: resp
    }
    res.render('crear_curso', send)
    
})

app.get('/cursos/inscribir', (req, res)=>{
    let courses = show_courses(true) 
    res.render('inscribir_curso', {
        courses: courses
    })
})

app.post('/cursos/inscribir', (req, res)=>{
    let registration = req.body
    let courses = show_courses(true) 
    resp = new_registration(registration)
    let send = {
        men: resp,
        courses: courses
    }
    res.render('inscribir_curso', send)
})

app.get('/cursos/inscritos', (req, res)=>{
    let courses = show_courses(true)
    res.render('inscritos', {
        courses: courses
    })
})

app.post('/cursos/inscritos', (req, res)=>{
    let courses = show_courses(true)
    let student_id = req.body.ide
    let course_id = req.body.course
    resp = delete_student(course_id, student_id)
    res.render('inscritos', {
        courses: courses,
        men: resp
    })
})

app.get('*', (req, res)=>{
    res.render('error')
})

module.exports = app