var spawn = require('child_process').spawn;
var parse = require('../util/parse');
var feed = require('../util/feed');

function executeCredential(args, callback, target, options) {
    var output;
    var env = process.env;

    args.unshift('credential');

    if (options && options.silent) {
        env.GIT_TERMINAL_PROMPT = 0;
    }

    var command = spawn('git', args, { env: env });

    command.stdout.on('data', function (data) {
        output = data;
    });

    command.stdout.on('end', function () {
        parse(output, callback);
    });

    if (target) {
        var feedTarget = feed(target);

        command.stdin.write(feedTarget);
    }
}

module.exports = executeCredential;
