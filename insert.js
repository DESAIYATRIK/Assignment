var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db2) {
  if (err) throw err;
  var dbo = db2.db("Student_records");

  // Array with id, name, and age fields
  var studentDetails = [
    { id: 101, name: 'Aryan Sharma', age: 20 },
    { id: 102, name: 'Sonal Mehta', age: 21 },
    { id: 103, name: 'Ravi Patel', age: 22 },
    { id: 104, name: 'Kavita Rajput', age: 23 },
    { id: 105, name: 'Vijay Chauhan', age: 24 },
    { id: 106, name: 'Neha Singh', age: 20 },
    { id: 107, name: 'Amit Joshi', age: 21 },
    { id: 108, name: 'Pooja Verma', age: 22 },
    { id: 109, name: 'Rahul Gupta', age: 23 },
    { id: 110, name: 'Sneha Desai', age: 24 }
  ];

  dbo.collection("Students").insertMany(studentDetails, function(err, res) {
    if (err) throw err;
    console.log("The count of total students whose data has been inserted are: " + res.insertedCount);
    db2.close();
  });
});
