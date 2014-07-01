var HttpMethods = require('../../../lib/stubman/enum/http_methods');


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