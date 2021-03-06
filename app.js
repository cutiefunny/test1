const express = require('express');
const port = 3000;
// const axios = require("axios");
// const cheerio = require("cheerio");
const log = console.log;

const bodyparser= require('body-parser');
const app = express();

app.use(express.static(__dirname + '/public/'))
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use('/script',express.static(__dirname + "/script"));
app.use('/views',express.static(__dirname + "/views"));

//("mongodb+srv://cutiefunny:ghks1015@macrodb.srkli.mongodb.net/macroDB?retryWrites=true&w=majority")

const { MongoClient } = require("mongodb");
//const query = { user: "nyanya.toon" };

let name = "test";
global.name=name;

// Connection URI
const uri =
  "mongodb+srv://cutiefunny:ghks1015@macrodb.srkli.mongodb.net/macroDB?retryWrites=true&w=majority";
// Create a new MongoClient
const client = new MongoClient(uri);
client.connect();

app.listen(3000, ()=>{
    console.log('3000번 포트에 대기중!')
})

// http.createServer(onRequest).listen(port);
console.log("server started");

app.get('',function(req,res){
    res.render("index.html",{name:name} );
 });

//ajax 부분
app.get('/getajax', function(req, res, next) {
  res.render("/ajax");
});

app.get('/getajax2', function(req, res, next) {
  res.render("/ajax2");
});

app.get('/setajax', function(req, res, next) {
  res.render("/insert");
});

app.get('/delajax', function(req, res, next) {
  res.render("/delete");
});

/* POST 호출 처리 */

app.post('/ajax', function(req, res, next) {
  console.log('POST 방식으로 서버 호출됨');
  //var msg = req.body.msg;

  getData(req.body.msg)//.then((msg) => console.log(msg));
                      .then((msg) => {
                        console.log(msg);
                        res.send({result:true, msg:msg});
                      });

});

app.post('/ajax2', function(req, res, next) {
  console.log('POST 방식으로 서버 호출됨');
  //var msg = req.body.msg;

  getData2(req.body.msg)//.then((msg) => console.log(msg));
                      .then((msg) => {
                        console.log(msg);
                        res.send({result:true, msg:msg});
                      });

});

app.post('/insert', function(req, res, next) {

  setData(req.body.msg)//.then((msg) => console.log(msg));
                      .then((msg) => {
                        console.log(msg);
                        res.send({result:true, msg:msg});
                      });

});

app.post('/delete', function(req, res, next) {

  delData(req.body.msg)//.then((msg) => console.log(msg));
                      .then((msg) => {
                        console.log(msg);
                        res.send({result:true, msg:msg});
                      });

});

async function getData(req){

    var database = client.db("macroDB");
    var userList = database.collection("whiteList");
    //user = await userList.findOne({ user: {$regex:req} });
    users = await userList.find({ name: {$regex:req} }).toArray();

    var list = [];
    users.forEach(element => {
      if(!list.includes(element.name)) list.push(element.name);
      //console.log(list);
    });
    return list;
    //return user.user;
}

async function getData2(req){

  var database = client.db("macroDB");
  var userList = database.collection("history");
  //user = await userList.findOne({ user: {$regex:req} });
  users = await userList.find({ userName: {$regex:req} }).toArray();

  var list = [];
  users.forEach(element => {
    if(!list.includes(element.contents.split('#')[0])) {
      var strArray = element.contents.split('#');
      list.push(strArray[0]);
    }
    //console.log(list);
  });
  return list;
  //return user.user;
}

async function setData(req){

  var database = client.db("macroDB");
  var userList = database.collection("whiteList");
  var doc = { name : req, lastDate : "20210726" };
  //user = await userList.findOne({ user: {$regex:req} });
  userList.insertOne(doc);

  return req;
  //return user.user;
}

async function delData(req){

  var database = client.db("macroDB");
  var userList = database.collection("whiteList");
  var doc = { name : req };
  //user = await userList.findOne({ user: {$regex:req} });
  userList.deleteOne(doc);

  return req;
  //return user.user;
}

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

// async function run() {
//     try {
//       // Connect the client to the server
//       await client.connect();

//       const database = client.db("macroDB");
//       const userList = database.collection("userList");

//       const user = await userList.findOne(query);

//       // Establish and verify connection
//       await client.db("macroDB").command({ ping: 1 });
//       console.log("Connected successfully to server");
//       let i=0;

//       console.log(user.user);
//       name = user.user;

//       (await userList.find().toArray()).forEach(document => {
//          console.log(document)
//       });

//     } finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
//   }
//   run().catch(console.dir);

// const app = express();

// var http = require('http');
// var fs = require('fs');
// const { assert } = require('console');
// const { response } = require('express');
// const { promiseImpl } = require('ejs');

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