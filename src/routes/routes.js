const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')

//models methods
const {new_course, show_courses, new_registration, course_status, delete_student} = require('./../models/course')

//models methods
const {new_user, login} = require('./../models/user')

//paths
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

app.post('/', (req, res)=>{
    req.session.user = null
    res.locals.sesion = false
    res.locals.name = null
    res.locals.user_type = null
    res.locals.isCordinator = false
    res.redirect('/')
})


app.get('/register', (req, res)=>{
    res.render('register')
})

app.post('/register', (req, res)=>{
    let user = req.body
    new_user(user, function(resp){
        if (resp[0]){
            res.redirect('/login')
        }
        else{
            res.render('register', {
                men: resp
            })
        }
    })
})

app.get('/login', (req, res)=>{
    res.render('login')
})

app.post('/login', (req, res)=>{
    let user = req.body
    login(user.id, user.password, function(resp){
        if (resp[0]){
            req.session.user = resp[1]
            res.redirect('/')
        }
        else{
            res.render('login', {
                men: resp
            })
        }
    })
})

app.get('/cursos', (req, res)=>{
    if(res.locals.sesion){
        if(res.locals.isCordinator){
            show_courses(false, function(resp){
                res.render('cursos', {
                    courses: resp,
                })
            })
        }else{
            show_courses(true, function(resp){
                res.render('cursos_user', {
                    courses_user: resp,
                })
            })
        }
    }else{
        res.render('error')
    }
})

app.post('/cursos', (req, res)=>{
    if(res.locals.sesion){
        if(res.locals.isCordinator){
            let course = req.body.course
            course_status(course, function(resp_status){
                show_courses(false, function(resp){
                    res.render('cursos', {
                        courses: resp
                    })
                })
            })
        }else{
            show_courses(true, function(resp){
                res.render('cursos_user', {
                    courses_user: resp,
                })
            })
        }
    }else{
        res.render('error')
    }
    
})

app.get('/cursos/crear', (req, res)=>{
    if(res.locals.sesion){
        if(res.locals.isCordinator){
            res.render('crear_curso')
        }else{
            res.render('error')
        }
    }else{
        res.render('error')
    }
    
})

app.post('/cursos/crear', (req, res)=>{
    if(res.locals.sesion){
        if(res.locals.isCordinator){
            let course = req.body
            new_course(course, function(resp){
                res.render('crear_curso', {
                    men: resp
                })
            })
        }else{
            res.render('error')
        }
    }else{
        res.render('error')
    }
    
    
    
})

app.get('/cursos/inscribir', (req, res)=>{
    if(res.locals.sesion){
        show_courses(true, function(resp){
            res.render('inscribir_curso', {
                courses: resp
            })
        })
    }else{
        res.render('error')
    }
    
})

app.post('/cursos/inscribir', (req, res)=>{
    if(res.locals.sesion){
        show_courses(true, function(resp){
            user =  req.session.user
            course = req.body.course
            new_registration(user, course, function(respo){
                res.render('inscribir_curso', {
                    men: respo,
                    courses: resp
                })
            })
        })
    }else{
        res.render('error')
    }
    
})

app.get('/cursos/inscritos', (req, res)=>{
    if(res.locals.sesion){
        if(res.locals.isCordinator){
            show_courses(true, function(resp){
                res.render('inscritos', {
                    courses: resp
                })
            })
        }else{
            res.render('error')
        }
    }else{
        res.render('error')
    }
    
})

app.post('/cursos/inscritos', (req, res)=>{
    if(res.locals.sesion){
        if(res.locals.isCordinator){
            let student_id = req.body.ide
            let course_id = req.body.course
            delete_student(course_id, student_id, function(respo){
                show_courses(true, function(resp){
                    res.render('inscritos', {
                        men: respo,
                        courses: resp
                    })
                })
            })
        }else{
            res.render('error')
        }
    }else{
        res.render('error')
    }
    
})

app.get('*', (req, res)=>{
    res.render('error')
})

module.exports = app