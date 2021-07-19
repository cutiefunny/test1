
var ib = document.getElementById('ib1');
var btn = document.getElementById('btn1');
var txt = document.querySelector('p');
var label = document.querySelector('label');

import mongoose from "mongoose";

mongoose.connect("mongodb+srv://cutiefunny:ghks1015@macrodb.srkli.mongodb.net/macroDB?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useFindAndModify: true
});

//MongoDB와의 연결을 db로 저장
const db = mongoose.connection;

const handleOpen = () => console.log("✅Connected to DB");
const handleError = () => console.log(`❌ Error on DB Connection:${error}`);

db.once("open", handleOpen);
db.on("eroor", handleError);

//btn.addEventListener('click', updateBtn);

function updateBtn() {
    if (btn.value === '기계 켜기') {
        btn.value = '기계 끄기';
        txt.textContent = '기계가 켜졌습니다!';
    } else {
        btn.value = '기계 켜기';
        txt.textContent = '기계가 멈췄습니다.';
    }
    label.textContent = ib.value;
}