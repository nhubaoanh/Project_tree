/**
 * Custom hook để validate form
 * Gom nhóm logic validate, xử lý change, blur
 */

import { useState, useCallback } from "react";
import { validateForm as validateFormUtil, validateField, FormRules } from "./validator";

export interface UseFormValidationOptions<T> {
  initialValues: T;
  rules: FormRules;
}

export function useFormValidation<T extends Record<string, any>>({
  initialValues,
  rules,
}: UseFormValidationOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string | null>>(
    () => Object.keys(initialValues).reduce((acc, key) => ({ ...acc, [key]: null }), {} as Record<keyof T, string | null>)
  );
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(
    () => Object.keys(initialValues).reduce((acc, key) => ({ ...acc, [key]: false }), {} as Record<keyof T, boolean>)
  );

  // Xử lý thay đổi giá trị
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    
    setValues(prev => ({ ...prev, [name]: newValue }));

    // Nếu field đã touched và có lỗi, validate lại ngay
    if (touched[name as keyof T] && errors[name as keyof T]) {
      const fieldError = validateField(name, newValue, rules, { ...values, [name]: newValue });
      setErrors(prev => ({ ...prev, [name]: fieldError }));
    }
  }, [touched, errors, rules, values]);

  // Xử lý blur - validate field
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const fieldError = validateField(name, value, rules, values);
    setErrors(prev => ({ ...prev, [name]: fieldError }));
  }, [rules, values]);

  // Validate toàn bộ form
  const validateAll = useCallback((): boolean => {
    const { isValid, errors: formErrors } = validateFormUtil(values, rules);
    
    // Set tất cả fields là touched
    setTouched(
      Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {} as Record<keyof T, boolean>)
    );
    
    // Set errors
    setErrors(formErrors as Record<keyof T, string | null>);
    
    return isValid;
  }, [values, rules]);

  // Set giá trị cho 1 field
  const setValue = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);

  // Set error cho 1 field
  const setError = useCallback((name: keyof T, error: string | null) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  // Reset form
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors(Object.keys(initialValues).reduce((acc, key) => ({ ...acc, [key]: null }), {} as Record<keyof T, string | null>));
    setTouched(Object.keys(initialValues).reduce((acc, key) => ({ ...acc, [key]: false }), {} as Record<keyof T, boolean>));
  }, [initialValues]);

  // Kiểm tra form có valid không (không có lỗi)
  const isValid = Object.values(errors).every(e => e === null);

  // Lấy props cho input
  const getFieldProps = (name: keyof T) => ({
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
  });

  // Lấy error message
  const getError = (name: keyof T) => touched[name] ? errors[name] : null;

  // Kiểm tra field có lỗi không
  const hasError = (name: keyof T) => touched[name] && errors[name] !== null;

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    setValue,
    setError,
    reset,
    isValid,
    getFieldProps,
    getError,
    hasError,
  };
}
