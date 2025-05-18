"use client";

import Image from "next/image";

export default function ItemFormInput({
  form,
  previews,
  errors,
  uploading,
  onChange,
  onAddTag,
  onRemoveTag,
  onImageUpload,
  onImageDelete,
  onSubmit,
  submitButtonText,
  title,
}) {
  const inputBaseClasses = "w-full bg-gray-100 px-6 py-4 rounded-xl text-base";

  return (
    <form onSubmit={onSubmit} className="space-y-10 text-gray-800">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">
          {title || submitButtonText === "등록"
            ? "상품 등록하기"
            : "상품 수정하기"}
        </h1>
        <button
          type="submit"
          disabled={
            !form.name ||
            !form.description ||
            !form.price ||
            form.tags.length === 0 ||
            form.images.length === 0
          }
          className="px-6 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
        >
          {submitButtonText}
        </button>
      </div>

      <div>
        <label className="block text-lg font-bold mb-4">상품 이미지</label>
        <div className="flex gap-4 flex-wrap">
          <label className="w-[282px] h-[282px] flex flex-col gap-3 items-center justify-center rounded-lg cursor-pointer bg-[#F3F4F6]">
            <Image
              src="/images/icons/ic_plus.svg"
              width={48}
              height={48}
              alt="플러스 아이콘"
            />
            <span className="text-gray-400 text-base">이미지 등록</span>
            <input
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              className="hidden"
            />
          </label>

          {previews.map((preview, idx) => (
            <div key={idx} className="relative w-[282px] h-[282px]">
              <img
                src={preview}
                alt="미리보기"
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => onImageDelete(idx)}
                className="absolute top-3 right-3"
              >
                <Image
                  src="/images/icons/ic_circle_x.svg"
                  width={22}
                  height={22}
                  alt="삭제"
                />
              </button>
            </div>
          ))}
        </div>
        {uploading && (
          <p className="text-sm text-gray-500 mt-2">업로드 중...</p>
        )}
      </div>

      <FormField
        label="상품명"
        placeholder="상품명을 입력해주세요"
        value={form.name}
        error={errors.name}
        onChange={(e) => onChange("name", e.target.value)}
        inputClass={inputBaseClasses}
      />

      <FormField
        label="상품 소개"
        placeholder="상품 소개를 입력해주세요"
        value={form.description}
        error={errors.description}
        onChange={(e) => onChange("description", e.target.value)}
        inputClass={`${inputBaseClasses} min-h-[120px]`}
        isTextarea
      />

      <FormField
        label="판매 가격"
        placeholder="판매 가격을 입력해주세요"
        value={form.price}
        error={errors.price}
        onChange={(e) => onChange("price", e.target.value)}
        inputClass={inputBaseClasses}
      />

      <div>
        <label className="block text-lg font-bold mb-4">태그</label>
        <input
          type="text"
          className={`${inputBaseClasses} placeholder:text-gray-400`}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();

              const input = e.currentTarget;
              const value = input.value.trim();
              if (value) {
                onAddTag(value);
                setTimeout(() => {
                  input.value = "";
                }, 0);
              }
            }
          }}
          placeholder="태그를 입력해주세요"
        />
        <div className="flex flex-wrap gap-3 mt-4">
          {form.tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-2 bg-gray-100 rounded-[26px] px-4 py-[5px]"
            >
              <span className="text-gray-800">#{tag}</span>
              <button type="button" onClick={() => onRemoveTag(tag)}>
                <Image
                  src="/images/icons/ic_circle_x.svg"
                  width={22}
                  height={22}
                  alt="삭제"
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}

function FormField({
  label,
  placeholder,
  value,
  onChange,
  error,
  inputClass,
  isTextarea = false,
}) {
  return (
    <div>
      <label className="block text-lg font-bold mb-4">{label}</label>
      {isTextarea ? (
        <textarea
          className={inputClass}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <input
          className={inputClass}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
