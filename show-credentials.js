var gitCredentialHelper = require('./lib');

var server = process.argv[2];

if (server) {
    console.log('Showing credentials for ' + server);

    gitCredentialHelper.fill(server, function (err, data) {
        if (err) {
            console.error(err);
        }
        console.log(data);
    });
}
else {
    console.error('Please provide a URL to retrieve credentials for as a parameter!')
}
