
var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var path=require('path');
var pg=require('pg');

app.use(express.static(path.join(__dirname,'/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//database connection
var url='postgres://postgres:password@localhost/feedbackdb';
var client=new pg.Client(url);
client.connect(function(err){
    if(err){
        console.log('datatbase error connection');
    }else
    console.log('connected');
});
//

//adding the values to database
app.post('/details',function(req,res){
var user=[
    username=req.body.username,
    email=req.body.emailaddr,
    comments=req.body.coment
]
    client.query('INSERT INTO customers(username,email,comments) VALUES($1,$2,$3) RETURNING*',user,function(err,result){
        if(err){
            console.log('error in inserting values');
        }else{
            console.log('values inserted');
            res.send(result.rows);
        }
    });
});

app.listen(3000);
