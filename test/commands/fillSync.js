var expect = require('expect.js');
var sinon = require('sinon');
var mockery = require('mockery');

describe('fillSync', function () {
    var executeCredential;
    var repo;
    var libPath = '../../lib/commands/fillSync';
    var fill;

    beforeEach(function () {
        executeCredential = sinon.stub();
        repo = sinon.stub();

        mockery.enable({
            useCleanCache: true,
            warnOnUnregistered: false
        });

        mockery.registerMock('../util/executeCredentialSync', executeCredential);
        mockery.registerMock('../util/repo', repo);
        mockery.registerAllowable(libPath, true);
        fill = require(libPath);
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.resetCache();
        mockery.disable();
    });

    it('should return nothing when the server does not have any stored credentials', function () {
        var testServer = { mock: 'foo'};
        var testTarget = 'http://foo.not.found';
        var testResult = {
            user: 'foo user'
        };
        executeCredential.returns(testResult);
        repo.returns(testServer);

        var data = fill(testTarget);

        expect(data).to.eql(testResult);

        expect(executeCredential.called).to.be(true);
        expect(executeCredential.args[0][0]).to.eql(['fill']);
        expect(executeCredential.args[0][1]).to.eql(testServer);

        expect(repo.called).to.be(true);
        expect(repo.args[0][0]).to.be(testTarget);
    });

    it('should return pass on the options object when provided', function () {
        var testServer = { mock: 'foo'};
        var testTarget = 'http://foo.not.found';
        var options = {
            silent: true
        };
        var testResult = {
            user: 'foo user'
        };
        executeCredential.returns(testResult);
        repo.returns(testServer);

        var data = fill(testTarget, options);

        expect(data).to.eql(testResult);

        expect(executeCredential.called).to.be(true);
        expect(executeCredential.args[0][0]).to.eql(['fill']);
        expect(executeCredential.args[0][1]).to.eql(testServer);
        expect(executeCredential.args[0][2]).to.eql(options);

        expect(repo.called).to.be(true);
        expect(repo.args[0][0]).to.be(testTarget);
    });
});
