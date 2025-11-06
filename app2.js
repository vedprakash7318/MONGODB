const {MongoClient}=require("mongodb")
const http=require('http')
const client=new MongoClient('mongodb://localhost:27017/');
const PORT=5000;

async function insertUser(data,res) {
    
    // const db=database.db("testDB");
    // const users=db.collection("users");
    // const allUser=await users.insertOne({"name":"ved","age":19});    
    // const finalUsers=await users.find().toArray()
    // console.log(finalUsers);
    // const db=await database.db().admin().listDatabases()
    // console.log(db);
    

    try {
    await client.connect();   
    const db=client.db("TextDb");
    const users=db.collection('users');
    await users.insertOne(data)

    res.writeHead(200,{"content-type":"application/json"})
    res.end(JSON.stringify({success:true,message:'User Added Successfully'}));
    } catch (error) {
        console.log(error);
        
    res.writeHead(200,{"content-type":"application/json"})
    res.end(JSON.stringify({success:true,message:'Database error'}));
    }
}


async function showUsers(res) {
  try {
    await client.connect();
    const db = client.db("TextDb");
    const users = db.collection("users");

    const allUsers = await users.find().toArray();

    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ success: true, data: allUsers }));
  } catch (error) {
    console.error(error);
    res.writeHead(500, { "content-type": "application/json" });
    res.end(JSON.stringify({ success: false, message: "Database Error" }));
  }
}



const server=http.createServer((req,res)=>{
    if(req.method==='POST' && req.url==='/add-user'){
        let body=[];
        req.on('data',(chunk)=>body.push(chunk))
        req.on('end',()=>{
            const data=JSON.parse(body)
            insertUser(data,res)
        })
    }
    else if (req.method === "GET" && req.url === "/get-users") {
    showUsers(res);
  } 
    else{
        res.writeHead(500,{"content-type":"application/json"});
        res.end(JSON.stringify({message:"NOT FOUND"}))
    }
})

server.listen(PORT)