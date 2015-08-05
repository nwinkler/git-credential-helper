var spawnSync = require('spawn-sync');
var parse = require('../util/parse');
var feed = require('../util/feed');

function executeCredentialSync(args, target, options) {
    var feedTarget;

    args.unshift('credential');

    // TODO Silent option in sync mode
    if (options && options.silent) {
        //detached = true;
    }

    if (target) {
        feedTarget = feed(target);
    }

    var result = spawnSync('git', args, {
        input: feedTarget
    });

    return parse(result.stdout);
}

module.exports = executeCredentialSync;
