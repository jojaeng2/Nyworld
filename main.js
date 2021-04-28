const {json} = require("express");
const express = require('express');
const app = express();
const fs = require('fs');
const url = require('url');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const conn = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user : 'root',
    password : 'hong971220!',
    database : 'nyworld',
    dateStrings : 'date'
});

app.locals.pretty = true;

app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static('./public'));

app.set('views','./views');
app.set('view engine','pug');

app.get('/',(req,res)=>{
    const sql1 = 'SELECT title,introduction FROM home';
    const sql2 = 'SELECT id,description,name,created FROM comment';
    conn.query(sql1,(err,result1,fields)=>{
        if(err){
            console.log(err);
            res.status(500).send("Internal Server Error"); 
        } else {
            conn.query(sql2,(err,result,fields)=>{
                if(err){
                    console.log(err);
                    res.status(500).send("Internal Server Error");
                }
                else{
                    res.render('home',{title:result1[0].title,introduction: result1[0].introduction, comments:result});
                }
            })
        }
    })
})

app.post('/',(req,res)=>{
    const description = req.body.description;
    const name = req.body.name;
    const sql = "INSERT INTO comment(description, name, created) VALUES(?,?,NOW())"
    conn.query(sql,[description,name],(err,result,fields)=>{
        if(err){
            console.log(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.redirect('/');
        }
    })
})

app.post('/delete/:id',(req,res)=>{
    const id = req.params.id;
    const sql = "DELETE FROM comment WHERE id=?";
    conn.query(sql,[id],(err,result,fields)=>{
        if(err){
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
        res.redirect('/');
    })
})

app.get('/title/edit',(req,res)=>{
    const sql1 = 'SELECT title,introduction FROM home';
    const sql2 = 'SELECT id,description,name,created FROM comment';
    conn.query(sql1,(err,result1,fields)=>{
        if(err){
            console.log(err);
            res.status(500).send("Internal Server Error"); 
        } else {
            conn.query(sql2,(err,result,fields)=>{
                if(err){
                    console.log(err);
                    res.status(500).send("Internal Server Error");
                }
                else{
                    res.render('update',{title:result1[0].title,introduction: result1[0].introduction, comments:result});
                }
            })
        }
    })
})

app.post('/title/edit',(req,res)=>{
    const introduction = req.body.introduction;
    const title = req.body.title;
    const sql = "UPDATE home SET title=?,introduction=?";
    conn.query(sql,[title,introduction],(err,result,fields)=>{
        if(err){
            console.log(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.redirect('/');
        }
    })
})


app.listen(3000,()=>console.log("Express app is learning!"));