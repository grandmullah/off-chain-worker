
const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');

const credentials = './X509-cert-3406721595276256674.pem'

const client = new MongoClient('mongodb+srv://cluster0.0wni5o1.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
  sslKey: credentials,
  sslCert: credentials,
  serverApi: ServerApiVersion.v1
});

module.exports ={
    client
}


// basefare 
// per kilometer 
// time 