const express = require('express');
const port = 3000;
// const axios = require("axios");
// const cheerio = require("cheerio");
const log = console.log;

const bodyparser= require('body-parser');
const app = express();

app.use(express.static('public'))
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use('/script',express.static(__dirname + "/script"));

//("mongodb+srv://cutiefunny:ghks1015@macrodb.srkli.mongodb.net/macroDB?retryWrites=true&w=majority")

const { MongoClient } = require("mongodb");
const query = { user: "nyanya.toon" };

let name = "test";
global.name=name;


// Connection URI
const uri =
  "mongodb+srv://cutiefunny:ghks1015@macrodb.srkli.mongodb.net/macroDB?retryWrites=true&w=majority";
// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
    try {
      // Connect the client to the server
      await client.connect();

      const database = client.db("macroDB");
      const userList = database.collection("userList");

      const user = await userList.findOne(query);

      // Establish and verify connection
      await client.db("macroDB").command({ ping: 1 });
      console.log("Connected successfully to server");
      let i=0;

      console.log(user.user);
      name = user.user;

      (await userList.find().toArray()).forEach(document => {
         console.log(document)
      });
    //   (await client.db("macroDB").collections()).forEach(collection => {
    //     //console.log(collection);
    //     console.log(i++);
    //     console.log(collection.namespace.toString());
    //     console.log(collection.findOne(query));
    //   }); 

    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

function getData(){
  try {
    client.connect();

    database = client.db("macroDB");
    userList = database.collection("userList");

    user = userList.findOne(query);
    console.log(user.user);

    return user.user;
    
  } finally {
    client.close();
  }
}

//const app = express();
var http = require('http');
var fs = require('fs');

// function send404Message(response){ response.writeHead(404,{"Content-Type":"text/plain"}); // 단순한 글자 출력 
// response.write("404 ERROR... "); response.end(); 
// }

// function onRequest(request, response){ 
//     if(request.method == 'GET' && request.url == '/'){ 
//         response.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
        
//         fs.createReadStream("./index.html").pipe(response);
//     }else {
//         send404Message(response); 
//     }
// }

app.listen(3000, ()=>{
    console.log('3000번 포트에 대기중!')
})

// http.createServer(onRequest).listen(port);
console.log("server started");

app.get('',function(req,res){
    res.render("index.html",{name:name} );
 });

//app.set('view engine', 'pug');

// app.get('/', function (req, res) {
//     res.render('index', { title: 'Hey'
//                         , message: 'Hello there!'
//                         , message2: 'test'
//                     });
//   });
// if(request.method == 'GET' && request.url == '/'){ 
//     response.writeHead(200,{"Content-Type":"text/html"}); 
// }

// app.listen(port,function()  {
//     console.log("server started");
// })


// const getHtml = async () => {
//   try {
//     return await axios.get("https://wooh.co.kr/");
//   } catch (error) {
//     console.error(error);
//   }
// };

// getHtml()
//   .then(html => {
//     let ulList = [];
//     const $ = cheerio.load(html.data);
//     const $bodyList = $("div.tbl_wrap2 ul").children("li.bo_notice2");  //htb_head05 tbl_wrap2

//     $bodyList.each(function(i, elem) {
//       ulList[i] = {
//           title: $(this).find('strong.sct_txt a').text(),
//           //url: $(this).find('strong.news-tl a').attr('href'),
//           //image_url: $(this).find('p.poto a img').attr('src'),
//           //image_alt: $(this).find('p.poto a img').attr('alt'),
//           //summary: $(this).find('p.lead').text().slice(0, -11),
//           //date: $(this).find('span.p-time').text()
//       };
//     });

//     const data = ulList.filter(n => n.title);
//     return data;
//   })
//   .then(res => log(res));