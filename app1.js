const {MongoClient}=require("mongodb")

const database=new MongoClient('mongodb://localhost:27017/');

async function run() {
    await database.connect();
    // const db=database.db("testDB");
    // const users=db.collection("users");
    // const allUser=await users.insertOne({"name":"ved","age":19});    
    // const finalUsers=await users.find().toArray()
    // console.log(finalUsers);
    const db=await database.db().admin().listDatabases()
    console.log(db);
}
run()