const core = require('boy-howdy-core')
const config = require('./config.json');

const client = new core.Client(config);

function destructor() {
  console.log('Process exiting, destroying client...');
  client.destroy();
}

process.on('exit', destructor);
process.on('SIGINT', destructor);
process.on('SIGUSR1', destructor);
process.on('SIGUSR2', destructor);

process.on('unhandledRejection', error => {
  console.log(error);
  process.exit(2);
});

client.boot();

module.exports.default = client;
