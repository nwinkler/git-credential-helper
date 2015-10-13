var expect = require('expect.js');
var sinon = require('sinon');

var mockery = require('mockery');

describe('executeCredentialSync', function () {
    var feed;
    var spawnSync;

    var executeCredentialSync;
    var libPath = '../../lib/util/executeCredentialSync';

    beforeEach(function () {
        feed = sinon.stub();
        spawnSync = sinon.stub();

        mockery.enable({
            useCleanCache: true,
            warnOnUnregistered: false
        });
        mockery.registerMock('../util/feed', feed);
        mockery.registerMock('spawn-sync', spawnSync);
        mockery.registerAllowable(libPath, true);
        executeCredentialSync = require(libPath);
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.resetCache();
        mockery.disable();
    });

    it('should call git credential when called', function () {
        spawnSync.returns({
            stdout: ''
        });

        var result = executeCredentialSync(['bar1', 'bar2']);

        expect(spawnSync.callCount).to.be(1);
        sinon.assert.calledWith(spawnSync, 'git', ['credential', 'bar1', 'bar2'], { input: undefined, env: process.env });

        expect(result).to.eql({
            err: null,
            output: {}
        });
    });

    it('should use the silent option true', function () {
        spawnSync.returns({
            stdout: ''
        });

        var result = executeCredentialSync(['bar1', 'bar2'], '', {
            silent: true
        });

        expect(spawnSync.callCount).to.be(1);
        // TODO Check the silent option
        sinon.assert.calledWith(spawnSync, 'git', ['credential', 'bar1', 'bar2'], { input: undefined, env: process.env });

        expect(result).to.eql({
            err: null,
            output: {}
        });
    });

    it('should use the silent option false', function () {
        spawnSync.returns({
            stdout: ''
        });

        var result = executeCredentialSync(['bar1', 'bar2'], '', {
            silent: false
        });

        expect(spawnSync.callCount).to.be(1);
        // TODO Check the silent option
        sinon.assert.calledWith(spawnSync, 'git', ['credential', 'bar1', 'bar2'], { input: undefined, env: process.env });

        expect(result).to.eql({
            err: null,
            output: {}
        });
    });

    it('should call git credential when called with input data', function () {
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

        feed.returns(testFeed);

        spawnSync.returns({
            stdout: ''
        });

        var result = executeCredentialSync(['bar1', 'bar2'], testObject);

        expect(spawnSync.callCount).to.be(1);
        sinon.assert.calledWith(spawnSync, 'git', ['credential', 'bar1', 'bar2'], { input: testFeed, env: process.env });

        expect(result).to.eql({
            err: null,
            output: {}
        });

        expect(feed.called).to.be(true);
        expect(feed.args[0][0]).to.be(testObject);
    });
});
