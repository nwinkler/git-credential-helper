var repo = require('../util/repo');
var executeCredential = require('../util/executeCredential');

function approve(target, callback, options) {
    var server = repo(target);

    if (options && options.username) {
        server.username = options.username;
    }

    if (options && options.password) {
        server.password = options.password;
    }

    executeCredential(['approve'], callback, server);
}

module.exports = approve;
