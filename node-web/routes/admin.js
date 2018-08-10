const express=require('express');
const router = express.Router();

router.get('/user',function(req,res){
    res.send('123141312');
});


module.exports=router;