
const express = require('express');
const bodyParser = require('body-parser');
const client = require('./database')
const app = express();
app.use(bodyParser.json());
const port = 4000;


app.get('/user',async(req:any,res:any)=>{
       
    try {
     await client.query('SELECT * FROM user',(err:any,results:any)=>{
        if(err){
            throw err
        }
        res.send({
            statuscode:200,
            data:results.rows
        })
      })
       
    } catch (error) {
       res.send({ 
        statusCode:500,
        message:"Internal Server Error"
       }) 
    }
    
})

app.get('/user/:id',async(req:any,res:any)=>{
    const id = parseInt(req.params.id)
    try {
        await client.query('SELECT * FROM user WHERE id = $1',[id],(err:any,results:any)=>{
            if(err){
                throw err
            }
            res.send({
                statuscode:200,
                data:results.rows
            })
          })
    } catch (error) {
       res.send({
        statusCode:500,
        message:"Internal Server Error"
       }) 
    }
})

app.post('/add-user',async(req:any,res:any)=>{
    const {name,email}=req.body
    try {
        await client.query('INSERT INTO user (name,email) VALUES ($1,$2) RETURNING *',[name,email],(err:any,results:any)=>{
            if(err){
                throw err
            }
            res.send({
                statuscode:200,
                message:"User add succfully"
            })
        })
       
    } catch (error) {
       res.send({
        statusCode:500,
        message:"Internal Server Error"
       }) 
    }
})

app.listen(port,()=>{console.log('port run in 4000')})