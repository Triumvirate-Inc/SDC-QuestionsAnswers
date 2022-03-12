const password = require('./config.js');
const url = '54.198.95.19';

module.exports.hostUrl = url;

module.exports.serverPort = 3000;

//move this stuff elsewhere
module.exports.dbOptions = {
  host: url,
  port: 5432,
  username: 'test_user',
  database: 'test',
  password: password,
}

module.exports.loaderio_key = '';