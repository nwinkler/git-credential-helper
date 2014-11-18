var repo = require('../util/repo');
var executeCredential = require('../util/executeCredential');
var object = require('mout').object;

function approve(target, callback, options) {
    var server = repo(target);

    object.mixIn(server, options);

    executeCredential(['approve'], callback, server);
}

module.exports = approve;
