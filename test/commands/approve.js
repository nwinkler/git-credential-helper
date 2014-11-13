var expect = require('expect.js');
var sinon = require('sinon');
var mockery = require('mockery');

describe('approve', function () {
    var executeCredential;
    var repo;
    var libPath = '../../lib/commands/approve';
    var approve;

    beforeEach(function () {
        executeCredential = sinon.stub();
        repo = sinon.stub();

        mockery.enable({
            useCleanCache: true,
            warnOnUnregistered: false
        });

        mockery.registerMock('../util/executeCredential', executeCredential);
        mockery.registerMock('../util/repo', repo);
        mockery.registerAllowable(libPath, true);
        approve = require(libPath);
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.resetCache();
        mockery.disable();
    });

    it('should return nothing when the tool has accepted the approval', function (done) {
        var testServer = { mock: 'foo'};
        var testTarget = 'http://foo.not.found';
        var credentials = {
            username: 'user',
            password: 'pass'
        };
        var testServerCredentials = {
            mock: 'foo',
            username: 'user',
            password: 'pass'
        };
        executeCredential.yields(null, {});
        repo.returns(testServer);

        approve(testTarget, credentials, function(err, data) {
            expect(data).to.eql({});

            done();
        });

        expect(executeCredential.called).to.be(true);
        expect(executeCredential.args[0][0]).to.eql(['approve']);
        expect(executeCredential.args[0][2]).to.eql(testServerCredentials);

        expect(repo.called).to.be(true);
        expect(repo.args[0][0]).to.be(testTarget);
    });
});
