/*
 * stubman
 * http://stubman.dorzey.net
 *
 * Copyright (c) 2014 Paul Doran
 * Licensed under the MIT license.
 */

var Helpers = require('../../../lib/stubman').Server.Helpers();

exports.group = {
   test_should_group_request_by_method_and_add_to_end_of_list: function(test){

       var getRequest = {method: 'GET'};
       var group = {};

       Helpers._addRequestToMethodList(group, getRequest);

       test.equal(group['GET'][0], getRequest);

       Helpers._addRequestToMethodList(group, getRequest);

       test.equal(group['GET'].length, 2);
       test.equal(group['GET'][1], getRequest);

       test.done();
   }
};