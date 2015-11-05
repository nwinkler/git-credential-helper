var expect = require('expect.js');
var sinon = require('sinon');
var mockery = require('mockery');

describe('rejectSync', function () {
    var executeCredential;
    var repo;
    var libPath = '../../lib/commands/rejectSync';
    var reject;

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
        reject = require(libPath);
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.resetCache();
        mockery.disable();
    });

    it('should return nothing when the tool has accepted the rejection', function () {
        var testServer = { mock: 'foo'};
        var testTarget = 'http://foo.not.found';
        var testResult = {
            err: '',
            output: {}
        };
        executeCredential.returns(testResult);
        repo.returns(testServer);

        var data = reject(testTarget);

        expect(data).to.eql(testResult);

        expect(executeCredential.called).to.be(true);
        expect(executeCredential.args[0][0]).to.eql(['reject']);
        expect(executeCredential.args[0][1]).to.eql(testServer);

        expect(repo.called).to.be(true);
        expect(repo.args[0][0]).to.be(testTarget);
    });
});
