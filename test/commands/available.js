var expect = require('expect.js');
var mockSpawn = require('mock-spawn');

var mySpawn = mockSpawn();
require('child_process').spawn = mySpawn;

describe('available', function () {
    var available = require('../../lib/commands/available');

    it('should return false when the helper is not available', function (done) {
        available(function(err, isAvailable) {
            expect(isAvailable).to.be(false);

            done();
        });
    });

    it('should return false when the helper is not available and the git command exits with an error', function (done) {
        mySpawn.sequence.add(mySpawn.simple(1));

        available(function(err, isAvailable) {
            expect(isAvailable).to.be(false);

            done();
        });
    });

    it('should return false when the helper is not available and the git command exits with an error and error message', function (done) {
        mySpawn.sequence.add(mySpawn.simple(1, null, 'git error'));

        available(function(err, isAvailable) {
            expect(isAvailable).to.be(false);

            done();
        });
    });

    it('should return true when the helper is available', function (done) {
        mySpawn.sequence.add(mySpawn.simple(0, 'osxkeychain'));

        available(function(err, isAvailable) {
            expect(isAvailable).to.be(true);

            done();
        });
    });
});
