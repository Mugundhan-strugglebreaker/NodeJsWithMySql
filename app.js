const express = require('express')
const res = require('express/lib/response')
const mysql = require('mysql')

const app = express()

app.use(express.json())
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//Connecting Database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database : "sample"
})
db.connect((err) =>{
    if(err){
        console.log("Error in Connecting Database");
    }else{
    console.log('Connected Successfully');
    }
})

//Creating Database
app.get("/createDb",(req,res)=>{
    let sql = 'CREATE DATABASE sample1'
    db.query(sql,(err,result)=>{
        if(err){
            res.send(err)
            res.end()
        }else{
            res.send(result)
            res.end()
        }
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
                res.end()
            }else{
                res.send(result)
                res.end()
            }
            })
        }else{
            res.send(result)
            res.end()
        }
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
        }else{
        res.send(result)
        res.end()
        }
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
    let sql = 'SELECT * from user';
    let query = db.query(sql,(err,result)=>{
        if(err){
            res.send(err)
            res.end()
        }
        res.send(result)
        res.end()
    })
})

app.listen(9000,(err)=>{
    if(err){
        console.log("Error in Connecting server")
    }
    console.log("Server Started at port no:9000")
    
})