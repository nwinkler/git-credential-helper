var gitCredentialHelper = require('./../lib/index');

var server = process.argv[2];
var username = process.argv[3];
// Probably don't want to do this in real life - get it from a secure prompt!
var password = process.argv[4];

if (server && username && password) {
    console.log('Approving credentials for ' + server);

    gitCredentialHelper.approve(server, {
        username: username,
        password: password
    }, function (err, data) {
        if (err) {
            console.error(err);
        }
        console.log(data);
    });
}
else {
    console.error('Please provide the following parameters for approving credentials: 1) URL 2) username 3) password');
}
