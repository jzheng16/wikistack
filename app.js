const express = require( 'express' );
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');


const app = express(); // creates an instance of an express application
const port = 3000
const server = app.listen(port, function() {
  console.log('listening on port ',port );
});
const routes = require('./routes/');


// EXPRESS STUFF!!!
app.use(morgan('dev'));
app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// })
app.use('/', routes);

// TEMPLATES STUFF!!!

app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks

nunjucks.configure('views', {noCache: true});
