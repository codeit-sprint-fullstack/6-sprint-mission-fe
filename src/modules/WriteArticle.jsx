import axios from 'axios';
import React, { useState } from 'react';
import { postArticle } from '../api/articles.api';


// 타이틀과 콘텐츠를 입력한 후 전송 버튼을 클릭하면 글 등록 요청을 보내는 함수
export function WriteArticle() {

    const [ title, setTitle ] = useState("");
    const [ content, setContent ] = useState("");
    const [ loading, setLoading ] = useState(false); // 로딩이 진행되지 않는 상태로 초기화
    const [ success, setSuccess ] = useState(null); // 상태가 아무 값도 없는 상태를 명확하게 나타냄
    const [ error, setError ] = useState(null);

    const handleSubmit = async (e) => {
         // 제출하기 전, 이전 상태가 화면에 남아있을 수 있음, 새로 제출 했을 때 이전 결과는 모두 사라지고, 새로운 처리 결과만 표시하게 함
        e.preventDefault(); // 전송버튼 클릭한 후 브라우저의 새로고침을 막기 위해 onSubmit에서 이벤트 객체의 기본동작을 막아줌
        setLoading(true); // 버튼을 클릭했음, 화면에 로딩 중이라는 것을 표현, 데이터 처리 진행중임을 알림
        setError(null); // 제출 전에 에러가 있었다면 그것을 초기화 함
        setSuccess(null); // 이전에 발생했을 수도 있는 성공 메시지를 초기화 함

        try {
            const response = await postArticle({ title, content }); // postArticle은 promise를 반환함, await를 사용해야 Response.data를 제대로 받을 수 있음
            console.log("응답 객체 :" , response);
            setSuccess(`"${response.title}" 글이 등록되었습니다! 새로고침 버튼을 클릭하세요!`); // 서버로 보낸 data의 title을 출력
            setTitle(''); // 입력 성공하면 그 다음 내용을 입력할 수 있게 초기화 함
            console.log("Reset 완료")
            setContent(''); // 초기화
        } catch (e) { // 비동기 작업이 실패하면 catch로 넘어옴, e는 에러 객체
            setError(e.response?.data?.message || e.message); // 서버가 보낸 에러메시지가 없다면 기본 에러메시지를 출력
        }finally { // 무조건 실행되는 영역
            setLoading(false); // 무한로딩 되지 않도록 초기화
        }
    }

    return (
        <div>
            <form onSubmit= {handleSubmit} > 
                {/* form : 폼을 사용하면 입력창에서 Enter키만 눌러도 자동으로 폼을 제출할 수 있음, 입력 필드 여러개 묶어서 한번에 처리 가능, 입력 비어있을 때 제출 방지 등 기본 기능 쉽게 구현 가능 
                
                onSubmit : 1. form / submit이 실행될 때 실행되는 이벤트 핸들러, 폼 내부의 버튼이 클릭되어 제출되면 onSubmit 이벤트에 연결된 함수가 실행된다. 2. 폼을 제출할 때 기본 브라우저 동작(새로고침)을 방지하면서 내가 원하는 함수를 실행함  */}
                <h3>게시글 쓰기</h3>
                <h4>제목</h4>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                {/* 
                    onChange : 인풋요소의 이벤트 핸들러, 사용자가 무언가 입력할 때 마다 실행된다
                    e : 이벤트 객체, 사용자가 뭔가 행동하면 e 라는 객체 안에 담겨져 넘어온다
                    e.target : 이벤트가 발생한 html 그 자체, 여기서는 input 태그
                    e.target.value : input 태그의 값 자체
                    setTitle(e.target.value) : setTitle을 input 태그의 값 자체로 반영
                 */ }
                <h4>내용</h4>
                <textarea  value={content} onChange={(e) => setContent(e.target.value)}/>
                <div>
                    <button type = "submit" disabled={loading}>{loading ? '전송 중...' : '전송하기'} {/* loading이 ture이면 disabled 활성화 */} </button>
                    {success && <p>{success}</p>}
                    {error && <p>{success}</p>}
                </div>
            </form>
        </div>
    )
}

export default WriteArticle;