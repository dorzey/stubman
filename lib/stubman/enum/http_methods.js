/*
 * stubman
 * https://github.com/dorzey/stubman
 *
 * Copyright (c) 2014 Paul Doran
 * Licensed under the MIT license.
 */

var HttpMethods = function() {
    var self = {};

    self.GET = "GET";
    self.PUT = "PUT";
    self.POST = "POST";
    self.DELETE = "DELETE";

    return self;
}

module.exports = HttpMethods();