const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const mysql=require('mysql');
//const swaggerUi = require('swagger-ui-express');
//const swaggerJsdoc = require('swagger-jsdoc');


const app=express();
app.use(cors());
app.use(bodyParser.json());

// // Swagger setup
// const swaggerOptions = {
//     swaggerDefinition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'Course Management API',
//             version: '1.0.0',
//             description: 'API documentation for the Course Management System'
//         },
//         servers: [
//             {
//                 url: 'http://localhost:3001',
//                 description: 'Local server'
//             }
//         ]
//     },
//     apis: ['./index.js'] // Specify the path to your API docs
// };

//const swaggerDocs = swaggerJsdoc(swaggerOptions);
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'course_mgnt',
    port:3306

});

db.connect(err=>{
    if(err)throw err;
    console.log('MySQL connected...');
});

//login
app.post('/login',(req,res)=>{
    const{email,password}=req.body;
    const query='select * from user where email=? and password=?';
    db.query(query,[email,password],(err,result)=>{
        if(err)throw err;
        if(result.length>0){
            res.json({sucess:true});
        }else{
            res.json({sucess:false});
        }
    });
});

//fetch all courses
app.get('/courses',(req,res)=>{
    const query='select * from course';
    db.query(query,(err,results)=>{
        if(err)throw err;
        res.json(results);
    });
});

//Add a new course
app.post('/courses',(req,res)=>{
    const{cname,fees,duration}=req.body;
    const query='insert into course(cname,fees,duration) values (?,?,?)';
    db.query(query,[cname,fees,duration],(err,results)=>{
        if(err)throw err;
        res.json({success:true,message:'New course added succesfully'});
    });
});

// Update course
app.put('/courses/:id',(req,res)=>{
    const{id}=req.params;
    const{cname,fees,duration}=req.body;
    const query='update course set cname=?,fees=?,duration=? where cid=?';
    db.query(query,[cname,fees,duration,id],(err,results)=>{
        if(err) throw err;
        res.json({success:true,message:'Course updated succesfully'});
    });
});
// Delete course
app.delete('/courses/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM course WHERE cid = ?';
    db.query(query, [id], (err, results) => {
        if (err) throw err;
        res.json({ success: true, message: 'Course deleted successfully' });
    });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});