var expect = require('expect.js');
var mockery = require('mockery');

describe('availableSync', function () {
    var availableSync;
    var libPath = '../../lib/commands/availableSync';

    beforeEach(function () {
        mockery.enable({ useCleanCache: true });
        mockery.registerAllowable(libPath, true);
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.resetCache();
        mockery.disable();
    });

    it('should return false when the helper is not available', function () {
        mockery.registerMock('spawn-sync', function () {
            return {
                stdout: '',
                stderr: '',
                status: 0
            };
        });
        availableSync = require(libPath);

        var isAvailable = availableSync();
        expect(isAvailable).to.be(false);
    });

    it('should return false when the helper is not available and the git command exits with an error', function () {
        mockery.registerMock('spawn-sync', function () {
            return {
                stdout: '',
                stderr: '',
                status: 128
            };
        });
        availableSync = require(libPath);

        var isAvailable = availableSync();
        expect(isAvailable).to.be(false);
    });

    it('should return false when the helper is not available and the git command exits with an error and error message', function () {
        mockery.registerMock('spawn-sync', function () {
            return {
                stdout: '',
                stderr: 'git error',
                status: 128
            };
        });
        availableSync = require(libPath);

        var isAvailable = availableSync();
        expect(isAvailable).to.be(false);
    });

    it('should return true when the helper is available', function () {
        mockery.registerMock('spawn-sync', function () {
            return {
                stdout: 'osxkeychain',
                stderr: '',
                status: 0
            };
        });
        availableSync = require(libPath);

        var isAvailable = availableSync();
        expect(isAvailable).to.be(true);
    });
});
