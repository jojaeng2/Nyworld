const {json, request, response} = require("express");
const express = require('express');
const app = express();
const fs = require('fs');
const url = require('url');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cookie = require('cookie');
const cookieParser = require('cookie-parser');
const fileUpload = require("express-fileupload");
const conn = mysql.createConnection({
    connectLimit : 10,
    host: 'localhost',
    port: '3306',
    user : 'root',
    password : 'hong971220!',
    database : 'nyworld',
    dateStrings : 'date'
});


app.locals.pretty = true;

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static('./public'));
app.use(express.static('./upload'));
app.use(express.static('./photozone'));
app.use(fileUpload({}));
app.use(express.static('./public/music'));
app.set('views','./views');
app.set('view engine','pug');


app.get('/',(req,res)=>{
    const home = 'SELECT profile_image,main_title,introduction FROM main';
    const comment = 'SELECT id,description,name,created FROM comment';
    const date = 'SELECT today,total FROM date WHERE id=1';
    const update_date = 'UPDATE date SET today=?,total=? WHERE id=1';

    if(req.cookies.visited === undefined){
        res.cookie("visited",'yes',{
            maxAge: 1000*60*30,
            httpOnly: true
        })
        conn.query(date,(err,now_result)=>{
            if(err){
                console.log(err);
                res.status(500).send("Internal Server Error");
            }
            else {
                const today = now_result[0].today;
                const total = now_result[0].total;
                conn.query(update_date,[today+1,total+1],(err,next_result)=>{
                    if(err){
                        console.log(err);
                        res.status(500).send("Internal Server Error");
                    }
                })
            }
        })
    }
    conn.query(home,(err,home__sql,fields)=>{
        if(err){
            console.log(err);
            res.status(500).send("Internal Server Error"); 
        } else {
            conn.query(comment,(err,friend_comment,fields)=>{
                if(err){
                    console.log(err);
                    res.status(500).send("Internal Server Error");
                }
                else{
                    conn.query(date,(err,date__sql,fields)=>{
                        if(err){
                            console.log(err);
                            res.status(500).send("Internal Server Error");
                        }
                        else{
                            res.render('home',{
                                title:home__sql[0].main_title,
                                introduction: home__sql[0].introduction, 
                                profile_image: home__sql[0].profile_image,
                                comments:friend_comment, 
                                date:date__sql
                            });
                        }
                    })
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

app.get('/edit',(req,res)=>{
    const home = 'SELECT profile_image,main_title,introduction FROM main';
    const comment = 'SELECT id,description,name,created FROM comment';
    const date = 'SELECT today,total FROM date WHERE id=1';
    conn.query(home,(err,home,fields)=>{
        if(err){
            console.log(err);
            res.status(500).send("Internal Server Error"); 
        } else {
            conn.query(comment,(err,result,fields)=>{
                if(err){
                    console.log(err);
                    res.status(500).send("Internal Server Error");
                }
                else{
                    conn.query(date, (err, date__sql) => {
                        if(err) {
                            console.log(err);
                            res.status(500).send("Internal Server Error");
                        }
                        else {
                            res.render('update',{
                                title:home[0].main_title,
                                introduction: home[0].introduction,
                                profile_image: home[0].profile_image, 
                                comments:result,
                                date : date__sql
                            });
                        }
                    })
                }
            })
        }
    })
})

app.post('/edit',(req,res)=>{
    let sampleFile;
    let uploadPath;
    const introduction = req.body.introduction;
    const title = req.body.title;
    const image__sql = "UPDATE main SET main_title=?,introduction=?,profile_image = ? WHERE id = 1";
    const null__image__sql = "UPDATE main SET main_title=?,introduction=? WHERE id = 1";
    
    if(!req.files || Object.keys(req.files) === 0){
        conn.query(null__image__sql,[title,introduction],(err)=>{
            if(err){
                console.log(err);
                res.status(500).send("Internal Server Error");
            } else {
                res.redirect('/');
            }
        })
    }
    else
    {
        sampleFile = req.files.sampleFile;
        uploadPath = __dirname + '/upload/' + sampleFile.name;
        sampleFile.mv(uploadPath, (err)=>{
            if(err) return res.status(500).send(err);
            conn.query(image__sql,[title,introduction,sampleFile.name],(err)=>{
                if(err){
                    console.log(err);
                    res.status(500).send("Internal Server Error");
                } else {
                    res.redirect('/');
                }
            })
        })   
    }
})

app.get('/diary',(req,res)=>{
    const home = 'SELECT profile_image,main_title,introduction FROM main';
    const date = 'SELECT today,total FROM date WHERE id=1';
    const update_date = 'UPDATE date SET today=?,total=? WHERE id=1';
    const diary = 'SELECT id,description,created FROM diary ORDER BY created DESC';
    if(req.headers.cookie === undefined){
        res.cookie("visited",'yes',{
            maxAge: 1000*60*30,
            httpOnly: true
        })
        conn.query(date,(err,now_result)=>{
            if(err){
                console.log(err);
                res.status(500).send("Internal Server Error");
            }
            else {
                const today = now_result[0].today;
                const total = now_result[0].total;
                conn.query(update_date,[today+1,total+1],(err,next_result)=>{
                    if(err){
                        console.log(err);
                        res.status(500).send("Internal Server Error");
                    }
                })
            }
        })
    }
    conn.query(home,(err,home__sql,fields)=>{
        if(err){
            console.log(err);
            res.status(500).send("Internal Server Error"); 
        } else {
            conn.query(date,(err,date__sql,fields)=>{
                if(err){
                    console.log(err);
                    res.status(500).send("Internal Server Error");
                }
                else{
                    conn.query(diary,(err,diary__sql)=>{
                        if(err){
                            console.log(err);
                            res.status(500).send("Internal Server Error");
                        }
                        else{
                            res.render('diary',{
                                title:home__sql[0].main_title,
                                introduction: home__sql[0].introduction, 
                                profile_image: home__sql[0].profile_image,
                                date:date__sql,
                                diary:diary__sql
                            })
                        }
                    })
                }
            })
        }
    })
})

app.get('/add',(req,res)=>{
    const home = 'SELECT profile_image,main_title,introduction FROM main';
    const date = 'SELECT today,total FROM date WHERE id=1';
    const diary = 'SELECT id,description,created FROM diary';
    if(req.headers.cookie === undefined){
        res.cookie("visited",'yes',{
            maxAge: 1000*60*30,
            httpOnly: true
        })
        conn.query(date,(err,now_result)=>{
            if(err){
                console.log(err);
                res.status(500).send("Internal Server Error");
            }
            else {
                const today = now_result[0].today;
                const total = now_result[0].total;
                conn.query(update_date,[today+1,total+1],(err,next_result)=>{
                    if(err){
                        console.log(err);
                        res.status(500).send("Internal Server Error");
                    }
                })
            }
        })
    }
    conn.query(home,(err,home__sql,fields)=>{
        if(err){
            console.log(err);
            res.status(500).send("Internal Server Error"); 
        } else {
            conn.query(date,(err,date__sql,fields)=>{
                if(err){
                    console.log(err);
                    res.status(500).send("Internal Server Error");
                }
                else{
                    conn.query(diary,(err,diary__sql)=>{
                        if(err){
                            console.log(err);
                            res.status(500).send("Internal Server Error");
                        }
                        else{
                            res.render('diary_add',{
                                title:home__sql[0].main_title,
                                introduction: home__sql[0].introduction, 
                                profile_image: home__sql[0].profile_image,
                                date:date__sql,
                                diary:diary__sql
                            })
                        }
                    })
                }
            })
        }
    })
})

app.post('/add',(req,res)=>{
    const description = req.body.description;
    const sql = "INSERT INTO diary(description,created) VALUES(?,NOW())";
    conn.query(sql,[description],(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.redirect('/diary');
        }
    })
})

app.post('/diary/delete/:id',(req,res)=>{
    const id = req.params.id;
    const diary__sql = 'DELETE FROM diary WHERE id=?';
    conn.query(diary__sql,[id],(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
        else {
            res.redirect("/diary");
        }
    })
})

app.get('/photo', (req, res) => {
    const home = 'SELECT profile_image,main_title,introduction FROM main';
    const date = 'SELECT today,total FROM date WHERE id=1';
    const update_date = 'UPDATE date SET today=?,total=? WHERE id=1';
    const photo = 'SELECT id,title,created,photo__root FROM photo ORDER BY created DESC';
    if(req.headers.cookie === undefined){
        res.cookie("visited",'yes',{
            maxAge: 1000*60*30,
            httpOnly: true
        })
        conn.query(date,(err,now_result)=>{
            if(err){
                console.log(err);
                res.status(500).send("Internal Server Error");
            }
            else {
                const today = now_result[0].today;
                const total = now_result[0].total;
                conn.query(update_date,[today+1,total+1],(err,next_result)=>{
                    if(err){
                        console.log(err);
                        res.status(500).send("Internal Server Error");
                    }
                })
            }
        })
    }
    conn.query(home,(err,home__sql,fields)=>{
        if(err){
            console.log(err);
            res.status(500).send("Internal Server Error"); 
        } else {
            conn.query(date,(err,date__sql,fields)=>{
                if(err){
                    console.log(err);
                    res.status(500).send("Internal Server Error");
                }
                else{
                    conn.query(photo, (err, photos) =>{
                        if(err) {
                            console.log(err);
                            res.status(500).send("Internal Server Error");
                        }
                        else{
                            res.render('photo',{
                                title:home__sql[0].main_title,
                                introduction: home__sql[0].introduction, 
                                profile_image: home__sql[0].profile_image,
                                date:date__sql,
                                photos : photos
                            });
                        }
                    })
                }
            })
        }
    })
})

app.get('/photo_add', (req, res) => {
    const home = 'SELECT profile_image,main_title,introduction FROM main';
    const date = 'SELECT today,total FROM date WHERE id=1';
    conn.query(home,(err,home__sql,fields)=>{
        if(err){
            console.log(err);
            res.status(500).send("Internal Server Error"); 
        } else {
            conn.query(date,(err,date__sql,fields)=>{
                if(err){
                    console.log(err);
                    res.status(500).send("Internal Server Error");
                }
                else{
                    res.render('photo_add',{
                        title:home__sql[0].main_title,
                        introduction: home__sql[0].introduction, 
                        profile_image: home__sql[0].profile_image,
                        date:date__sql
                    });
                }
            })
        }
    })
})

app.post('/photo_add', (req, res) => {
    let photoFile;
    let uploadPath;
    const title = req.body.title;
    const photo__sql = "INSERT INTO photo(title, created, photo__root) VALUES(?, NOW(), ?)";

    if(!req.files || Object.keys(req.files) === 0) {
        return res.redirect('/photo');
    }
    else {
        photoFile = req.files.photoFile;
        uploadPath = __dirname + '/photozone/' + photoFile.name;
        photoFile.mv(uploadPath, (err)=>{
            if(err) return res.status(500).send(err);
            conn.query(photo__sql, [title, photoFile.name], (err)=>{
                if(err) {
                    console.log(err);
                    res.status(500).send("Internal Server Error");
                }
                else {
                    res.redirect("/photo");
                }
            })
        })
    }
})

app.post("/photo/delete/:id", (req, res)=>{
    const id = req.params.id;
    const photo = "DELETE FROM photo WHERE id=?";
    conn.query(photo,[id],(err,result)=>{
        if(err) return res.status(500).send("Internal  Server Error");
        else {
            res.redirect("/photo");
        }
    })
})

app.listen(3000,()=>console.log("Express app is learning!"));