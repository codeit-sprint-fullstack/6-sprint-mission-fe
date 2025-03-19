const useCheckValidity = (name, description, price, tags) => {
  const isNameValid = name === "" ? true : name.length <= 10 && name.length > 0;
  const isDescriptionValid =
    description === "" ? true : description.length >= 10;
  const isPriceValid =
    price === "" ? true : !isNaN(Number(price)) && Number(price) > 0;
  const isTagsValid = tags === "" ? true : tags.length <= 5;

  const isInputValid =
    isNameValid && isDescriptionValid && isPriceValid && isTagsValid;

  return {
    isInputValid,
    isNameValid,
    isDescriptionValid,
    isPriceValid,
    isTagsValid,
  };
};

export default useCheckValidity;
