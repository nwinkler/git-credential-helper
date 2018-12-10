
// Code based largely on this module:
// https://www.npmjs.org/package/git-credential
function parseOutput(data, callback) {
    var output = {};

    if (data) {
        output = data.toString('utf-8')
            .split('\n')
            .map(function (line) {
                var index = line.indexOf('=');
                if (index !== -1) {
                    return [line.substr(0, index), line.substr(index + 1)];
                } else {
                    return line;
                }
            })
            .filter(function (lineItems) {
                // Filter out empty lines
                return lineItems.length === 2;
            })
            .reduce(function (obj, val) {
                obj[val[0].trim()] = val[1].trim();
                return obj;
            }, {});
    }

    callback(null, output);
}

module.exports = parseOutput;

