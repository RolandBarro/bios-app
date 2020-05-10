require('dotenv').config();
const { MONGO_ADMIN, DB_PWD, NODE_ENV } = process.env;

let uri, message;

if(NODE_ENV === 'live') {
  uri = `mongodb+srv://${MONGO_ADMIN}:${DB_PWD}@cluster0-tharj.mongodb.net/bios-ph?retryWrites=true&w=majority`;
  message = 'DB is connected at live mode.';
} else {
  uri = 'mongodb://localhost/bios';
  message = 'DB is connected at local mode.';
}

console.log(uri, message);

module.exports = {
  uri,
  message,
};
