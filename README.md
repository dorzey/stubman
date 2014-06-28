# stubman 
  [![Build Status](https://secure.travis-ci.org/dorzey/stubman.png?branch=master)](http://travis-ci.org/dorzey/stubman)
  [![Dependencies](https://david-dm.org/dorzey/stubman.png)](https://david-dm.org/dorzey/stubman)
  [![Code Climate](https://codeclimate.com/github/dorzey/stubman.png)](https://codeclimate.com/github/dorzey/stubman)

[![NPM](https://nodei.co/npm/stubman.png?stars&downloads)](https://nodei.co/npm/stubman/)
[![NPM](https://nodei.co/npm-dl/stubman.png)](https://nodei.co/npm/stubman/)

Turns a Postman collection into a stub server. *WARNING* This is a work in progress; use at your own risk.

The only supported functionality is binding the path to either PUT/GET/DELETE/POST method and returning 200. More to follow.


## Getting Started
Install the module with: `npm install stubman`

Run Stubman with a collection. With the `-c` flag you can run any collection file lying on your file-system. Refer [the collection documentation](http://www.getpostman.com/docs/collections) to learn how to use and download collections.

```bash
$ newman -c mycollection.json
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 Paul Doran  
Licensed under the MIT license.
