var gitCredentialHelper = require('./../lib/index');

console.log('Credential Helper available: ');

gitCredentialHelper.available(function (err, data) {
    if (err) {
        console.error(err);
    }
    console.log(data);
});
