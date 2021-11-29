
const Joi = require('joi');
const express = require('express');
// const bodyParser = require('body-parser');
const { func } = require('joi'); 
const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// const jsonParser = bodyParser.json();
// const urlencodedParser = bodyParser.urlencoded({
//     extended: false
//  });

const genres = [
    {id:1,name :"Action"},
    {id:2,name :"Thriller"},
    {id:3,name :"Adventure"},
    {id:4,name :"Comedy"},
    {id:5,name :"Romance"},
]
app.get('/api/genres',(req,res) => res.send(genres));

app.get('/api/genres/:id',(req,res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The Course with the given id is not found');
    res.send(genre);
})

app.post('/api/genres',(req,res) => {
    // validate
    const { error } = validateGenre(req.body);
    // Bad request 
    if(error) return res.status(404).send(error.details[0].message);

    const genre = {
        id : genres.length+1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:id',(req,res) =>{
    //Look Up the Genres
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    // if not 404
    if(!genre) return res.status(404).send('The Course with the given id is not found');
   // validate
    const { error } = validateGenre(req.body);
    // Bad request 
    if(error) return res.status(404).send(error.details[0].message);
    //update 
    genre.name = req.body.name;
    res.send(genre);

});

app.delete('/api/genres/:id',(req,res) => {
//Look Up the course
const genre = genres.find(c => c.id === parseInt(req.params.id));
//If not 404
if(!genre) return res.status(404).send('The Course with the given id is not found');
//delete
const index = genres.indexOf(genre);
genres.splice(index,1);
//respond
res.send(genre);
});




function validateGenre(genr){
    const schema = Joi.object({
        name : Joi.string().min(3).required()
    });
    return schema.validate(genr);
}

const port = process.env.PORT || 4000;
app.listen(port,()=> console.log(`Listening on port ${port} ...`));


