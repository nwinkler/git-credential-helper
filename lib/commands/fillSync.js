var repo = require('../util/repo');
var executeCredentialSync = require('../util/executeCredentialSync');

function fill(target, callback, options) {
    var server = repo(target);

    executeCredentialSync(['fill'], callback, server, options);
}

module.exports = fill;
