 
const config = require('config');
const Joi = require('joi');
const express = require('express');  
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home')
const auth = require('./auth');
const app = express()

app.set('view engine','pug');
app.set('views','./views');

app.use(express.json());
app.use(helmet());
app.use('/api/courses',courses);
app.use('/',home);
//confugut=ration
console.log("Application Name: " + config.get('name'));
console.log("Mail Service: " + config.get('mail.host'));
console.log("Mail Password: " + config.get('mail.password'));
 // for which environment (production / development)
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('morgan enabled');
} 
app.use(express.urlencoded({extended:true }));
app.use(express.static('public'));


//  app.use(function(req,res,next){
//     console.log("Logging ....");
//     next();
//  });
/*---- wrote for above as ---*/
app.use(logger);
//  Same as for down one as well

//  app.use(function(req,res,next){
//      console.log("Autheticating....");
//      next();
//  })
app.use(auth);



const port = process.env.PORT || 3000;
 app.listen(port, ()=> console.log(`Listening in port ${port} ...`)); 

