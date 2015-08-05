var expect = require('expect.js');

describe('parse', function () {
    var parse = require('../../lib/util/parse');

    it('should return an empty object on an empty String', function (done) {
        parse('', function(err, output) {
            expect(output).to.eql({});

            done();
        });
    });

    it('should return an empty object on undefined', function (done) {
        parse(undefined, function(err, output) {
            expect(output).to.eql({});

            done();
        });
    });

    it('should return an empty object on null', function (done) {
        parse(null, function(err, output) {
            expect(output).to.eql({});

            done();
        });
    });

    it('should return an object containing the value from the input', function (done) {
        var input = 'foo=bar';

        parse(input, function(err, output) {
            expect(output).to.eql({
                foo: 'bar'
            });

            done();
        });
    });

    it('should return an object containing the value from the input, including trim', function (done) {
        var input = 'foo = bar';

        parse(input, function(err, output) {
            expect(output).to.eql({
                foo: 'bar'
            });

            done();
        });
    });

    it('should return an object containing the values from the input', function (done) {
        var input = 'foo=bar\n\
        foo2=bar2\n\
        foo3=bar3\n\
        ';

        parse(input, function(err, output) {
            expect(output).to.eql({
                foo: 'bar',
                foo2: 'bar2',
                foo3: 'bar3'
            });

            done();
        });
    });

    it('should filter out empty lines', function (done) {
        var input = 'foo=bar\n\
        \n\
        foo2=bar2\n\
        foofoo\n\
        foo3=bar3\n\
        foo4=\n\
        ';

        parse(input, function(err, output) {
            expect(output).to.eql({
                foo: 'bar',
                foo2: 'bar2',
                foo3: 'bar3',
                foo4: ''
            });

            done();
        });
    });

    it('should return the result when no callback is provided', function () {
        var input = 'foo=bar\n\
        \n\
        foo2=bar2\n\
        foofoo\n\
        foo3=bar3\n\
        foo4=\n\
        ';

        var result = parse(input);

        expect(result.err).to.be(null);
        expect(result.output).to.eql({
                foo: 'bar',
                foo2: 'bar2',
                foo3: 'bar3',
                foo4: ''
        });
    });
});
