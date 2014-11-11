var expect = require('expect.js');
var mockSpawn = require('mock-spawn');

var mySpawn = mockSpawn();
require('child_process').spawn = mySpawn;

describe.only('fill', function () {
    var fill = require('../../lib/commands/fill');

    it('should return nothing when the server does not have any stored credentials', function (done) {
        mySpawn.sequence.add(mySpawn.simple(0, '\n'));

        fill('http://foo.not.found', function(err, data) {
            expect(data).to.eql({});

            done();
        });
    });

    it('should return nothing when the git command fails', function (done) {
        mySpawn.sequence.add(mySpawn.simple(1, null, 'git error'));

        fill('http://foo.not.found', function(err, data) {
            expect(data).to.eql({});

            done();
        });
    });

    it('should return the record when the server has stored credentials', function (done) {
        mySpawn.sequence.add(mySpawn.simple(0, 'foo=bar\n\
        foo2=bar2\n\
        foo3=bar3\n\
        '));

        fill('http://foo.found', function(err, data) {
            expect(data).to.eql({
                foo: 'bar',
                foo2: 'bar2',
                foo3: 'bar3'
            });

            done();
        });
    });
});
