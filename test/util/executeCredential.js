var expect = require('expect.js');
var mockSpawn = require('mock-spawn');
var mockery = require('mockery');

describe('executeCredential', function () {
    var mySpawn;

    var executeCredential;
    var libPath = '../../lib/util/executeCredential';

    beforeEach(function () {
        mySpawn = mockSpawn(false);
        mockery.enable({
            useCleanCache: true,
            warnOnUnregistered: false
        });
        mockery.registerMock('child_process', { spawn: mySpawn });
        mockery.registerAllowable(libPath, true);
        executeCredential = require(libPath);
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.resetCache();
        mockery.disable();
    });

    it('should call git credential when called', function (done) {
        mySpawn.sequence.add(mySpawn.simple(0, '\n'));

        executeCredential(['bar1', 'bar2'], function(err, data) {
            expect(err).to.be(null);
            expect(data).to.eql({});

            var call = mySpawn.calls[0];
            expect(call.command).to.be('git');
            expect(call.args).to.eql(['credential', 'bar1', 'bar2']);

            done();
        }, '');
    });
});
