
var ib = document.getElementById('ib1');
var btn = document.getElementById('btn1');
var txt = document.querySelector('p');
var label = document.querySelector('label');
var result1 = document.getElementById('result');

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

function ajaxTest() {
    $.ajax({
        url: '/ajax',                //주소
        dataType: 'json',                  //데이터 형식
        type: 'POST',                      //전송 타입
        data: { msg : ib1.value },      //데이터를 json 형식, 객체형식으로 전송     
        success: function(result) {          //성공했을 때 함수 인자 값으로 결과 값 나옴

            if ( result['result'] == true ) {
                result1.textContent = result['msg'];
            }

        } //function끝
    }).done(function(response) {
        //alert("success");
    }).fail(function(response, txt, e) {
        alert("fail");
    }); // ------      ajax 끝-----------------
}