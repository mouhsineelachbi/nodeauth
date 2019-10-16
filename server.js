if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
var express = require('express');
var app = express();
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');

// Routers
var indexRouter = require('./routers/index');
var authorRouter = require('./routers/authors');

app.set('view engine', 'ejs')

.set('views', __dirname + '/views')

.set('layout','layouts/layout')

.use(expressLayouts)

.use(express.static('public'))

.use(bodyParser.urlencoded({limit:'10mb', extended:false}));

var mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open',()=>console.log('Connected to database'));


app.use('/', indexRouter)
app.use('/authors', authorRouter)

.listen(process.env.PORT);
