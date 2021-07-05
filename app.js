const express = require('express');
const port = 3000;
// const axios = require("axios");
// const cheerio = require("cheerio");
const log = console.log;

const app = express();

app.set('view engine', 'pug');

app.get('/', function (req, res) {
    res.render('index', { title: 'Hey'
                        , message: 'Hello there!'
                        , message2: 'test'
                    });
  });
 

app.listen(port,function()  {
    console.log("server started");
})


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