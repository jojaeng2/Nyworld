const {json, request, response} = require("express");
const express = require('express');
const app = express();
const mysql = require('mysql');
const conn = mysql.createConnection({
    connectLimit : 10,
    host: 'localhost',
    port: '3306',
    user : 'root',
    password : 'hong971220!',
    database : 'nyworld',
    dateStrings : 'date'
});

const music_search = document.getElementById('music-box__search');

music_search.addEventListener("click", (event)=>{
    alert("1");
    const music = "SELECT title, singer FROM music";
    conn.query(music, (err, music_sql)=>{
        if(err) {
            console.log(err);
            response.status(500).send("Can't read music_sql");
        }
        console.log();
    }) 
})