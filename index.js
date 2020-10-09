//loading server
const express = require('express');
const app = express();
var mysql = require('mysql');
var path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.engine('ejs',require('ejs').__express)
app.use(express.static('public'));

var db = mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"akhi2111@",
    database:"images_database"
});

db.connect((err) => {
    if(err) console.log(err);
    else console.log("connected");
})
//routes
app.get('/',(req,res)=>{
    db.query('select * from images ;',(err,result) =>{
        if(err){
            res.render('error',{message:"fetch failed : internal server error :("})
        }
        else{
            
            res.render('index',{images:result})
        }
    })
})

app.get('/image:id', (req,res)=>{
    var id = req.params.id;
    db.query('select * from images;', (err,result)=>{
        if(err){
            console.log(err)
            res.render('error',{message:"internal sever error"})
        }
        else{
            console.log(result);
            res.render('image',{images:result,id:id})
        }
    })
})
//port listening
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);