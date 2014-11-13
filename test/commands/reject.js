var expect = require('expect.js');
var sinon = require('sinon');
var mockery = require('mockery');

describe('reject', function () {
    var executeCredential;
    var repo;
    var libPath = '../../lib/commands/reject';
    var reject;

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
        reject = require(libPath);
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.resetCache();
        mockery.disable();
    });

    it('should return nothing when the tool has accepted the rejection', function (done) {
        var testServer = { mock: 'foo'};
        var testTarget = 'http://foo.not.found';
        executeCredential.yields(null, {});
        repo.returns(testServer);

        reject(testTarget, function(err, data) {
            expect(data).to.eql({});

            done();
        });

        expect(executeCredential.called).to.be(true);
        expect(executeCredential.args[0][0]).to.eql(['reject']);
        expect(executeCredential.args[0][2]).to.eql(testServer);

        expect(repo.called).to.be(true);
        expect(repo.args[0][0]).to.be(testTarget);
    });
});
