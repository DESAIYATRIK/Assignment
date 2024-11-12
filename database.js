var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";

MongoClient.connect(url, function(err, client) {
    if (err) {
        console.error("Connection error:", err);
        return;
    }
    console.log("Connected successfully to MongoDB server");

    var dbo = client.db("Student_records");
    dbo.createCollection("Students", function(err, res) {
        if (err) throw err;
        console.log("Collection created");
        client.close();
    });
});
