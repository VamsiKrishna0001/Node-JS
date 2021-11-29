
const express = require('express');
const router = express.Router();



const genres = [
    {id:1,name :"Action"},
    {id:2,name :"Thriller"},
    {id:3,name :"Adventure"},
    {id:4,name :"Comedy"},
    {id:5,name :"Romance"},
]
router.get('/',(req,res) => res.send(genres));

router.get('/:id',(req,res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The Course with the given id is not found');
    res.send(genre);
})

router.post('/',(req,res) => {
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

router.put('/:id',(req,res) =>{
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
router.delete('/:id',(req,res) => {
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
module.exports = router;