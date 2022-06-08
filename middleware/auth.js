var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('MD5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');
const { token } = require('morgan');


//controller register
exports.registration = function(req,res){
    var post = {
        img_profile : req.body.img_profile,
        name : req.body.name,
        email : req.body.email,
        username : req.body.username,
        password : md5(req.body.password),
    };

    var query = "SELECT email FROM ?? WHERE ??=?";
    var table = ["user_table","email", post.email];

    query = mysql.format(query,table);

    // console.log(query);

    connection.query(query, function(error,rows){
        if(error){
            console.log(error);
        }else{
            if(rows.length == 0){
                var query = "INSERT INTO ?? SET ?";
                var table = ["user_table"];
                query = mysql.format(query,table);
                connection.query(query, post, function(error,rows){
                    if(error){
                        console.log(error);
                    }else{
                        var data = {
                            'succcess':true,
                            'values':"Berhasil menambahkan data user baru",
                            'my_user_id':rows.insertId
                        };
                    
                        res.json(data);
                        res.end();
                    }
                });
            }else{
                response.ok("Email sudah terdaftar",res);
            }
        }
    });
};

//controller untuk login
exports.login = function(req,res){
    var post = {
        email : req.body.email,
        password : req.body.password,
    };

    var query = "SELECT *FROM ?? WHERE ??=? AND ??=?";
    var table = ["user_table","password",md5(post.password),"email",post.email];

    query = mysql.format(query,table);
    connection.query(query, function(error,rows){
        if(error){
            console.log(error)
        }else{
            if(rows.length == 1){
                console.log(rows[0].id_user);
                res.json({
                    success: true,
                    message: 'Berhasil login',
                    my_user_id: rows[0].id_user
                    // token: token,
                    // currUser: data.id_user
                });
                // var token = jwt.sign({rows},config.secret,{
                //     expiresIn : 1440
                // });
                // id_user = rows[0].id;

                // var data ={
                //     id_user : id_user,
                //     access_token : token,
                //     ip_address : ip.address()
                // };

                // var query = "INSERT INTO ?? SET ?";
                // var table = ["akses_token"];

                // query = mysql.format(query,table);
                // connection.query(query,data,function(error,rows){
                //     if(error){
                //         console.log(error);
                //     }else{
                //          res.json({
                //              success: true,
                //              message: 'Token JWT tergenerate',
                //              token: token,
                //              currUser: data.id_user
                //          });
                //     }
                // });
            }else{
                res.json(
                    {
                        success:false,
                        message:"Email atau password salah!"
                    }
                );
            }
        }
    });
}
