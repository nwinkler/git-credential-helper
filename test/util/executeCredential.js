var expect = require('expect.js');
var mockSpawn = require('mock-spawn');

var mySpawn = mockSpawn();
require('child_process').spawn = mySpawn;

describe('executeCredential', function () {
    var executeCredential = require('../../lib/util/executeCredential');

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
