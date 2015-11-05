var gitCredentialHelper = require('./../lib/index');

var server = process.argv[2];
var username = process.argv[3];
// Probably don't want to do this in real life - get it from a secure prompt!
var password = process.argv[4];

if (server && username && password) {
    console.log('Approving credentials for ' + server);

    var result = gitCredentialHelper.approveSync(server, {
        username: username,
        password: password
    });

    if (result.err) {
        console.err(result.err);
    }
    console.log(result.output);
}
else {
    console.error('Please provide the following parameters for approving credentials: 1) URL 2) username 3) password');
}
