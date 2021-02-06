const express = require('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { format } = require('timeago.js')
//inicializaciones
const app = express();
require('./database');

//settings
app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));

const storage = multer.diskStorage({
    destination : path.join(__dirname,'public/img/'),
    filename: (req,file,cb,filename)=>{
        cb(null,uuidv4() + path.extname(file.originalname));
    }
});

app.use(multer({storage : storage }).single('fotoPlato'));

// global variables
app.use((req,resp,next)=>{
    app.locals.format = format;
    next();
})
//routes
app.use(require('./routes/index'));

//static files
app.use(express.static(path.join(__dirname,'public')));

//start the server
app.listen(app.get('port'),() => {
    console.log(`server on port ${app.get('port')}`);
});