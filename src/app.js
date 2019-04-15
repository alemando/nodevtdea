//Global requires
require('./config/config')
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
var MemoryStore = require('memorystore')(session)

//paths
const dirPublic = path.join(__dirname , '../public')
const dirNode_modules = path.join(__dirname , '../node_modules')

//Static
app.use(express.static(dirPublic))

//js and css libraries
app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'))
app.use('/js', express.static(dirNode_modules + '/jquery/dist'))
app.use('/js', express.static(dirNode_modules + '/popper.js/dist/umd'))
app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'))

//session
app.use(session({
	cookie: { maxAge: 86400000 },
 	store: new MemoryStore({
      	checkPeriod: 86400000
    	}),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use((req, res, next)=>{
	if(req.session.user){
		res.locals.sesion = true
		res.locals.name = req.session.user.name
		if(req.session.user.type == '1'){
			res.locals.isCordinator = true
		}else{
			res.locals.isCordinator = false
		}
		
	}
	next()
})

//BodyParser
app.use(bodyParser.urlencoded({extended: false}))

//Routes
app.use(require('./routes/routes'))

//BD connection
mongoose.connect(process.env.URLDB, {useNewUrlParser: true}, (err, resultado) => {
	if (err){
		return console.log(err)
	}
	console.log("conectado")
})

//solucion deprecated index
mongoose.set('useCreateIndex', true);

app.listen(process.env.PORT, ()=> {
    console.log('Servidor en el puerto ' + process.env.PORT)
})