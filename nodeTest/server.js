const http = require("http");
const fs = require("fs");
const queryString = require('querystring');
const urlLid = require('url');

let user = {};

var server = http.createServer(function (req, res) {

    var str = '';
    req.on('data', function (data) {
        str += data;
    });

    //localhost:8888/act?user
    req.on('end', function () {
        let obj = urlLid.parse(req.url, true);

        let url = obj.pathname;
        let GET = obj.query;
        let POST = queryString.parse(str);
        console.log(url);
        if (url == "/user") {
            console.log("111");
            switch (GET.act) {
                case('reg'):
                    if (user[GET.user]) {
                        res.write('{"ok":false,"msg": "用户已存在"}');
                    } else {
                        user[GET.user] = GET.pass;
                        res.write('{"ok":true,"msg": "注册成功"}');
                    }
                    break;
                case ('login'):
                    if (user[GET.user] == GET.pass) {
                        res.write('{"ok":false,"msg": "登录成功"}');
                    } else if (!user[GET.user] == GET.pass) {
                        res.write('{"ok":false,"msg": "用户名或密码错误"}');
                    } else if (!user[GET.user]) {
                        res.write('{"ok":false,"msg": "用户不存在"}');
                    } else {
                        res.write('{"ok":true,"msg": "登陆成功"}');
                    }
                    break;
                default :
                    res.write('{"ok":false,"msg": "未知的act"}');
            }
            res.end();
        } else {
            var file_name = './www' + url;
            fs.readFile(file_name, function (err, data) {
                if (err) {
                    res.write('404');
                } else {
                    res.write(data);
                }
                res.end();
            });

        }
    });
});

server.listen(8889);

