
const admin = require("firebase-admin");
const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');
const serviceAccount = require("../radicle-383305-firebase-adminsdk-cjw9x-f9cf801d22.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://radicle-383305-default-rtdb.firebaseio.com"
});


module.exports = {
    admin,
}