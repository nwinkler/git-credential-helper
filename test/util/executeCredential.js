var expect = require('expect.js');
var mockSpawn = require('mock-spawn');
var sinon = require('sinon');

var mockery = require('mockery');
var _ = require('lodash');

describe('executeCredential', function () {
    var mySpawn;
    var feed;
    var myEnv;

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

        myEnv = _.cloneDeep(process.env);
        delete myEnv.GIT_TERMINAL_PROMPT;
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.resetCache();
        mockery.disable();
        delete process.env.GIT_TERMINAL_PROMPT;
    });

    it('should call git credential when called', function (done) {
        mySpawn.sequence.add(mySpawn.simple(0, '\n'));

        executeCredential(['bar1', 'bar2'], function(err, data) {
            expect(err).to.be(null);
            expect(data).to.eql({});

            var call = mySpawn.calls[0];
            expect(call.command).to.be('git');
            expect(call.args).to.eql(['credential', 'bar1', 'bar2']);
            expect(call.opts.env.GIT_TERMINAL_PROMPT).to.be(undefined);

            done();
        }, '');
    });

    it('should use the silent option true', function (done) {
        mySpawn.sequence.add(mySpawn.simple(0, '\n'));

        executeCredential(['bar1', 'bar2'], function(err, data) {
            expect(err).to.be(null);
            expect(data).to.eql({});

            var call = mySpawn.calls[0];
            expect(call.command).to.be('git');
            expect(call.args).to.eql(['credential', 'bar1', 'bar2']);
            expect(call.opts.env.GIT_TERMINAL_PROMPT).to.be('0');

            done();
        }, '', {
            silent: true
        });
    });

    it('should use the silent option false', function (done) {
        mySpawn.sequence.add(mySpawn.simple(0, '\n'));

        executeCredential(['bar1', 'bar2'], function(err, data) {
            expect(err).to.be(null);
            expect(data).to.eql({});

            var call = mySpawn.calls[0];
            expect(call.command).to.be('git');
            expect(call.args).to.eql(['credential', 'bar1', 'bar2']);
            expect(call.opts.env.GIT_TERMINAL_PROMPT).to.be(undefined);

            done();
        }, '', {
            silent: false
        });
    });

    it('should call git credential when called with input data', function (done) {
        var testObject = {
            foo: 'bar',
            foo2: 'bar2',
            foo3: 'bar3',
            foo4: ''
        };

        var testFeed = 'foo=bar\n\
foo2=bar2\n\
foo3=bar3\n\
\n';

        mySpawn.sequence.add(mySpawn.simple(0, '\n'));
        feed.returns(testFeed);

        executeCredential(['bar1', 'bar2'], function(err, data) {
            expect(err).to.be(null);
            expect(data).to.eql({});

            // No way to verify the stdin part of the spawn call.
            var call = mySpawn.calls[0];
            expect(call.command).to.be('git');
            expect(call.args).to.eql(['credential', 'bar1', 'bar2']);

            expect(feed.called).to.be(true);
            expect(feed.args[0][0]).to.be(testObject);

            done();
        }, testObject);
    });
});
