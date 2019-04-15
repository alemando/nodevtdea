process.env.PORT = process.env.PORT || 3000
process.env.NODE_ENV = process.env.NODE_ENV || 'local'

let urlDB
if (process.env.NODE_ENV === 'local'){
	urlDB = 'mongodb://localhost:27017/nodevtdea'
}
else {
	urlDB = 'mongodb+srv://alemando:<Y4IT1tArHX91neYt>@nodevtdea-llnl8.mongodb.net/nodevtdea?retryWrites=true'
}

process.env.URLDB = urlDB