var gitCredentialHelper = require('./../lib/index');

var server = process.argv[2];

if (server) {
    console.log('Rejecting credentials for ' + server);

    gitCredentialHelper.reject(server, function (err, data) {
        if (err) {
            console.error(err);
        }
        console.log(data);
    });
}
else {
    console.error('Please provide a URL to reject credentials for as a parameter!');
}
