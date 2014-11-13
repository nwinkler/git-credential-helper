git-credential-helper
=====================

[![Build Status](https://travis-ci.org/nwinkler/git-credential-helper.svg?branch=master)](https://travis-ci.org/nwinkler/git-credential-helper)
[![Coverage Status](https://coveralls.io/repos/nwinkler/git-credential-helper/badge.png)](https://coveralls.io/r/nwinkler/git-credential-helper)

**Work in Progress - don't use this yet**

Node library that allows using the [Git credential API](http://git-scm.com/docs/git-credential)

## Installation

To use this library in your application, install it using `npm`:

```bash
npm install --save git-credential-helper
```

## Usage

The library provides the following functions that can be used to interact with a locally installed Git credential tool.
All functions are asynchronous and expect a callback, which is called with the results of the operation.

To include the library in your application, do the following:

```javascript
var gitCredentialHelper = require('git-credential-helper');
```

See the examples folder for more info.

### available(callback)

Checks whether a Git credential tool is installed locally. The provided `callback` is called with a `Boolean` parameter,
indicating whether a Git credential tool is available:

```javascript

```

## License
Copyright (c) 2014 Nils Winkler. Licensed under the MIT license.
