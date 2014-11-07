var spawn = require('child_process').spawn;
var parse = require('./util/parse');
var feed = require('./util/feed');
var repo = require('./util/repo');

function fill(target, callback) {
    var server = repo(target);

    _execute(['fill'], callback, server);
}

function _execute(args, callback, target) {
    var allArgs = args.unshift('credential');

    var command = spawn('git', allArgs);

    command.stdout.on('data', function (data) {
        parse(data, callback);
    });

    if (target) {
        var feedTarget = feed(target);

        command.stdin.write(feedTarget);
    }
}

module.exports = {
    fill: fill
};
