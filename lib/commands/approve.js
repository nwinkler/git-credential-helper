var repo = require('../util/repo');
var executeCredential = require('../util/executeCredential');
var object = require('mout').object;

function approve(target, credentials, callback) {
    var server = repo(target);

    object.mixIn(server, credentials);

    executeCredential(['approve'], callback, server);
}

module.exports = approve;
