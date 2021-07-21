const Joi = require('joi');
const express = require("express");
const app = express();
app.use(express.json());
const courses =[
    {id:1, name:'C1'},
    {id:2, name:'C2'},
    {id:3, name:'C3'},
    {id:4, name:'C4'},
    {id:5, name:'C5'},
    {id:6, name:'C6'},
    {id:7, name:'C7'},
    {id:8, name:'C8'},
    {id:9, name:'C9'},
    {id:10, name:'C10'},
    {id:11, name:'C11'},
    {id:12, name:'C12'}
];

app.get('/', (req, res)=>{
    res.send('Hello world');
})

app.get('/api/courses', (req, res)=>{
    res.send(courses);
})

app.get('/api/courses/:id', (req, res)=>{

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)
       return res.status(404).send('Course dont exist');
    res.send(course);

});
app.get('/api/post/:year/:month', (req, res)=>{

    //res.send(req.params);
    res.send(req.query);

});

app.post('/api/courses', (req, res)=>{
    const {eoor} = validationRequest(req.body);
    if(error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
        const course = {
        id: courses.length +1,
        name : req.body.name
    };
    
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)
       return  res.status(404).send('Course dont exist');
    res.send(course);

    const {error} = validationRequest(req.body);
    if(error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    course.name  = req.body.name;
    console.log(course);
    res.send(course);
})

app.delete('/api/courses/:id', (req, res)=>{

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)
       return res.status(404).send('Course dont exist');
    const index =courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
})

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`listening...${port}`);
});


function validationRequest(course){
    const schema = {
        name : Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
    
}