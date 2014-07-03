/*
 * stubman
 * http://stubman.dorzey.net
 *
 * Copyright (c) 2014 Paul Doran
 * Licensed under the MIT license.
 */

var Cli = require('../../lib/stubman').Cli;

exports.group = {
    test_Cli_Main_is_defined: function (test) {
        test.notEqual(Cli.Main, undefined);
        test.done();
    }
};