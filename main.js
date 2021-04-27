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
    database : 'nyworld'
});

app.locals.pretty = true;

app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static('./public'));

app.set('views','./views');
app.set('view engine','pug');

app.get('/',(req,res)=>{
    const sql = 'SELECT title,introduction FROM home';
    conn.query(sql,(err,result,fields)=>{
        if(err){
            console.log(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.render('home',{title:result[0].title,introduction: result[0].introduction});
        }
    })
})

app.get('/title/edit',(req,res)=>{
    const sql = "SELECT title,introduction FROM home";
    conn.query(sql,(err,result,fields)=>{
        if(err){
            console.log(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.render('update',{title:result[0].title,introduction:result[0].introduction});
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