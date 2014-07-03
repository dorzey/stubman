/*
 * stubman
 * http://stubman.dorzey.net
 *
 * Copyright (c) 2014 Paul Doran
 * Licensed under the MIT license.
 */

var HttpMethods = require('../../../lib/stubman').Enums.HttpMethods;

exports.group = {
    test_get: function (test) {
        test.equal(HttpMethods.GET, 'GET');
        test.done();
    },

    test_put: function (test) {
        test.equal(HttpMethods.PUT, 'PUT');
        test.done();
    },

    test_post: function (test) {
        test.equal(HttpMethods.POST, 'POST');
        test.done();
    },

    test_delete: function (test) {
        test.equal(HttpMethods.DELETE, 'DELETE');
        test.done();
    }
};