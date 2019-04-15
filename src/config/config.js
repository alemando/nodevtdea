process.env.PORT = process.env.PORT || 3000
process.env.NODE_ENV = process.env.NODE_ENV || 'local'

if(!process.env.URLDB){

	process.env.URLDB = 'mongodb://localhost:27017/Cursos'
	
}