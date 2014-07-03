/*
 * stubman
 * http://stubman.dorzey.net
 *
 * Copyright (c) 2014 Paul Doran
 * Licensed under the MIT license.
 */

var Enums = require('../../lib/stubman').Enums;

exports.group = {
    test_HttpMethods_defined: function (test) {
        test.notEqual(Enums.HttpMethods, undefined);
        test.done();
    }
};