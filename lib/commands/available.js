var spawn = require('child_process').spawn;

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

module.exports = available;
