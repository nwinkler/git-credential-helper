var repo = require('../util/repo');
var executeCredential = require('../util/executeCredential');

function fill(target, callback) {
    var server = repo(target);

    executeCredential(['fill'], callback, server);
}

module.exports = fill;
