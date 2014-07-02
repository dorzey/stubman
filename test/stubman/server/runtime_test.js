/*
 * stubman
 * https://github.com/dorzey/stubman
 *
 * Copyright (c) 2014 Paul Doran
 * Licensed under the MIT license.
 */

var Runtime = require('../../../lib/stubman').Server.Runtime();

var mockResponse = function(){
    var self = {};

    self.headers = [];

    self.set = function(k,v){
        var header = {};
        header[k] = v;
        self.headers.push(header);
    };

    return self;
};

exports.group = {
    test_setHeaders: function(test){
        var res = mockResponse();
        var headerOne = {key: 'Content-Type', value: 'application/json'};
        var headerTwo = {key: 'Connection', value: 'keep-alive'};
        var expectedheaders = [headerOne, headerTwo];

        Runtime._setHeaders(res, expectedheaders);

        test.equal(res.headers.length, 2);
        test.equal(res.headers[0]['Content-Type'], headerOne.value);
        test.equal(res.headers[1]['Connection'], headerTwo.value);
        test.done();
    }
};