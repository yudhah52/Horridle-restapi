'use strict';

exports.ok = function(values,res){
    var data = {
        'succcess':true,
        'values':values
    };

    res.json(data);
    res.end();
};

exports.gagal = function(errorMessage,res){
    var data = {
        'succcess':false,
        'values':errorMessage
    };

    res.json(data);
    res.end();
};