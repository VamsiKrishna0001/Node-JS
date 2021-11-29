const express = require('express');
const router = express.Router();


 const courses = [
    {id: 1,name : 'course 1'},
    {id: 2,name : 'course 2'},
    {id: 3,name : 'course 3'},  
]
router.get('/',(req,res) => {
    res.send(courses);
});

router.post('/',(req,res) => {
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

router.put('/:id', (req, res) =>{
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

router.delete('/:id',(req,res) => {
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
router.get('/:id',(req,res) => {
   const course =  courses.find(c => c.id === parseInt(req.params.id));
   if(!course) return res.status(404).send('The Course with given id was not found.');
   res.send(course);
}); 

module.exports = router;