var express=require('express');

var router=express.Router();

router.get('/user',function(req,res,next){
    res.send('api-user');
});

module.exports=router;//把router的结果作为模块的输出返回出去！