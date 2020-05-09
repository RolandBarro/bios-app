require('dotenv').config();
const { MONGO_ADMIN, DB_PWD } = process.env;

console.log(MONGO_ADMIN, DB_PWD);

let uri, message;

if(process.env.NODE_ENV === 'live') {
  uri = `mongodb+srv://${MONGO_ADMIN}:${DB_PWD}@cluster0-tharj.mongodb.net/bios-ph?retryWrites=true&w=majority`;
  message = 'DB is connected at live mode.';
} else {
  uri = 'mongodb://localhost/bios';
  message = 'DB is connected at local mode.';
}

module.exports = {
  uri,
  message,
};
