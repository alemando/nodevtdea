const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

//bcrypt
const bcrypt = require('bcrypt');

//Model
const userSchema = new Schema({
    id : {
        type: Number,
        required: true,
        unique: true
    },
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tel : {
        type: Number,
        required: true
    },
    type : {
        type: String,
        default: '0',
        required: true,
        trim: true,
        enum : {values : ['0', '1']}
    }
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

//Functions
const new_user = (user, callback) =>{
    let {id, name, email, tel, password} = user

    user = new User ({
        id: id,
        name: name,
        email: email,
        password: bcrypt.hashSync(password, 10),
        tel: tel,
        type: '0'
    })

    user.save((err, res)=>{
        if(err){
            if (err.name = "ValidationError"){
                //console.log(err)
                callback([false, 'Id ya registrado'])
            }else{
                //console.log(err)
                callback([false, 'Ocurrio un problema'])
            }
        }else{
            callback([true, 'Usuario creado con exito'])
        }
        
    })
}

const login = (id, password, callback)=>{
    User.findOne({id: id}, (err, res)=>{
        if(err){
            callback([false, 'Ocurrio un problema'])
        }else{
            if(!res){
                callback([false, 'Nombre o contraseña incorrecta'])
            }else{
                if(!bcrypt.compareSync(password, res.password)){
                    callback([false, 'Nombre o contraseña incorrecta'])
                }else{
                    callback([true, res])
                }
            }
        }
    })
}

module.exports = {
    new_user,
    login
}