const fs = require('fs')

listCourses = []

const new_course = (course) =>{
    get_list()
    let {id, name, description, cost, modality, duration} = course

    course = {
        id: id,
        name: name,
        description: description,
        cost: cost,
        modality: modality,
        duration: duration,
        status: true,
        students: []
    }
    let selected_course = get_course(id)
    if (!selected_course){
        listCourses.push(course)
        res = save_course()
        if(res){
            return [true,'Curso creado con exito']
        }
        else{
            return [false,'Ocurrio un problema']
        }
    }
    else{
        return [false,'Curso existente']
    }
    
}

const show_courses = (filter)=>{
    get_list()
    if (filter){
        return get_course_filtered()
    }else{
        return listCourses
    }
}

let get_course_filtered = () => listCourses.filter((listCourses) => listCourses.status == true);

const get_list = () =>{
    try{
        listCourses = require('../src/json/jsonListCourses.json')
    } catch(err){
        listCourses = []
    }
}

const save_course = () => {
    let data = JSON.stringify(listCourses)
    try {
        fs.writeFileSync('./src/json/jsonListCourses.json', data);
    } catch(err) {
        console.error(err)
        return false
    }
    return true
}

let get_course = (id) => listCourses.find((listCourses) => listCourses.id == id)

let get_student = (students, ide) => students.find((student) => student.ide == ide)

const course_status = (id) =>{
    let course = get_course(id)
    if(course.status){
        course.status = false
    }else{
        course.status = true
    }
} 
const new_registration = (registration) =>{
    get_list()
    let {ide, course, name, email, tel} = registration
    let student = {
        ide: ide,
        name: name,
        email: email,
        tel: tel
    }
    let selected_course = get_course(course)
    if (selected_course){
        let selected_student = get_student((selected_course.students), ide)
        if(!selected_student){
            selected_course.students.push(student)
            res = save_course()
            if(res){
                return [true,'Registro exitoso']
            }
            else{
                return [false,'Ocurrio un problema']
            }
        }else{
            return [false,'Ya registrado en el curso']
        }
    }
    else{
        return [false,'No existe el curso']
    }
    
}

let get_students_filtered = (students, ide) => students.filter((student) => student.ide != ide);

const delete_student = (course, ide)=>{
    get_list()
    let selected_course = get_course(course)
    if (selected_course){
        let students_filtered = get_students_filtered((selected_course.students), ide)
        selected_course.students = students_filtered
        res = save_course()
        if(res){
            return [true,'Se ha eliminado exitosamente']
        }
        else{
            return [false,'Ocurrio un problema']
        }
    }
    else{
        return [false,'No existe el curso']
    }
}

module.exports = {
    new_course,
    show_courses,
    new_registration,
    course_status,
    delete_student
}