const http = require("http");
const nodemailer = require("nodemailer");

const server = http.createServer((req, res) => {
  if (req.url === "/send" && req.method === "GET") {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kripashankark152@gmail.com", 
        pass: "finhrrjahndnpnpt",   
      },
    });
    let mailOptions = {
      from: "kripashankark152@gmail.com",
      to: "nk0071489@gmail.com",
      subject: "Test Email from Node.js",
      text: "Hello! This is a test email sent from Node.js without Express 🚀",
    };

    // ✅ Send mail
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error: " + error.message);
      } else {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Email sent successfully: " + info.response);
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Page Not Found");
  }
});

server.listen(3000, () => console.log("Server running at http://localhost:3000"));
