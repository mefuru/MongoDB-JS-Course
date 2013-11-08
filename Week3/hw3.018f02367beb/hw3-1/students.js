var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
    if(err) throw err;
    var data = db.collection('students');
    var cursor = data.find();
    var idArray = [];
    var newScoresArray = [];
    cursor.each(function(err, doc) {
        if(err) throw err;
        if(doc == null) {
            updateDB(db, idArray, newScoresArray);
            return db.close();
        }
        var lowestIndex = '';
        var lowestScore;
        for (var i = 0; i < doc.scores.length; i++) {
            if (doc.scores[i].type == "homework") {
                if (lowestIndex == '' || doc.scores[i].score < lowestScore) {
                    lowestIndex = i;
                    lowestScore = doc.scores[i].score;
                }
            }
        }
        var newScores = doc.scores;
        newScores.splice(lowestIndex, 1);
        idArray.push(doc._id);
        newScoresArray.push(newScores);
    });
    
    
});

var updateDB = function(db, idArray, newScoresArray) { 
    for (var i = 0; i < idArray.length; i++) {
        var query = {"_id" : idArray[i]};
        var operator = { $set : {"scores" : newScoresArray[i]} };
        db.collection('students').update(query, operator, function(err, updated) {
            if(err) throw err;
        });
    }
};
