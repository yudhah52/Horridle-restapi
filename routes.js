'use strict';

const { json } = require('express/lib/response');

module.exports = function(app){
    var jsonku = require('./controller');

    app.route('/')
        .post(jsonku.index);

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

    // app.route('/tampilmatakuliah')
    //     .post(jsonku.tampilgroupmatakuliah);
};