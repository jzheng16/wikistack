const express = require( 'express' );
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const models = require('./models');


const app = express(); // creates an instance of an express application
const port = 3000;



models.User.sync({force:true}).then(function(){
  return models.Page.sync()
}).then(function (){
  app.listen(3000, function(){
    console.log('listening on port ', port );
  });
})
.catch(console.error);


const wikiRouter = require('./routes/wiki');


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
app.use('/wiki', wikiRouter);

// TEMPLATES STUFF!!!

app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks

nunjucks.configure('views', {noCache: true});
