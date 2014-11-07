var url = require('url');
var string = require('mout').string;

function repo (target) {
    var ret = {};

    var parsedUrl = url.parse(target);

    if (parsedUrl.protocol) {
        ret.protocol = string.rtrim(parsedUrl.protocol, [':']);
    }

    if (parsedUrl.host) {
        ret.host = parsedUrl.host;
    }

    if (parsedUrl.path) {
        var path = string.ltrim(parsedUrl.path, ['/']);

        if (path) {
            ret.path = path;
        }
    }

    return ret;
}

module.exports = repo;
