var spawn = require('child_process').spawn;
var parse = require('./util/parse');
var feed = require('./util/feed');
var repo = require('./util/repo');

function fill(target, callback) {
    var server = repo(target);

    _executeCredential(['fill'], callback, server);
}

function available(callback) {
    var output;
    var command = spawn('git', ['config', 'credential.helper']);

    command.stdout.on('data', function (data) {
        output = data;
    });

    command.stdout.on('end', function () {
        if (output) {
            callback(null, true);
        }
        else {
            callback(null, false);
        }
    });
}

function _executeCredential(args, callback, target) {
    args.unshift('credential');

    var command = spawn('git', args);

    command.stdout.on('data', function (data) {
        parse(data, callback);
    });

    if (target) {
        var feedTarget = feed(target);

        command.stdin.write(feedTarget);
    }
}

module.exports = {
    fill: fill,
    available: available
};
