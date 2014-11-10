var spawn = require('child_process').spawn;
var parse = require('../util/parse');
var feed = require('../util/feed');
var repo = require('../util/repo');

function fill(target, callback) {
    var server = repo(target);

    _executeCredential(['fill'], callback, server);
}

function _executeCredential(args, callback, target) {
    var output;

    args.unshift('credential');

    var command = spawn('git', args);

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

module.exports = fill;
