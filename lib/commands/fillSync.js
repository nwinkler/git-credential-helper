var repo = require('../util/repo');
var executeCredentialSync = require('../util/executeCredentialSync');

function fillSync(target, options) {
    var server = repo(target);

    var result = executeCredentialSync(['fill'], server, options);

    return result;
}

module.exports = fillSync;
