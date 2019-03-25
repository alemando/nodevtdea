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

let get_course = (id) => listCourses.find((listCourses) => listCourses.id == id);


module.exports = {
    new_course,
    get_course,
    show_courses
}