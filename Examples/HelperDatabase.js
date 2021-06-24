const MongoClient = require('mongodb').MongoClient;
const uri = "";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectTest(){
    await client.connect();
    console.log("connected");
    await client.close();
    console.log("disconnected");
}
connectTest();
// .then(client => {
//     console.log("Database Connected!");

//     const db = client.db("menotedb");
//     const userCollection = db.collection("users");
//     userCollection.insertOne(
//         {"username":"as admin"}
//     ).then(result => {
//         console.log("Insert Success!");
//         return console.log("status: " + result['result']['ok']);
//     }).catch(error => {
//         console.log("Error occurred");
//         return console.log(error);
//     })
// })