const cluster = require('cluster');
const SocketIPC = require('../SocketIPC');
const assert = require('assert');

if (cluster.isMaster) {
  SocketIPC.registerMaster({
    init() {
      setTimeout(() => {
        let result = SocketIPC.broadcast('hehe');
        assert.equal(result.length, 1);
        process.exit(0);
      }, 500);
    },
    exit(params) { process.exit(params); }
  });
  SocketIPC.register('hehe', () => {
    return 'hehe';
  });
  let worker = cluster.fork();
} else {
  SocketIPC.call('init').then(() => {
    process.exit(1);
  });
}
