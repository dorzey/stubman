/*
 * stubman
 * https://github.com/dorzey/stubman
 *
 * Copyright (c) 2014 Paul Doran
 * Licensed under the MIT license.
 */

var Main = function() {

    var program = require('commander');
    var Runtime = require('../../stubman').Server.Runtime();
    var Helpers = require('../../stubman').Server.Helpers();

    var self = {};

    self._parseArguments = function () {
        program
            .version('0.0.2')
            .option('-c, --collection [file]', 'Specify a Postman collection as a JSON [file]')
            .parse(process.argv);
    };

    self.start = function() {
        self._parseArguments();

        var collectionData = Helpers.parseCollection(process.cwd() + "/" + program.collection);
        var requestsGroupedByUrl = Helpers.groupRequestsByUrl(collectionData);

        console.log(requestsGroupedByUrl);
        Runtime.buildServer(requestsGroupedByUrl);
    };

    return self;
};

module.exports = Main;

