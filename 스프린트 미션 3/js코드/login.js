//눈모양 아이콘 토글을 위한 코드//
const icon = document.getElementById('eye1');
const pw1 = document.getElementById('pw1');
let eye_visible=0;
icon.onclick = function() {
    if (eye_visible == 0){
        eye_visible=1;         
        pw1.type = 'text';  
        icon.children[0].outerHTML='<img src=../img/btn_visible.png>'        }
    else {
        eye_visible=0;        
        pw1.type = 'password';        
        icon.children[0].outerHTML='<img src="../img/btn_not_visible.png">'       }}


//id=이메일인풋영역, pw=비밀번호인풋영역, bt=로그인버튼 idTest=이메일 유효성 검사 정규식식      
const inputDiv= document.getElementsByClassName('inputDiv');
const id=inputDiv[0].firstElementChild.nextElementSibling.firstChild.nextSibling;
const pw=document.getElementById('pw1');
const bt=document.getElementById('loginBtn');
const idErrorMsg = document.createElement('div'); 
const pwErrorMsg = document.createElement('div');
var idTest = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

//조건값에 맞으면 오류메세지 삭제//
function reset_id(tmp){        
    if(idTest.test(id.value) ){
        inputDiv[0].style.height=98;
        tmp.remove();}}
function reset_pw(tmp){        
    if((pw.value).length > 7){
        inputDiv[1].style.height=98;
        tmp.remove();}}

 // 로그인 버튼 활성화 함수//
function checking(){
    if(id.classList.contains('focusOut')&&pw.classList.contains('focusOut')){
        bt.style.setProperty("background-color", '#3692FF');        
        bt.disabled = false;        
    }
    else{
        bt.style.backgroundColor='#9CA3AF';
        bt.classList.remove('btActive'); 
        bt.disabled=true;    
        }
}
//id입력창에 입력할때 파란테두리//
id.addEventListener('focusin',function(){    
    id.classList.remove('focusOut');
    id.classList.remove('focusErr');
    id.classList.add('focusIn');        
});
// pw입력창에 입력할때 파란테두리//
pw.addEventListener('focusin',function(){    
    pw.classList.remove('focusOut');
    pw.classList.remove('focusErr');
    pw.classList.add('focusIn');            
});

// id입력창 입력값 유효성 테스트//
id.addEventListener('focusout',function(){      
    const tmp=id.value;

    if(tmp === '' ){        
        id.classList.add('focusErr');    
        idErrorMsg.textContent= "이메일을 입력해주세요"
        idErrorMsg.classList.add('errerMsgStyle');
        inputDiv[0].style.height=120;
        inputDiv[0].append(idErrorMsg);    
     }
    else if(!(idTest.test(tmp))){
        id.classList.remove('focusIn');
        id.classList.add('focusErr');    
        idErrorMsg.textContent= "잘못된 이메일 형식입니다"
        idErrorMsg.classList.add('errerMsgStyle');
        inputDiv[0].style.height=120;
        inputDiv[0].append(idErrorMsg);
        }
    else{
        id.classList.remove('focusIn');
        id.classList.remove('focusErr');
        id.classList.add('focusOut');
    }
    reset_id(idErrorMsg); 
    checking();      
});


// pw입력창 입력값 유효성 테스트//
pw.addEventListener('input',function(){    
    const tmp=pw.value;
    if(tmp === '' ){
        pw.classList.remove('focusIn');
        pw.classList.add('focusErr');    
        pwErrorMsg.textContent= "비밀번호를 입력해주세요"
        pwErrorMsg.classList.add('errerMsgStyle');
        inputDiv[1].style.height=120;
        inputDiv[1].append(pwErrorMsg);         
     }
    else if(tmp.length < 8 ){
        pw.classList.remove('focusIn');
        pw.classList.add('focusErr');    
        pwErrorMsg.textContent= "비밀번호를8자 이상 입력해주세요"
        pwErrorMsg.classList.add('errerMsgStyle');
        inputDiv[1].style.height=120;
        inputDiv[1].append(pwErrorMsg);         
        }
    else{
        pw.classList.remove('focusIn');
        pw.classList.remove('focusErr');
        pw.classList.add('focusOut');
    }
    reset_pw(pwErrorMsg);    
    checking(); 
});

// pw입력창 입력값 유효성 테스트//
pw.addEventListener('focusout',function(){    
    const tmp=pw.value;
    if(tmp === '' ){
        pw.classList.remove('focusIn');
        pw.classList.add('focusErr');    
        pwErrorMsg.textContent= "비밀번호를 입력해주세요"
        pwErrorMsg.classList.add('errerMsgStyle');
        inputDiv[1].style.height=120;
        inputDiv[1].append(pwErrorMsg); 
        
     }
    else if(tmp.length < 8 ){
        pw.classList.remove('focusIn');
        pw.classList.add('focusErr');    
        pwErrorMsg.textContent= "비밀번호를8자 이상 입력해주세요"
        pwErrorMsg.classList.add('errerMsgStyle');
        inputDiv[1].style.height=120;
        inputDiv[1].append(pwErrorMsg);         
        }
    else{
        pw.classList.remove('focusIn');
        pw.classList.remove('focusErr');
        pw.classList.add('focusOut');
    }
    reset_pw(pwErrorMsg);    
    checking(); 
});

const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
]

const modalMsg=document.querySelector('#modalTextDiv');
const modal=document.querySelector('#modal');
const modalBtn=document.querySelector('#modalBtn');


modalBtn.addEventListener("click", ()=>{
    modal.style.display="none";});

bt.addEventListener('click',function(){
    const userId=id.value;
    const userPw=pw.value;
    for(let i=0;i<USER_DATA.length;i++){
        if(userId===USER_DATA[i].email)
            if(userPw!==USER_DATA[i].password){                
                modalMsg.textContent="비밀번호가 일치하지 않습니다."
                modal.style.display="flex";
                
                return;
                }
            else{
                window.location.href='../html/item.html'            
        }
    }    
    modalMsg.textContent="존재하지 않는 아이디입니다."
    modal.style.display="flex";    
    return;    
});