var expect = require('expect.js');
var mockSpawn = require('mock-spawn');
var mockery = require('mockery');

describe('available', function () {
    var mySpawn;
    var available;
    var libPath = '../../lib/commands/available';

    beforeEach(function () {
        mySpawn = mockSpawn(false);
        mockery.enable({ useCleanCache: true });
        mockery.registerMock('child_process', { spawn: mySpawn });
        mockery.registerAllowable(libPath, true);
        available = require(libPath);
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.resetCache();
        mockery.disable();
    });

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
