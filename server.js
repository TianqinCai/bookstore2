var path = require('path');
var React=require('react');

const express=require('express');

const bodyParser=require('body-parser');
const mongoose=require('mongoose');
var PORT = process.env.PORT || 4000

//set up express app
const app=express();

if(process.env.NODE_ENV !== 'production') {
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var webpack = require('webpack');
    var config = require('./webpack.config');
    var compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
    app.use(webpackHotMiddleware(compiler));
}

//const routes=require('./routes/api');

//connect to MongoDB
mongoose.connect('mongodb://localhost/bookstore');
mongoose.Promise=global.Promise;


app.use(express.static(path.join(__dirname, 'dist')));

// app.get('/', function(request, response) {
//     response.sendFile(__dirname + '/src/index.html')
// });

// app.set('views', __dirname + '/src/views');
// app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.use(express.static('src'));

app.use('/',require('./src/app/routes/api'));

//error handling middleware
app.use(function (err,req,res,next) {
    //console.log(err);
    res.status(422).send({error:err.message});
});

// listen for requests
app.listen(PORT,function (error) {
    if (error) {
        console.error(error);
    } else {
        console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    }
});