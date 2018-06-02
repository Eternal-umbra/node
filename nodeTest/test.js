let queryString = require('querystring');

let string = "www.baidu.com/aaa?user=lz&pass=123";

let result = queryString.parse(string);

console.log(result);
