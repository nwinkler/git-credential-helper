var expect = require('expect.js');

describe('repo', function () {
    var repo = require('../../lib/util/repo');

    it('should return an empty object for an empty URL', function () {
        var result = repo('');

        expect(result).to.eql({});
    });

    it('should return only the parts that are fed in', function () {
        var result = repo('foo');

        expect(result).to.eql({
            path: 'foo'
        });
    });

    it('should return an object for a URL', function () {
        var result = repo('http://foo.invalid.bar/baz.git');

        expect(result).to.eql({
            protocol: 'http',
            host: 'foo.invalid.bar',
            path: 'baz.git'
        });
    });

    it('should return an object for a URL, leaving out empty attributes', function () {
        var result = repo('http://foo.invalid.bar');

        expect(result).to.eql({
            protocol: 'http',
            host: 'foo.invalid.bar'
        });
    });
});
