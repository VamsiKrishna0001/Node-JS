 
 const Joi = require('joi');
 const express =   require('express');
 const { func } = require('joi'); 

 const app = express();

 app.use(express.json());
 const courses = [
     {id: 1,name : 'course 1'},
     {id: 2,name : 'course 2'},
     {id: 3,name : 'course 3'},
     {id: 4,name : 'course 4'},
     {id: 5,name : 'course 5'},
     {id: 6,name : 'course 6'},
 ]
 app.get('/',(req,res)=>{
     res.send('Hello world!!')
 });

 app.get('/api/courses',(req,res) => {
     res.send(courses);
 });

 app.post('/api/courses',(req,res) => {
    // const schema = {
    //     name: Joi.string().min(3).required()
    // };
   
    // const result = Joi.validate(req.body,schema);
    // if(result.error){
    //     res.send(404).send(res.error.details[0].message);
    //     return;
    // }
    const {error} = validateCourse(req.body);

    //if invalid,return 404 - Bad request
    if(error)  return res.status(404).send(error.details[0].message);

     const course ={
         id : courses.length+1,
         name: req.body.name
     };
     courses.push(course);
     res.send(course);
 });

 app.put('/api/courses/:id', (req, res) =>{
    //Look Up the course
    // if not 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The Course with given id was not found.');
       
    //Validate
    const {error} = validateCourse(req.body);

    //if invalid,return 404 - Bad request
    if(error) return res.status(404).send(error.details[0].message);

    //Update the course
    course.name = req.body.name;

    //Return updated course
    res.send(course);
 });

 function validateCourse(course){
     const schema = Joi.object({
         name: Joi.string().min(3).required()
     });
     return schema.validate(course);
    
 }


 app.delete('/api/courses/:id',(req,res) => {
    //Look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    //Not existing
    if(!course)  return res.status(404).send('The Course with given id was not found.');

    //Delete
    const index = courses.indexOf(course);
    courses.splice(index,1);
    //return the same course
    res.send(course);

 });

    app.get('/api/courses/:id',(req,res) => {
    const course =  courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The Course with given id was not found.');
    res.send(course);
}); 

 const port = process.env.PORT || 3000;
 app.listen(port, ()=> console.log(`Listening in port ${port} ...`)); 

