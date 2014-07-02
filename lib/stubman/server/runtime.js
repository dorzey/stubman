/*
 * stubman
 * https://github.com/dorzey/stubman
 *
 * Copyright (c) 2014 Paul Doran
 * Licensed under the MIT license.
 */

var Runtime = function(){
    var fs = require('fs');
    var url = require('url');
    var bodyParser  = require('body-parser');
    var express = require('express');
    var Stubman = require('../../stubman');

    var app = express();
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    var self = {};

    self.parseCollection = function (path) {
        var data =fs.readFileSync(path, 'utf8');
        return JSON.parse(data);
    };

    self._setHeaders = function (res, headers){
        headers.forEach(
            function(header){
                res.set(header.key, header.value);
            }
        );
    };

    self._findMatchingResponse = function (req, responses) {
        var matchingResponse;
        var body = JSON.stringify(req.body);
        responses.forEach(
            function(response){
                if(body === "{}" || body === "[]"){
                    if (response.data === "" || response.data.length === 0) {
                        matchingResponse = response.responses[0];
                    }
                }else {
                    if (response.data === body) {
                        matchingResponse = response.responses[0];
                    }
                }
            }
        );
        return matchingResponse;
    };

    self._configureGetResponse = function (responses, url) {
        var getResponses = responses;
        app.get(url, function (req, res) {
            var response = self._findMatchingResponse(req, getResponses);
            self._setHeaders(res, response.headers);
            res.send(response.responseCode.code, response.text);
        });
    };

    self._configurePutResponses = function(responses, url) {
        var putResponses = responses;
        app.put(url, function (req, res) {
            var response = self._findMatchingResponse(req, putResponses);
            self._setHeaders(res, response.headers);
            res.send(response.responseCode.code, response.text);
        });
    };

    self._configurePostResponses = function(responses, url) {
        var postResponses = responses;
        app.post(url, function (req, res) {
            var response = self._findMatchingResponse(req, postResponses);
            self._setHeaders(res, response.headers);
            res.send(response.responseCode.code, response.text);
        });
    };

    self._configureDeleteResponses = function(responses, url) {
        var deleteResponses = responses;
        app.delete(url, function (req, res) {
            var response = self._findMatchingResponse(req, deleteResponses);
            self._setHeaders(res, response.headers);
            res.send(response.responseCode.code, response.text);
        });
    };

    self.buildServer = function(requestsGroupedByUrl) {
        for (var url in requestsGroupedByUrl) {
            console.log(url);
            for (var method in requestsGroupedByUrl[url]) {
                var responses = requestsGroupedByUrl[url][method];
                switch (method) {
                    case Stubman.Enums.HttpMethods.GET:
                    {
                        self._configureGetResponse(responses, url);
                    }
                        break;
                    case Stubman.Enums.HttpMethods.PUT:
                    {
                        self._configurePutResponses(responses, url);
                    }
                        break;
                    case Stubman.Enums.HttpMethods.POST:
                    {
                        self._configurePostResponses(responses, url);
                    }
                        break;
                    case Stubman.Enums.HttpMethods.DELETE:
                    {
                        self._configureDeleteResponses(responses, url);
                    }
                        break;

                }
            }
        }
        var server = app.listen(3000, function () {
            app._router.stack.forEach(function (route) {
                    console.log(route);
                }
            );
            console.log('Listening on port %d', server.address().port);
        });
    };

    self._addRequestToMethodList = function(requestsGroupedByMethod, request){
        if(requestsGroupedByMethod[request.method] === undefined){
            requestsGroupedByMethod[request.method] = [request];
        }else{
            requestsGroupedByMethod[request.method].push(request);
        }
    };

    self.groupRequestsByUrl = function (collectionData) {
        var requestsGroupedByUrl = {};
        collectionData.requests.forEach(
            function(request){
                var path = url.parse(request.url).path;
                if(requestsGroupedByUrl[path] === undefined){
                    requestsGroupedByUrl[path] = {};
                }
                self._addRequestToMethodList(requestsGroupedByUrl[path], request);
            }
        );
        return requestsGroupedByUrl;
    };

    return self;
};

module.exports = Runtime;