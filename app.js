const express = require('express')
const mysql = require('mysql')

const app = express()

app.use(express.json())

//Connecting Database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database : "nodemysql"
})
db.connect((err)=>{
    if(err){
        console.log("Error in Connecting Mysql")
    }
    console.log("Mysql Connected Successfully")
})

//Creating Database
app.get("/createDb",(req,res)=>{
    let sql = 'CREATE DATABASE nodemysql'
    db.query(sql,(err,result)=>{
        if(err){
            res.send("Error in Db",err)
        }
        res.send(result)
        res.end()
    })
})
//Creating Table
app.get("/createTable",(req,res)=>{
    let checkTable = 'SELECT 1 from user'
    db.query(checkTable,(err,result)=>{
        if(err){
            let sql = 'CREATE TABLE USER(id int AUTO_INCREMENT,name varchar(255),phone varchar(255),PRIMARY KEY(id))';
            db.query(sql,(err,result)=>{
            if(err){
                res.send(err)
            }
            res.send(result)
            res.end()
            })
        }
        res.send(result)
        res.end()
    })
    
   // res.send("Hi")
})
// Insert a New User
app.post("/createUser",(req,res)=>{
    console.log(req.body)
    let sql = 'Insert into user(name,phone) values(?,?)'
    let query = db.query(sql,[req.body.name,req.body.phone],(err,result)=>{
        if(err){
            res.send(err)
            res.end()
        }
        res.send(result)
        res.end()
    })
})
// Update a User
app.put("/updateUser/:id",(req,res)=>{
    console.log(req.params.id)
    id = req.params.id;
    let sql = 'Update user set name = ? ,phone = ? where id ='+id;
    let query = db.query(sql,[req.body.name,req.body.phone],(err,result)=>{
        if(err){
            res.send(err)
            res.end()
        }
        res.send(result)
        res.end()
    })
})
// Delete a User
app.delete("/deleteUser/:id",(req,res)=>{
    console.log(req.params.id)
    id = req.params.id;
    let sql = 'Delete from user where id ='+id;
    let query = db.query(sql,(err,result)=>{
        if(err){
            res.send(err)
            res.end()
        }
        res.send(result)
        res.end()
    })
})
//Get a User
app.get("/getUser/:id",(req,res)=>{
    console.log(req.params.id)
    id = req.params.id;
    let sql = 'SELECT * from user where id ='+id;
    let query = db.query(sql,(err,result)=>{
        if(err){
            res.send(err)
            res.end()
        }
        res.send(result)
        res.end()
    })
})
app.listen(3000,()=>{
    console.log("Server Started at port no:3000")
})