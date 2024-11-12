var MongoClient =require('mongodb').MongoClient;
var url="mongodb://localhost:27017"
;
MongoClient.connect(url, function(err,db2) {
    if(err) throw err;
    console.log("Database Created");
    db2.close();
});