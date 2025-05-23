"use client";
import { useCallback, useEffect, useState } from "react";

/**
 * A generic hook for creating and managing form state
 * @param {Object} config - Configuration object
 * @param {Object} config.initialFields - Initial field values
 * @param {Object} config.validators - Validation functions for each field
 * @param {Function} config.onValidationChange - Optional callback when validation state changes
 * @returns {Object} Form state and handlers
 */
export default function useForm({
  initialFields = {},
  validators = {},
  onValidationChange,
}) {
  const [fields, setFields] = useState(initialFields);

  const [validation, setValidation] = useState(() => {
    const initialValidation = {};
    Object.keys(initialFields).forEach((fieldName) => {
      initialValidation[fieldName] = {
        isValid: false,
        isTouched: false,
        message: "",
      };
    });
    return initialValidation;
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const allFieldsValid = Object.values(validation).every(
      (field) => field.isValid
    );
    setIsFormValid(allFieldsValid);

    if (onValidationChange) {
      onValidationChange(validation, allFieldsValid);
    }
  }, [validation, onValidationChange]);

  const handleFieldChange = useCallback(
    (fieldName, value, dependentFields = []) => {
      setFields((prevFields) => ({
        ...prevFields,
        [fieldName]: value,
      }));

      setValidation((prevValidation) => {
        const newValidation = { ...prevValidation };
        if (validators[fieldName]) {
          const result = validators[fieldName](value, fields);
          newValidation[fieldName] = {
            isValid: result.isValid,
            isTouched: true,
            message: result.message || "",
          };
        }

        dependentFields.forEach((depField) => {
          if (validators[depField]) {
            const depValue = fields[depField];
            const updatedFields = { ...fields, [fieldName]: value };
            const result = validators[depField](depValue, updatedFields);
            newValidation[depField] = {
              ...newValidation[depField],
              isValid: result.isValid,
              message: result.message || "",
            };
          }
        });

        return newValidation;
      });
    },
    [fields, validators]
  );

  // Reset form
  const resetForm = useCallback(() => {
    setFields(initialFields);
    setValidation((prev) => {
      const reset = {};
      Object.keys(prev).forEach((field) => {
        reset[field] = { isValid: false, isTouched: false, message: "" };
      });
      return reset;
    });
  }, [initialFields]);

  const getFormState = useCallback(() => {
    return {
      values: fields,
      validation,
      isValid: isFormValid,
    };
  }, [fields, validation, isFormValid]);

  return {
    fields,
    validation,
    isFormValid,
    handleFieldChange,
    resetForm,
    getFormState,
  };
}
