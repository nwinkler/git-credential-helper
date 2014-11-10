var expect = require('expect.js');
var mockSpawn = require('mock-spawn');

var mySpawn = mockSpawn();
require('child_process').spawn = mySpawn;

describe.only('available', function () {
    var available = require('../../lib/commands/available');

    it('should return false when the helper is not available', function (done) {
        available(function(err, isAvailable) {
            expect(isAvailable).to.be(false);

            done();
        });
    });
});
