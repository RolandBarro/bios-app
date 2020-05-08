require('dotenv').config();
const { MONGO_ADMIN, PASSWORD } = process.env;

let uri, message;

if(process.env.NODE_ENV === 'live') {
  uri = `mongodb+srv://${MONGO_ADMIN}:${PASSWORD}@cluster0-ze4yr.mongodb.net/school-suite?retryWrites=true`;
  message = 'DB is connected at live mode.';
} else {
  uri = 'mongodb://localhost/bios';
  message = 'DB is connected at local mode.';
}

module.exports = {
  uri,
  message,
};
