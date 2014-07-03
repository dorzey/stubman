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

exports.group = {
    test_should_split_collection_data_by_url_and_group_by_method: function(test){
        var collectionData = {
            requests: [
                {url: '/test', method: 'GET'},
                {url: '/test', method: 'GET'},
                {url: '/test', method: 'PUT'},
                {url: '/test', method: 'PUT'},
                {url: '/other', method: 'GET'},
                {url: '/other', method: 'GET'},
                {url: '/other', method: 'PUT'},
                {url: '/other', method: 'PUT'}
            ]
        };

        var groupedByUrl = Helpers.groupRequestsByUrl(collectionData);

        test.equal(groupedByUrl['/test']['GET'].length, 2);
        test.equal(groupedByUrl['/test']['PUT'].length, 2);
        test.equal(groupedByUrl['/other']['GET'].length, 2);
        test.equal(groupedByUrl['/other']['PUT'].length, 2);

        test.done();
    }
};