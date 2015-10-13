var gitCredentialHelper = require('./../lib/index');

var server = process.argv[2];

if (server) {
    console.log('Showing credentials for ' + server);

    var result = gitCredentialHelper.fillSync(server, {
        silent: true
    });

    if (result.err) {
        console.err(result.err);
    }
    console.log(result.output);
}
else {
    console.error('Please provide a URL to retrieve credentials for as a parameter!');
}
