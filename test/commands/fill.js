var expect = require('expect.js');
var sinon = require('sinon');
var mockery = require('mockery');

describe('fill', function () {
    var executeCredential;
    var repo;
    var libPath = '../../lib/commands/fill';
    var fill;

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
        fill = require(libPath);
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.resetCache();
        mockery.disable();
    });

    it('should return nothing when the server does not have any stored credentials', function (done) {
        var testServer = { mock: 'foo'};
        var testTarget = 'http://foo.not.found';
        executeCredential.yields(null, {});
        repo.returns(testServer);

        fill(testTarget, function(err, data) {
            expect(data).to.eql({});

            expect(executeCredential.called).to.be(true);
            expect(executeCredential.args[0][0]).to.eql(['fill']);
            expect(executeCredential.args[0][2]).to.eql(testServer);

            expect(repo.called).to.be(true);
            expect(repo.args[0][0]).to.be(testTarget);

            done();
        });
    });
});
