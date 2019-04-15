const hbs = require('hbs')

hbs.registerHelper('mensaje', (men)=>{
    if(men){
        let str = ''
        if (men[0]){
            str = '<div class="alert alert-success alert-dismissible fade show" role="alert">'
        }
        else{
            str = '<div class="alert alert-danger alert-dismissible fade show" role="alert">'
        }
        
        str += men[1]
        str +='<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                    '<span aria-hidden="true">&times;</span>'+
                    '</button>'+
                '</div>'
        return new hbs.SafeString (str)
    }
})

hbs.registerHelper('courses_table', (courses)=>{
    let str = ''
    courses.forEach(course => {
        let {id, name, description, cost, modality, duration, status} = course
        if (modality =='1'){
            modality = 'Presencial'
        }else if(modality =='2'){
            modality = 'Virtual'
        }
        if (status){
            status = 'Disponible'
        }else{
            status = 'Cerrado'
        }
        str +='<tr>'+
        '<th scope="row">'+id+'</th>'+
        '<td>'+name+'</td>'+
        '<td>'+description+'</td>'+
        '<td>'+cost+'</td>'+
        '<td>'+modality+'</td>'+
        '<td>'+duration+'</td>'+
        '<td>'+status+'</td>'+
        '</tr>'
    })
    return new hbs.SafeString (str)
})

hbs.registerHelper('courses_user', (courses)=>{
    let str = ''
    courses.forEach(course => {
        let {id, name, description, cost, modality, duration} = course
        if (modality =='1'){
            modality = 'Presencial'
        }else if(modality =='2'){
            modality = 'Virtual'
        }
        str+='<div class="card">'+
                '<button id="heading-'+id+'"class="card-header btn btn-link collapsed btn-block" type="button" data-toggle="collapse" data-target="#collapse-'+id+'" aria-expanded="false" aria-controls="collapse-'+id+'">'+
                '<p>ID: '+id+' Nombre del curso: '+name+' Valor: '+cost+'</p>'+
                '</button>'+
                
                
                '<div id="collapse-'+id+'" class="collapse" aria-labelledby="heading-'+id+'" data-parent="#accordion_courses">'+
                '<div class="card-body">'+
                '<p>Descripción: '+description+'</p>'+
                '<p>Modalidad: '+modality+'</p>'+
                '<p>Intensidad Horaria: '+duration+'</p>'+
                '</div>'+
                '</div>'+
                '</div>'
    })
    return new hbs.SafeString (str)
})

hbs.registerHelper('options', (courses)=>{
    let str = ''
    courses.forEach(course => {
        let {id, name} = course
        str+='<option value="'+id+'">'+name+'</option>'
    })
    return new hbs.SafeString (str)
})
hbs.registerHelper('courses_card', (courses)=>{
    let str = ''
    courses.forEach(course => {
        let {id, name} = course
        
        str+='<div class="card">'+
                '<button id="heading-'+id+'"class="card-header btn btn-link collapsed btn-block" type="button" data-toggle="collapse" data-target="#collapse-'+id+'" aria-expanded="false" aria-controls="collapse-'+id+'">'+
                '<p>Nombre del curso: '+name+'</p>'+
                '</button>'+
                
                
                '<div id="collapse-'+id+'" class="collapse" aria-labelledby="heading-'+id+'" data-parent="#accordion_courses">'+
                '<div class="card-body">'+
                '<div class="row">'+
                '<div class="content table-responsive">'+
                '<table class="table table-bordered table-hover">'+
                '<thead class="thead-dark">'+
                '<tr>'+
                '<th scope="col">Id</th>'+
                '<th scope="col">Nombre</th>'+
                '<th scope="col">Email</th>'+
                '<th scope="col">Telefono</th>'+
                '<th scope="col">Eliminar</th>'+
                '</tr>'+
                '</thead>'+
                '<tbody>'
        course.students.forEach(student => {
            let {id : ide, name: student_name, email, tel} = student
                str+='<tr>'+
                        '<th scope="row">'+ide+'</th>'+
                        '<td>'+student_name+'</td>'+
                        '<td>'+email+'</td>'+
                        '<td>'+tel+'</td>'+
                        '<td>'+
                        '<form action="../cursos/inscritos" class="form-horizontal" method="POST">'+
                        '<input id="course" type="hidden" name="course" value="'+id+'"required>'+
                        '<button class="btn btn-danger btn-lg btn-block" name="ide" value="'+ide+'">Eliminar</button>'+              
                        '</form>'+
                        '</td>'+
                        '</tr>'
        })
        str+='</tbody>'+
                '</table>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>'
    })
    
    return new hbs.SafeString (str)
})