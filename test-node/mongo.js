// MongoDB 3.0 以上版本适用，老版本不适用。
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/test', (err, client) => {
  if(err) {
    throw err;
  } 
  
  let db = client.db('test');
  db.collection('inventory').find().toArray((err, result) => {
    if(err) throw err;
    console.log(result);
    client.close();
  });
});
