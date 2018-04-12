var express = require('express')

var app = express();

app.use(express.static('dist'));

app.get('/', function () {

})



var server = app.listen(8000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log(`app listening at http://${host}:${port}`);
})