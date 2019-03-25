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
    });
    return new hbs.SafeString (str)
})