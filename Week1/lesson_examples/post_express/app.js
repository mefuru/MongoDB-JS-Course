var express = require('express')
  , app = express()
  , cons = require('consolidate');

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.bodyParser()); // Registering middleware function with Express. Want to do extra processing
// the processing will happen before we hit any of our routes as this is defined in the next ln

// In this case the middleware funtion will parse the body of the request and populate
// request.body so we can access it below
app.use(app.router); // Can be used to specify when you want your routes called

// Handler for internal server errors
function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500);
    res.render('error_template', { error: err });
}

app.use(errorHandler);

app.get('/', function(req, res, next) {
    res.render('fruitPicker', { 'fruits' : [ 'apple', 'orange', 'banana', 'peach' ] });
});

app.post('/favorite_fruit', function(req, res, next) {
    var favorite = req.body.fruit;
    if (typeof favorite == 'undefined') {
        next(Error('Please choose a fruit!'));
    }
    else {
        res.send("Your favorite fruit is " + favorite);
    }
});

app.listen(3000);
console.log('Express server listening on port 3000');
