var repo = require('../util/repo');
var executeCredential = require('../util/executeCredential');

function reject(target, callback) {
    var server = repo(target);

    executeCredential(['reject'], callback, server);
}

module.exports = reject;
