require('dotenv').config();
const { MONGO_ADMIN, DB_PWD, NODE_ENV } = process.env;

let uri, message;

if (NODE_ENV === 'live') {
  uri = `mongodb://${MONGO_ADMIN}:${DB_PWD}@cluster0-shard-00-00-tharj.mongodb.net:27017/bios-ph?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`;
  message = 'DB is connected at live mode.';
} else {
  uri = 'mongodb://localhost/bios';
  message = 'DB is connected at local mode.';
}

module.exports = {
  uri,
  message,
};
