var gitCredentialHelper = require('./../lib/index');

var server = process.argv[2];

if (server) {
    console.log('Rejecting credentials for ' + server);

    var result = gitCredentialHelper.rejectSync(server);

    if (result.err) {
        console.err(result.err);
    }
    console.log(result.output);
}
else {
    console.error('Please provide a URL to reject credentials for as a parameter!');
}
