var spawn = require('child_process').spawn;

function fill(target) {
    _execute();
}

function _execute(args) {
    var allArgs = args.unshift('credential');

    var command = spawn('git', allArgs);

    command.stdout.on('data', _parseOutput);
}

function _parseOutput(data) {
    var output = data.split('\n')
    .map(function (line) {
        return line.split('=');
    })
    .filter(function (lineItems) {
        // Filter out empty lines
        return lineItems.length === 2;
    })
    .reduce(function (obj, val) {
        obj[val[0]] = val[1];
        return obj;
    }, {});

    return output;
}

module.exports = {
    fill: fill
};
