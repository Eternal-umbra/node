const express = require('express');
const ejs  =require("ejs");
const path = require("path");

//系统路由
const main = require('./routes/main');
const admin = require('./routes/admin');
const api = require('./routes/api');

let app = express();
console.log(__dirname);

//注册ejs模板为html页。简单的讲，就是原来以.ejs为后缀的模板页，现在的后缀名可以//是.html了
app.engine('.html', ejs.__express);

//设置模板文件文件夹,__dirname为全局变量,表示网站根目录
app.set('views',path.join(__dirname,'views'));

//设置视图模板的默认后缀名为.html,避免了每次res.Render("xx.html")的尴尬
app.set('view engine','html');

app.use('/public',express.static(__dirname+'/public'));

/*app.use('/',function(req,res){
    //res.send('<h1>first page</h1>');
    res.render('index',{

    });
});*/

app.use('/admin',admin);
app.use('/api',api);
//app.use('/admin',routes);
app.use('/', main);


app.listen(12345,function(){
    console.log("server is running");
});