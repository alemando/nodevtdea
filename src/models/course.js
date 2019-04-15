const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema
//Model
const courseSchema = new Schema({
    id : {
        type: Number,
        required: true,
        unique: true
    },
    name : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    cost : {
        type: Number,
        required: true
    },
    modality : {
        type: String,
        default: '0',
        trim: true,
        enum : {values : ['0', '1', '2']}
    },
    duration : {
        type: Number,
        default: null
    },
    status : {
        type: Boolean,
        required: true
    },
    students : {
        type: []
    }
})

courseSchema.plugin(uniqueValidator)

const Course = mongoose.model('Course', courseSchema)

//Functions
const new_course = (course, callback) =>{
    let {id, name, description, cost, modality, duration} = course

    course = new Course ({
        id: id,
        name: name,
        description: description,
        cost: cost,
        modality: modality,
        duration: duration,
        status: true,
        students: []
    })

    course.save((err, res)=>{
        if(err){
            if (err.name = "ValidationError"){
                //console.log(err)
                callback([false, 'Id curso ya  existente'])
            }else{
                //console.log(err)
                callback([false, 'Ocurrio un problema'])
            }
        }else{
            callback([true, 'Curso creado con exito'])
        }
        
    })
}

const show_courses = (filter, callback)=>{
    if (filter){
        Course.find({status : true}).exec((err, res)=>{
            if(err){
                console.log(err)
                //callback de respuesta
            }else{
                callback(res)
            }
        })
    }else{
        Course.find({}).exec((err, res)=>{
            if(err){
                console.log(err)
                //callback de respuesta
            }else{
                callback(res)
            }
        })
    }
}

const course_status = (id, callback) =>{
    Course.findOne({id: id}, (err, res)=>{
        if(err){
            console.log(err)
            //callback de respuesta find fallo
        }else{
            res.status = !res.status
            res.save((err,resp)=>{
                if(err){
                    console.log(err)
                    //callback de respuesta cambio fallo
                }else{
                    callback(resp)
                }
            })
        }
        
    })
}

const new_registration = (user, course, callback) =>{
    Course.findOne({id: course}, (err, res)=>{
        if(err){
            console.log(err)
            //callback de respuesta find fallo
        }else{
            if(!res){
                callback([false,'No existe el curso'])
            }else{
                students = res.students
                let selected_student = get_student((students), user.id)
                if(!selected_student){
                    res.students.push(user)
                    res.save((err,resp)=>{
                        if(err){
                            console.log(err)
                            callback([false,'Ocurrio un problema'])
                        }else{
                            callback([true,'Registro exitoso'])
                        }
                    })
                }else{
                    callback([false,'Ya registrado en el curso'])
                }
            }
        }
        
    })
}

let get_student = (students, id) => students.find((student) => student.id == id)

const delete_student = (course, student, callback)=>{
    Course.findOne({id: course}, (err, res)=>{
        if(err){
            console.log(err)
            //callback de respuesta find fallo
        }else{
            if(!res){
                callback([false,'No existe el curso'])
            }else{
                students = res.students
                let students_filtered = get_students_filtered((students), student)
                res.students = students_filtered
                res.save((err,resp)=>{
                    if(err){
                        console.log(err)
                        callback([false,'Ocurrio un problema'])
                    }else{
                        callback([true,'Se ha eliminado exitosamente'])
                    }
                })
                
            }
        }
        
    })
}

let get_students_filtered = (students, id) => students.filter((student) => student.id != id);

module.exports = {
    new_course,
    show_courses,
    new_registration,
    course_status,
    delete_student
}