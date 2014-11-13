var expect = require('expect.js');
var mockSpawn = require('mock-spawn');
var sinon = require('sinon');

var mockery = require('mockery');

describe('executeCredential', function () {
    var mySpawn;
    var feed;

    var executeCredential;
    var libPath = '../../lib/util/executeCredential';

    beforeEach(function () {
        mySpawn = mockSpawn(false);
        feed = sinon.stub();

        mockery.enable({
            useCleanCache: true,
            warnOnUnregistered: false
        });
        mockery.registerMock('child_process', { spawn: mySpawn });
        mockery.registerMock('../util/feed', feed);
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

    it('should call git credential when called with input data', function (done) {
        mySpawn.sequence.add(mySpawn.simple(0, '\n'));

        // TODO Verify feed call
        executeCredential(['bar1', 'bar2'], function(err, data) {
            expect(err).to.be(null);
            expect(data).to.eql({});

            var call = mySpawn.calls[0];
            expect(call.command).to.be('git');
            expect(call.args).to.eql(['credential', 'bar1', 'bar2']);

            done();
        }, {
            foo: 'bar',
            foo2: 'bar2',
            foo3: 'bar3',
            foo4: ''
        });
    });
});
