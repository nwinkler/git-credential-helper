function parseOutput(data) {
    var output = data.split('\n')
    .map(function (line) {
        return line.split('=');
    })
    .filter(function (lineItems) {
        // Filter out empty lines
        return lineItems.length === 2;
    })
    .reduce(function (obj, val) {
        obj[val[0].trim()] = val[1].trim();
        return obj;
    }, {});

    return output;
}

module.exports = parseOutput;
