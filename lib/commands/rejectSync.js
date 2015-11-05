var repo = require('../util/repo');
var executeCredentialSync = require('../util/executeCredentialSync');

function rejectSync(target, options) {
    var server = repo(target);

    var result = executeCredentialSync(['reject'], server, options);

    return result;
}

module.exports = rejectSync;
