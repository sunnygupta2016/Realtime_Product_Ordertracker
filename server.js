require('dotenv').config()
const express = require('express')
const bodyParser  = require('body-parser')
const methodOverride 	= require('method-override')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayout = require("express-ejs-layouts")
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')(session)

const PORT = process.env.PORT || 3000

//database conncetion
const url = 'mongodb://localhost/pizza';
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection failed...')
});
//session store
let mongoStore = new MongoDbStore({
                mongooseConnection: connection,
                collection: 'sessions'
            })
//session config
app.use(session({
	secret : process.env.COOKIE_SECRET,
	resave: false, 
    store: mongoStore,
    saveUninitialized: false, 
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour
}))

app.use(flash())
//GlobalMiddleware
app.use((req,res,next) =>{
	res.locals.session = req.session
	next()

})


//set Template engine
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.use(expressLayout)
app.use(express.json())
app.set('views', path.join(__dirname, '/resources/views'))

app.set('view engine','ejs')

require('./routes/web')(app)


app.listen(PORT,() =>{
	console.log(`listening on port ${PORT}`)
})

