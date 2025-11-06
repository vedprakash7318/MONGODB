const { MongoClient } = require("mongodb");
const http = require("http");
const fs = require("fs");
const querystring = require("querystring");

const client = new MongoClient("mongodb://localhost:27017/");

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

const server = http.createServer((req, res) => {
  
  if (req.url === "/" && req.method === "GET") {
    fs.readFile("index.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.write("<br/><br/><br/><a href='/show'>Show</a>")
      res.end()
    });
  }

  else if (req.url === "/create" && req.method === "POST") {
    let body =[];
    req.on("data", chunk => body.push(chunk));
    req.on("end", async () => {
        const rawData=Buffer.concat(body).toString()
      const formData = querystring.parse(rawData);
      const sendapi=JSON.parse(rawData)
      await insertUser(sendapi);

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`<h3>Data Saved Successfully!</h3><a href="/">Back</a>`);
    });
  }

  else if (req.url === "/show" && req.method === "GET") {
    showUsers(res);
  }

  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 - Page Not Found</h1>");
  }
});


server.listen(3001, () => console.log("Server running on http://localhost:3001"));
