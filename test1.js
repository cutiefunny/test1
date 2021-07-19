
var ib = document.getElementById('ib1');
var btn = document.getElementById('btn1');
var txt = document.querySelector('p');
var label = document.querySelector('label');


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