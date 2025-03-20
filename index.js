const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { title } = require('process');
const { render } = require('ejs');

app.set("view engine",'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.get('/',function(req, res){
    fs.readdir(`./files`, function(err,files){
        res.render("index",{files:files});
    })
})

app.get('/files/:filename',function(req, res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
        res.render("desc",{filename:req.params.filename,filedata:filedata})
    })
})

app.get('/edit/:filename',function(req,res){
    res.render('edit',{title:req.params.filename})
})

app.get('/del/:filename',function(req,res){
    res.render('del',{title:req.params.filename})
})

app.post('/create',function(req, res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.desc ,function(err){
        res.redirect("/")
    })
})
app.post('/del',function(req, res){
    fs.unlink(`./files/${req.body.title}`,function(err){
        res.redirect("/")
    })
})

app.post("/edit", function(req, res){
    fs.rename(`./files/${req.body.prvs}`,`./files/${req.body.new}`,function(err){
        res.redirect("/")
    })
})


app.listen(3000,function(){
    console.log("server running")
}); 