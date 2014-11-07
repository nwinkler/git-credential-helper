var spawn = require('child_process').spawn;
var parse = require('./util/parse');

function fill(target) {
    _execute();
}

function _execute(args) {
    var allArgs = args.unshift('credential');

    var command = spawn('git', allArgs);

    command.stdout.on('data', parse);
}

module.exports = {
    fill: fill
};
