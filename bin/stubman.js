#!/usr/bin/env node

'use strict';

/*
 * stubman
 * https://github.com/dorzey/stubman
 *
 * Copyright (c) 2014 Paul Doran
 * Licensed under the MIT license.
 */

var Stubman = require('../lib/stubman');
var main = Stubman.Cli.Main();

var getAllMethods = function(object) {
    return Object.getOwnPropertyNames(object).filter(function(property) {
        return typeof object[property] == 'function';
    });
};

console.log(getAllMethods(main));

main.start();