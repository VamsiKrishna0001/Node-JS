 var express =   require('express');

 var app = express();
 const courses = [
     {id: 1,name : 'course 1'},
     {id: 2,name : 'course 2'},
     {id: 3,name : 'course 3'},
 ]
 app.get('/',(req,res)=>{
     res.send('Hello world!!')
 });

 app.get('/api/courses',(req,res) => {
     res.send(courses);
 });

//  app.get('/api/posts/:year/:month', (req,res) => {
//         res.send(req.params.month);
//  });

app.get('/api/courses/:id',(req,res) => {
    const course =  courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.send(404).send('The Course with given id was not found.');
    res.send(course);
}); 

 const port = process.env.PORT || 3000;
 app.listen(port, ()=> console.log(`Listening in port ${port} ...`)); 

