

var ib = document.getElementById('ib1');
var insert = document.getElementById('ib2');
var btn = document.getElementById('btn1');
var result1 = document.getElementById('result');
var userID = document.getElementById('userID');
var userContents = document.getElementById('userContents');

$(function(){
    $("#userID").click(function(){
        //클릭이벤트 발생시 진행할 스크립트 작성
        //ajaxTest2($("#userID option:selected").text());
        insert.value = $("#userID option:selected").text();
    }),
    $("#userID").dblclick(function(){
        //클릭이벤트 발생시 진행할 스크립트 작성
        //ajaxTest2($("#userID option:selected").text());
        window.open("http://instagram.com/"+$("#userID option:selected").text());
    })
})

function ajaxTest() {
    $.ajax({
        url: '/ajax',                //주소
        dataType: 'json',                  //데이터 형식
        type: 'POST',                      //전송 타입
        data: { msg : ib1.value },      //데이터를 json 형식, 객체형식으로 전송     
        success: function(result) {          //성공했을 때 함수 인자 값으로 결과 값 나옴

            userID.options.length = 0;
            //userID.options[0] = new Option("유저ID","");

            if ( result['result'] == true ) {
                userID.setAttribute("size",result['msg'].length);
                result['msg'].forEach(element => {
                    //result1.textContent+=(element+"<br />");
                    userID.options[userID.options.length] = new Option(element,"");
                });
                //request.setAttribute("arr", result['msg']);
            }

        } //function끝
    }).done(function(response) {
        //alert("success");
    }).fail(function(response, txt, e) {
        alert("fail");
    }); // ------      ajax 끝-----------------
}

function ajaxTest2(uID) {
    $.ajax({
        url: '/ajax2',                //주소
        dataType: 'json',                  //데이터 형식
        type: 'POST',                      //전송 타입
        data: { msg : uID },      //데이터를 json 형식, 객체형식으로 전송     
        success: function(result) {          //성공했을 때 함수 인자 값으로 결과 값 나옴

            userContents.options.length = 0;

            if ( result['result'] == true ) {
                userContents.setAttribute("size",result['msg'].length);
                result['msg'].forEach(element => {
                    userContents.options[userContents.options.length] = new Option(element,"");
                });
            }

        } //function끝
    }).done(function(response) {
        //alert("success");
    }).fail(function(response, txt, e) {
        alert("fail");
    }); // ------      ajax 끝-----------------
}

function insertTest() {
    $.ajax({
        url: '/insert',                //주소
        dataType: 'json',                  //데이터 형식
        type: 'POST',                      //전송 타입
        data: { msg : ib2.value },      //데이터를 json 형식, 객체형식으로 전송     
        success: function(result) {          //성공했을 때 함수 인자 값으로 결과 값 나옴

            ajaxTest();

        } //function끝
    }).done(function(response) {
        //alert("success");
    }).fail(function(response, txt, e) {
        alert("fail");
    }); // ------      ajax 끝-----------------
}

function deleteTest() {
    $.ajax({
        url: '/delete',                //주소
        dataType: 'json',                  //데이터 형식
        type: 'POST',                      //전송 타입
        data: { msg : ib2.value },      //데이터를 json 형식, 객체형식으로 전송     
        success: function(result) {          //성공했을 때 함수 인자 값으로 결과 값 나옴

            ajaxTest();

        } //function끝
    }).done(function(response) {
        //alert("success");
    }).fail(function(response, txt, e) {
        alert("fail");
    }); // ------      ajax 끝-----------------
}