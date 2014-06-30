/*
 * stubman
 * https://github.com/dorzey/stubman
 *
 * Copyright (c) 2014 Paul Doran
 * Licensed under the MIT license.
 */

var Main = function() {

    var fs = require('fs');
    var url = require('url');
    var program = require('commander');
    var express = require('express');

    var app = express();

    var self = {}

    var METHOD = {
        PUT: "PUT",
        GET: "GET",
        DELETE: "DELETE",
        POST: "POST"
    };

    self._parseArguments = function () {
        program
            .version('0.0.1')
            .option('-c, --collection [file]', 'Specify a Postman collection as a JSON [file]')
            .parse(process.argv);
    };

    self._parseCollection = function (path, callback) {
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) {
                throw err;
            }
            callback(JSON.parse(data));
        });
    };

    self._buildServer = function (collectionData) {
        collectionData.requests.forEach(
            function (request) {
                var path = url.parse(request.url).path;
                var response = request.responses[0];
                switch (request.method) {
                    case METHOD.PUT:
                    {
                        app.put(path, function (req, res) {
                            res.send(response.responseCode.code, response.text);
                        });
                    }
                        break;
                    case METHOD.GET:
                    {
                        app.get(path, function (req, res) {
                            res.send(response.responseCode.code, response.text);
                        });
                    }
                        break;
                    case METHOD.DELETE:
                    {
                        app.delete(path, function (req, res) {
                            res.send(response.responseCode.code, response.text);
                        });
                    }
                        break;
                    case METHOD.POST:
                    {
                        app.post(path, function (req, res) {
                            res.send(response.responseCode.code, response.text);
                        });
                        break;
                    }
                }
            }
        );
        app.get('/hello', function (req, res) {
            res.send('Hello World');
        });
        var server = app.listen(3000, function () {
            app._router.stack.forEach(function (route) {
                    console.log(route);
                }
            );
            console.log('Listening on port %d', server.address().port);
        });
    };

    self.start = function() {
        self._parseArguments();

        self._parseCollection(process.cwd() + "/" + program.collection, self._buildServer);

    };

    return self;
}

module.exports = Main;

