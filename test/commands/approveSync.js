var expect = require('expect.js');
var sinon = require('sinon');
var mockery = require('mockery');

describe('approveSync', function () {
    var executeCredential;
    var repo;
    var libPath = '../../lib/commands/approveSync';
    var approve;

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
        approve = require(libPath);
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.resetCache();
        mockery.disable();
    });

    it('should return nothing when the tool has accepted the approval', function () {
        var testServer = { mock: 'foo'};
        var testTarget = 'http://foo.not.found';
        var testResult = {
            err: '',
            output: {}
        };
        var credentials = {
            username: 'user',
            password: 'pass'
        };

        var testServerCredentials = {
            mock: 'foo',
            username: 'user',
            password: 'pass'
        };

        executeCredential.returns(testResult);
        repo.returns(testServer);

        var data = approve(testTarget, credentials);
        expect(data).to.eql(testResult);

        expect(executeCredential.called).to.be(true);
        expect(executeCredential.args[0][0]).to.eql(['approve']);
        expect(executeCredential.args[0][1]).to.eql(testServerCredentials);

        expect(repo.called).to.be(true);
        expect(repo.args[0][0]).to.be(testTarget);
    });

    it('should optionally pass the username and password if provided', function () {
        var testServer = { mock: 'foo'};
        var testTarget = 'http://foo.not.found';
        var testResult = {
            err: '',
            output: {}
        };
        var credentials = {};

        var testServerCredentials = {
            mock: 'foo'
        };

        executeCredential.returns(testResult);
        repo.returns(testServer);

        var data = approve(testTarget, credentials);
        expect(data).to.eql(testResult);

        expect(executeCredential.called).to.be(true);
        expect(executeCredential.args[0][0]).to.eql(['approve']);
        expect(executeCredential.args[0][1]).to.eql(testServerCredentials);

        expect(repo.called).to.be(true);
        expect(repo.args[0][0]).to.be(testTarget);
    });

    it('should not fail when the options are not provided', function () {
        var testServer = { mock: 'foo'};
        var testTarget = 'http://foo.not.found';
        var testResult = {
            err: '',
            output: {}
        };

        var testServerCredentials = {
            mock: 'foo'
        };

        executeCredential.returns(testResult);
        repo.returns(testServer);

        var data = approve(testTarget);
        expect(data).to.eql(testResult);

        expect(executeCredential.called).to.be(true);
        expect(executeCredential.args[0][0]).to.eql(['approve']);
        expect(executeCredential.args[0][1]).to.eql(testServerCredentials);

        expect(repo.called).to.be(true);
        expect(repo.args[0][0]).to.be(testTarget);
    });
});
