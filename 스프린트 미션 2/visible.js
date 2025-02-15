const icon1 = document.getElementById('icon1');
const pw1 = document.getElementById('pw1');
const icon2 = document.getElementById('icon2');
const pw2 = document.getElementById('pw2');


let tmp1=0,tmp2=0;

icon1.onclick = function() {
    if (tmp1 == 0){
        tmp1=1;         
        pw1.type = 'text';        
        }
    else {
        tmp1=0;        
        pw1.type = 'password';        
        }
}

icon2.onclick = function() {
    if (tmp2 == 0){
        tmp2=1;         
        pw2.type = 'text';        
        }
    else {
        tmp2=0;        
        pw2.type = 'password';        
        }
}

/*
$(function(){
    // 눈표시 클릭 시 패스워드 보이기
    $('.eye').on('click',function(){
      $('.input_area').toggleClass('active');
  
      if( $('.input_area').hasClass('active') == true ){
          $(this).find('.eye').attr('class',"eye").parents('.input').find('#password').attr('type',"text");
                      // i 클래스                // 텍스트 보이기 i 클래스
      }
      else{
          $(this).find('.eye').attr('class',"eye").parents('.input').find('#password').attr('type','password');
      }
    });
  });*/ 