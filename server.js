if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
var express = require('express');
var app = express();
var expressLayouts = require('express-ejs-layouts');
var indexRouter = require('./routers/index');

app.set('view engine', 'ejs')

.set('views', __dirname + '/views')

.set('layout','layouts/layout')

.use(expressLayouts)

.use(express.static('public'));

var mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology: true 
});
var db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open',()=>console.log('Connected to database'));


app.use('/', indexRouter)

.listen(3000);
