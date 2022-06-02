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
    var riddle_text = req.body.riddle_text;
    var riddle_answer = req.body.riddle_answer;
    var date = req.body.date;

    connection.query(
        'INSERT INTO riddle_table (id_user_author,riddle_text,riddle_answer,date) VALUES(?,?,?,?)',
        [id_user_author,riddle_text,riddle_answer,date],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok('Berhasil menambahkan data!', res);
            }
        }
    );
};

// //Mengubah data berdasarkan id
// exports.ubahmahasiswa = function (req, res) {
//     var id = req.body.id_mahasiswa;
//     var nim = req.body.nim;
//     var nama = req.body.nama;
//     var jurusan = req.body.jurusan;

//     connection.query(
//         'UPDATE mahasiswa SET nim = ?, nama = ?, jurusan = ? WHERE id_mahasiswa = ?',
//         [nim, nama, jurusan, id],
//         function (error, rows, fields) {
//             if (error) {
//                 console.log(error);
//             } else {
//                 response.ok("Berhasil mengubah data", res);
//             }
//         }
//     );
// };

// //menghapus data berdasarkan id
// exports.hapusmahasiswa = function(req,res){
//     var id = req.body.id_mahasiswa;

//     connection.query('DELETE FROM mahasiswa WHERE id_mahasiswa=?', [id],
//         function (error, rows, fields) {
//             if (error) {
//                 console.log(error);
//             } else {
//                 response.ok("Berhasil menghapus data", res);
//             }
//         }
//     );
// };

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