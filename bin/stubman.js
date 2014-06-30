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

main.start();