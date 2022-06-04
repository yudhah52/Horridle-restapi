'use strict';

var response = require('./res');
var connection = require('./koneksi');
var getRawBody = require('raw-body')

exports.index = function (req, res) {
    response.ok("Aplikasi REST API berjalan", res);
};

//menampilkan semua riddle dan diurut berdasarkan tanggal
exports.showallriddle = function (req, res) {
    connection.query('SELECT *FROM riddle_table ORDER BY date DESC', function (error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            response.ok(rows, res);
        }
    });
}

//menampilkan detail riddle berdasarkan id
exports.showriddlebyid = function (req, res) {
    var id_riddle = req.body.id_riddle;
    connection.query('SELECT *FROM riddle_table WHERE id_riddle = ?', [id_riddle],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, res);
            }
        }
    );
}

//menambahkan riddle
exports.addriddle = function (req, res) {
    var id_user_author = req.body.id_user_author;
    var title = req.body.title;
    var riddle_text = req.body.riddle_text;
    var riddle_answer = req.body.riddle_answer;
    var date = req.body.date;

    connection.query(
        'INSERT INTO riddle_table (id_user_author,title,riddle_text,riddle_answer,date) VALUES(?,?,?,?,?)',
        [id_user_author,title,riddle_text,riddle_answer,date],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok('Berhasil menambahkan riddle!', res);
            }
        }
    );
};

//Edit riddle
exports.editriddle = function (req, res) {
    var id_riddle = req.body.id_riddle;
    var title = req.body.title;
    var riddle_text = req.body.riddle_text;
    var riddle_answer = req.body.riddle_answer;
    var date = req.body.date;

    connection.query(
        'UPDATE riddle_table SET title = ?, riddle_text = ?, riddle_answer = ?, date = ? WHERE id_riddle = ?',
        [title, riddle_text, riddle_answer, date, id_riddle],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil mengubah riddle", res);
            }
        }
    );
};

//menghapus riddle berdasarkan id
exports.deleteriddle = function(req,res){
    var id_riddle = req.body.id_riddle;

    connection.query('DELETE FROM riddle_table WHERE id_riddle=?', [id_riddle],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil menghapus riddle", res);
            }
        }
    );
};

//menampilkan detail user
exports.userdetail = function (req, res) {
    var id_user = req.body.id_user;
    connection.query('SELECT *FROM user_table WHERE id_user = ?', [id_user],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, res);
            }
        }
    );
}

//menampilkan user riddles
exports.userriddles = function (req, res) {
    var id_user_author = req.body.id_user_author;
    connection.query('SELECT *FROM riddle_table WHERE id_user_author = ?', [id_user_author],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, res);
            }
        }
    );
}

//menambahkan comment
exports.commentriddle = function (req, res) {
    var id_riddle = req.body.id_riddle;
    var id_user = req.body.id_user;
    var comment = req.body.comment;
    var date = req.body.date;

    connection.query(
        'INSERT INTO comment_table (id_riddle,id_user,comment,date) VALUES(?,?,?,?)',
        [id_riddle,id_user,comment,date],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok('Berhasil menambahkan comment!', res);
            }
        }
    );
}

//menghapus comment
exports.deletecomment = function (req, res) {
    var id_comment = req.body.id_comment;

    connection.query(
        'DELETE FROM comment_table WHERE id_comment=?', 
        [id_comment],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil menghapus comment", res);
            }
        }
    );
}

//menampilkan semua comment
exports.riddlecomments = function (req, res) {
    var id_riddle = req.body.id_riddle;

    connection.query('SELECT *FROM comment_table WHERE id_riddle = ?', [id_riddle],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, res);
            }
        }
    );
}

// //menampilkan matakuliah group
// exports.tampilgroupmatakuliah = function(req,res){
//     connection.query('SELECT mahasiswa.id_mahasiswa, mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakuliah.matakuliah, matakuliah.sks FROM krs JOIN matakuliah JOIN mahasiswa WHERE krs.id_matakuliah = matakuliah.id_matakuliah AND krs.id_mahasiswa = mahasiswa.id_mahasiswa ORDER BY mahasiswa.id_mahasiswa;',
//         function(error,rows,fields){
//             if(error){
//                 console.log(error);
//             }else{
//                 response.oknested(rows,res);
//             }
//         }
//     )
// };