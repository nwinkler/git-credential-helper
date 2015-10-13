var spawnSync = require('spawn-sync');
var parse = require('../util/parse');
var feed = require('../util/feed');

function executeCredentialSync(args, target, options) {
    var feedTarget;
    var env = process.env;

    args.unshift('credential');

    if (options && options.silent) {
        env.GIT_TERMINAL_PROMPT = 0;
    }

    if (target) {
        feedTarget = feed(target);
    }

    var result = spawnSync('git', args, {
        input: feedTarget,
        env: env
    });

    return parse(result.stdout);
}

module.exports = executeCredentialSync;
