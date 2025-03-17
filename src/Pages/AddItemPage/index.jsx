import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createProduct } from "../../apis/Products";
import TagInput from "../../components/Products/AddItemPage/TagInput";
import InputItem from "../../components/Products/commonUI/InputItem";
import {
  Button,
  Container,
  FlexContainer,
  SectionTitle,
} from "../../styles/CommonStyles.js";

const TitleSection = styled(FlexContainer)`
  margin-bottom: 16px;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    gap: 24px;
  }
`;

export const AddItemPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [images] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const addTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const deleteTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
  };

  const validateName = (value) => {
    if (value.length < 2 || value.length > 10) {
      setErrors((prev) => ({
        ...prev,
        name: "상품명을 2자 이상 10자 이내로 입력해주세요",
      }));
    } else {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const validateDescription = (value) => {
    if (value.length < 10) {
      setErrors((prev) => ({
        ...prev,
        description: "상품 소개를 10자 이상 입력해주세요.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, description: undefined }));
    }
  };

  const validatePrice = (value) => {
    if (!/^\d+$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        price: "판매 가격을 숫자로 입력해주세요.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, price: undefined }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).some((key) => errors[key])) {
      return;
    }

    const productData = {
      name,
      description,
      price: Number(price),
      tags,
      images,
    };

    try {
      const result = await createProduct(productData);
      console.log("상품 등록 성공:", result);
      navigate(`/items/${result.id}`);
    } catch (error) {
      console.error("상품 등록 실패:", error);
    }
  };

  return (
    <Container>
      <form onSubmit={submitHandler}>
        <TitleSection>
          <SectionTitle>상품 등록하기</SectionTitle>
          <Button
            type="submit"
            disabled={!name || !description || !price || !tags.length}
          >
            등록
          </Button>
        </TitleSection>

        <InputSection>
          <InputItem
            id="name"
            label="상품명"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              validateName(e.target.value);
            }}
            placeholder="상품명을 입력해 주세요"
            error={errors.name}
          />

          <InputItem
            id="description"
            label="상품 소개"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              validateDescription(e.target.value);
            }}
            placeholder="상품 소개를 입력해 주세요"
            isTextArea
            error={errors.description}
          />

          <InputItem
            id="price"
            label="판매 가격"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              validatePrice(e.target.value);
            }}
            placeholder="판매 가격을 입력해 주세요"
            error={errors.price}
          />

          <TagInput tags={tags} onAddTag={addTag} onRemoveTag={deleteTag} />
        </InputSection>
      </form>
    </Container>
  );
};
