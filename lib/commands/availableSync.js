var spawnSync = require('spawn-sync');

function availableSync() {
    var result = spawnSync('git', ['config', 'credential.helper']);

    var out = result.stdout.toString();
    var err = result.stderr.toString();
    var status = result.status;

    if (!status && !err && out) {
        return true;
    }
    else {
        return false;
    }
}

module.exports = availableSync;
