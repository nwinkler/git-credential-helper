var spawn = require('child_process').spawn;
var parse = require('../util/parse');
var feed = require('../util/feed');

function executeCredential(args, callback, target, options) {
    var output;
    var detached = false;

    args.unshift('credential');

    // The `detached` option currently does not work on Windows
    if (options && options.silent && process.platform !== 'win32') {
        detached = true;
    }

    var command = spawn('git', args, { detached: detached });

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
