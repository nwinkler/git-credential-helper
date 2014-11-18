git-credential-helper
=====================

[![Build Status](https://travis-ci.org/nwinkler/git-credential-helper.svg?branch=master)](https://travis-ci.org/nwinkler/git-credential-helper)
[![Coverage Status](https://coveralls.io/repos/nwinkler/git-credential-helper/badge.png)](https://coveralls.io/r/nwinkler/git-credential-helper)

Node library that allows using the [Git credential API](http://git-scm.com/docs/git-credential).
The Git credential API allows you to store and retrieve credentials for Git hosts, preventing you from having to enter your username and password every time.
To use this, you have to set up your local Git client installation to make use of a *credential helper*. 
Credential helper applications are available for all major operating systems.

Please refer to the following documentation for installing a local credential helper for your operating system:

* https://confluence.atlassian.com/display/STASH/Permanently+authenticating+with+Git+repositories
* https://help.github.com/articles/caching-your-github-password-in-git/

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

Checks whether a Git credential tool is installed locally. The provided `callback` is called with two parameters:

* `err`: An error object in case the call failed.
* `data`: A `Boolean` parameter, indicating whether a Git credential tool is available.

Example:

```javascript
gitCredentialHelper.available(function (err, data) {
  // data will be true or false
  console.log(data);
});
```

### fill(target, callback, options)

Retrieves any stored credentials for the provided target server. The following parameters are expected:

* `target`: A `String` parameter indicating the URL of the target server.
* `callback`: Called when the call to the Git credential tool finishes.
* `options`: Optional `Object` parameter, the following options are available:
    * `silent`: `Boolean` option, default value `false`. Tries to do a silent check, not asking for credentials if the system does not have a stored set of credentials for the requested target repo. Might not be supported on all platforms.

The provided `callback` is called with two parameters:

* `err`: An error object in case the call failed.
* `data`: An object, containing the server information and the stored credentials. If there aren't any stored credentials for the requested target server, the object will be empty.

When there aren't any stored credentials for the requested target server, the Git credential helper will **not** ask for credentials, it will simply provide an empty result object to the callback. 

The result object will be in the form of

```javascript
{ 
  protocol: 'http',
  host: 'foo',
  username: 'user',
  password: 'pass' 
}
```

Example:

```javascript
gitCredentialHelper.fill('http://foo/bar.git', function (err, data) {
  // data will contain any stored credentials, or will be {}
  console.log(data);
}, {
  silent: true
);
```

### approve(target, callback, options)

Stores the provided credentials for the provided target server. The following parameters are expected:

* `target`: A `String` parameter indicating the URL of the target server.
* `callback`: Called when the call to the Git credential tool finishes.
* `options`: An object containing `username` and `password` properties with the credentials to be stored.

The provided `callback` is called with two parameters:

* `err`: An error object in case the call failed.
* `data`: An object, in the case of `approve` this is always empty.

Example:

```javascript
gitCredentialHelper.approve('http://foo/bar.git',
  function (err, data) {
    // data will be {}
    console.log(data);
}, {
  username: 'user',
  password: 'pass'
});
```

### reject(target, callback, options)

Removes any stored credentials for the provided target server. The following parameters are expected:

* `target`: A `String` parameter indicating the URL of the target server.
* `callback`: Called when the call to the Git credential tool finishes.
* `options`: Optional parameter, there currently aren't any supported options for this command.

The provided `callback` is called with two parameters:

* `err`: An error object in case the call failed.
* `data`: An object, in the case of `reject` this is always empty.

Example:

```javascript
gitCredentialHelper.reject('http://foo/bar.git', function (err, data) {
  // data will be {}
  console.log(data);
});
```

## Known Issues

* The `silent` option of the `fill` command currently does not work on Windows using the *Winstore* credential helper.

## License
Copyright (c) 2014 Nils Winkler. Licensed under the MIT license.
