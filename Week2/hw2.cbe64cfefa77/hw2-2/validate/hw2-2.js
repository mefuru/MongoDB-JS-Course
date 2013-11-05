var MongoClient =  require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
    if(err) throw err;
    var data = db.collection('data');
    var cursor = data.find({});
    cursor.sort([['State', 1], ['Temperature', -1]]);
    var currentState = '';
    cursor.each(function(err, doc) {
        if(err) throw err;
        if(doc == null) {
            return db.close();
        }
        if (!currentState || currentState != doc.State) {
            currentState = doc.State;
            var operator = { '$set' :{ 'month_high' : true }};
            db.collection('data').update( { '_id' : doc._id }, operator, function(err, updated) {
                if(err) throw err;
            });
        };
    });
});
