#!/usr/bin/env node

/*
 * stubman
 * https://github.com/dorzey/stubman
 *
 * Copyright (c) 2014 Paul Doran
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var url = require('url');
var program = require('commander');
var express = require('express');

var app = express();

var METHOD = {
  PUT: "PUT",
  GET: "GET",
  DELETE: "DELETE",
  POST: "POST"
};

var parseArguments = function(){
  program
  .version('0.0.1')
  .option('-c, --collection [file]', 'Specify a Postman collection as a JSON [file]')
  .parse(process.argv);
};

var parseCollection = function(path, callback){
  fs.readFile(path, 'utf8', function (err, data) {
    if (err){ 
      throw err;
    }
    callback(JSON.parse(data));
  });
};

var buildServer = function(collectionData){
  collectionData.requests.forEach(
    function(request){
     var path = url.parse(request.url).path;
     switch(request.method){
       case METHOD.PUT: {
         app.put(path, function(req, res){
           res.send('Put');
         });
       }
       break;
       case METHOD.GET: {
         app.get(path, function(req, res){
           res.send('Get');
         });
       }
       break;
       case METHOD.DELETE: {
         app.delete(path, function(req, res){
           res.send('Delete');
         });
       }
       break;
       case METHOD.POST: {
         app.post(path, function(req, res){
           res.send('Post');
         });
         break;
       }
     }
    }
  );
  app.get('/hello', function(req, res){
    res.send('Hello World');
  });
  var server = app.listen(3000, function() {
    app._router.stack.forEach(function(route){
        console.log(route);
      }
    );
    console.log('Listening on port %d', server.address().port);
  });
};

var main = function(){
  parseArguments();

  parseCollection(process.cwd()+"/"+program.collection, buildServer);

};

main();

