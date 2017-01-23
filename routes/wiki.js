const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;


router.get('/', function(req, res, next) {

  var allPages = Page.findAll({});

  allPages.then(function(pages){
    res.render('index', {pages: pages});
  });


});

router.post('/', function(req, res, next) {
  var page = Page.build({
    title: req.body.title,
    content: req.body.content,
  });

  page.save()
  .then(function(pageData){

    res.redirect(pageData.route);
  })
  .catch(function(err){
    console.error(err);
  });

});

router.get('/add', function(req, res, next) {
  res.render('addpage');
});

router.get('/:url', function(req, res, next) {
  //SELECT * FROM Pages WHERE pages.urlTitle = :url;
  Page.findAll({
    where: {
      urlTitle: req.params.url
    }
  })
  .then(function(response){
    res.render('wikipage', {title: response[0].title, content: response[0].content});
  })
  .catch(function(err){
    console.error(err);
  });

});

module.exports = router;
