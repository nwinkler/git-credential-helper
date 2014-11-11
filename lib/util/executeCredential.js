var spawn = require('child_process').spawn;
var parse = require('../util/parse');
var feed = require('../util/feed');

function executeCredential(args, callback, target) {
    var output;

    args.unshift('credential');

    var command = spawn('git', args, { detached: true });

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
