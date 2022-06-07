'use strict';

const { json } = require('express/lib/response');

module.exports = function(app){
    var jsonku = require('./controller');

    app.route('/')
        .post(jsonku.index);

    app.route('/get-user-detail')
        .post(jsonku.userdetail);

    app.route('/get-all-riddle')
        .post(jsonku.showallriddle);

    app.route('/get-detail-riddle')
        .post(jsonku.showriddlebyid);

    app.route('/add-riddle')
        .post(jsonku.addriddle);
    
    app.route('/edit-riddle')
        .post(jsonku.editriddle);

    app.route('/delete-riddle')
        .post(jsonku.deleteriddle);

    app.route('/get-user-riddles')
        .post(jsonku.userriddles);

    app.route('/comment-riddle')
        .post(jsonku.commentriddle);
    
    app.route('/delete-comment')
        .post(jsonku.deletecomment);
        
    app.route('/get-riddle-comments')
        .post(jsonku.riddlecomments);

    app.route('/edit-profile')
        .post(jsonku.editprofile);

    // app.route('/tampilmatakuliah')
    //     .post(jsonku.tampilgroupmatakuliah);
};