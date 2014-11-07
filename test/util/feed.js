var expect = require('expect.js');

describe('feed', function () {
    var feed = require('../../lib/util/feed');

    it('should return a single line feed for an empty object', function () {
        var obj = {};

        var text = feed(obj);

        expect(text).to.be('\n');
    });

    it('should return one line per property', function () {
        var obj = {
            foo: 'bar',
            foo2: 'bar2',
            foo3: 'bar3',
            foo4: ''
        };

        var text = feed(obj);

        expect(text).to.eql('foo=bar\n\
foo2=bar2\n\
foo3=bar3\n\
\n');
    });
});
