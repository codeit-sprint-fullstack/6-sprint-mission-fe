import React, { useState } from "react";
import styled from "styled-components";
import { postItem } from "../db/api";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [tag, setTag] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, description, price, tag };
    try {
      const result = await postItem(data);

      navigate("/items");
      console.log("success item post", result);
    } catch (e) {
      console.log("failed submit item");
    }
  };

  return (
    <RegistrationBox>
      <RegistrationBtnBox>
        <RegistrationTitle>상품 등록하기</RegistrationTitle>
        <RegistrationBtn onClick={handleSubmit}>등록</RegistrationBtn>
      </RegistrationBtnBox>
      <ItemRegistartionBox>
        <Label>
          <Title>상품명</Title>
          <Input
            type="text"
            placeholder="상품명을 입력해주세요"
            onChange={(e) => setName(e.target.value)}
          />
        </Label>
        <Label>
          <Title>상품 소개</Title>
          <Textarea
            placeholder="상품 소개를 입력해주세요"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Label>
        <Label>
          <Title>판매가격</Title>
          <Input
            type="text"
            placeholder="판매 가격을 입력해주세요"
            onChange={(e) => setPrice(e.target.value)}
          />
        </Label>
        <Label>
          <Title>태그</Title>
          <Input
            type="text"
            placeholder="태그를 입력해주세요"
            onChange={(e) => setTag(e.target.value)}
          />
        </Label>
      </ItemRegistartionBox>
    </RegistrationBox>
  );
};

const RegistrationBox = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 26px auto 0;
`;

const RegistrationBtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RegistrationTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
`;

const RegistrationBtn = styled.button`
  width: 74px;
  height: 42px;
  border: none;
  border-radius: 8px;
  color: #fff;
  background: #9ca3af;
  cursor: pointer;
`;

const ItemRegistartionBox = styled.div`
  margin: 24px 0 162px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 700;
`;

const Input = styled.input`
  width: 100%;
  height: 56px;
  border: none;
  outline: none;
  border-radius: 12px;
  background: #f3f4f6;
  padding-left: 24px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 282px;
  border: none;
  outline: none;
  border-radius: 12px;
  background: #f3f4f6;
  resize: none;
  padding: 16px 0 0 24px;
`;

export default Registration;
