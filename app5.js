const { MongoClient } = require("mongodb");
const http = require("http");
const client= new MongoClient("mongodb://localhost:27017/")

async function insertUser(formData) {
  await client.connect();
  const db = client.db("testDB");
  const users = db.collection("users");
  await users.insertOne(formData);
}


async function showUsers(res) {
  await client.connect();
  const db = client.db("testDB");
  const users = db.collection("users");
  const allUsers = await users.find().toArray();

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(allUsers));
}
const server=http.createServer((req,res)=>{
 res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  if(req.url==='/save' && req.method==='POST'){
   let body=[] 
   req.on("data",(chunk)=>body.push(chunk))
   req.on("end",()=>{
    const rawData=Buffer.concat(body).toString();
    const finalData=JSON.parse(rawData);
    console.log(finalData);
    insertUser(finalData)
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<h3>Data Saved Successfully!</h3>`);
    
   })
  }
  
  else if (req.url === "/show" && req.method === "GET") {
    showUsers(res);
  }

  else{
     res.writeHead(404, { "Content-Type": "text/html" });
    res.end(`<h3>Page Not Found!</h3>`);
  }
})


server.listen(3000,()=>console.log("Server start"))
