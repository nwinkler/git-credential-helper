var gitCredentialHelper = require('./lib');

console.log('Credential Helper available: ');

gitCredentialHelper.available(function (err, data) {
    if (err) {
        console.error(err);
    }
    console.log(data);
});
