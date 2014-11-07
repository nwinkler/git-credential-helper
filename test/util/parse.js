var expect = require('expect.js');

describe('parse', function () {
    var parse = require('../../lib/util/parse');

    it('should return an empty object on an empty String', function () {
        var result = parse('');

        expect(result).to.eql({});
    });

    it('should return an object containing the value from the input', function () {
        var input = 'foo=bar';

        var result = parse(input);

        expect(result).to.eql({
            foo: 'bar'
        });
    });

    it('should return an object containing the value from the input, including trim', function () {
        var input = 'foo = bar';

        var result = parse(input);

        expect(result).to.eql({
            foo: 'bar'
        });
    });

    it('should return an object containing the values from the input', function () {
        var input = 'foo=bar\n\
        foo2=bar2\n\
        foo3=bar3\n\
        ';

        var result = parse(input);

        expect(result).to.eql({
            foo: 'bar',
            foo2: 'bar2',
            foo3: 'bar3'
        });
    });
});
