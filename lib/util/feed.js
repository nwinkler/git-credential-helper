var object = require('mout').object;

function feed (obj) {
    var ret = '';

    ret = object.reduce(obj, function (prev, cur, key) {
        if (cur) {
            return prev + key + '=' + cur + '\n';
        }
        else {
            return prev;
        }
    }, '');

    ret += '\n';

    return ret;
}

module.exports = feed;
