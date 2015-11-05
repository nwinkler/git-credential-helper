var repo = require('../util/repo');
var executeCredentialSync = require('../util/executeCredentialSync');

function approveSync(target, options) {
    var server = repo(target);

    if (options && options.username) {
        server.username = options.username;
    }

    if (options && options.password) {
        server.password = options.password;
    }

    var result = executeCredentialSync(['approve'], server, options);

    return result;
}

module.exports = approveSync;
