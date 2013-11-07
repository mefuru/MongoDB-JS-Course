var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
    if(err) throw err;
    var data = db.collection('students');
    var cursor = data.find({});
    cursor.each(function(err, doc) {
        if(err) throw err;
        var scores = doc.scores;
        var lowestIndex = '';
        var lowestScore;
        for (var i = 0; i < scores.length; i++) {
            if (doc.scores[i].type == "homework") {
                if (lowestIndex == '' || doc.scores[i].score < lowestScore) {
                    lowestIndex = i;
                    lowestScore = doc.scores[i].score;
                }
            }
        }
        var newScores = doc.scores;
        newScores.splice(lowestIndex, 1);
        console.log(newScores, lowestIndex, doc._id);
    });
    
});
