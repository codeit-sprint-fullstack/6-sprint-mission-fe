import { useEffect, useState } from "react";
import { getArticles } from "../api/articles.api";
import styled from "styled-components";

export function ArticleList() {
    const [articles , setArticles ] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const fetchArticles = async() =>{
        setLoading(true);
        try {
            const data = await getArticles();
            setArticles(data);
        } catch (e) {
            console.error(e);
            alert("서버 에러")
        } finally {
            setLoading(false);
        }
    }
        
    useEffect(()=>{
        fetchArticles();
    },[]) // 처음 한 번만 실행되는 코드, 의존성 배열에 아무것도 없으므로 '처음 마운트 될 때만 실행'


    return(
        <div>
            <h2>게시글 목록</h2>
            <button onClick={fetchArticles}>{loading ? "게시물 로드 중.." : "새로고침"}</button>
            <div>
                <UlContainer>
                    {articles.map((article) => (
                        <li key={article.id}>
                            <h3>{article.id}번</h3>
                            <h2>{article.title}</h2>
                            <p>{article.content}</p>
                            <span>작성시간 : {article.createdAt}</span>
                        </li>
                    ))}
                </UlContainer>
            </div>
        </div>
    );
}

const UlContainer = styled.ul`
    font-size: 12px;
    padding: 0;
    margin: 0;
    li {
        list-style:none;
        h2 {
            font-size: 14px;
        }
        h3 {
            border-top:1px solid #ccc;
            padding-top: 10px;
            font-weight: 500;
        }
        p {
            background-color: #efefef;
            padding: 10px 10px;
        }
    }
`;

export default ArticleList;
