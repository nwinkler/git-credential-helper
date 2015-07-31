var gitCredentialHelper = require('./../lib/index');

console.log('Credential Helper available: ');

var available = gitCredentialHelper.availableSync();

console.log(available);
