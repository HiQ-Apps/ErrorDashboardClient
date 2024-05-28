import { useState, ChangeEvent } from "react";
import { z, ZodSchema } from "zod";

export type FormState<T> = Record<string, T>;

interface UseFormProps<T> {
  form: T;
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  passObjectToForm: (obj: Partial<T>) => void;
  transformToFormData: (form: T) => FormData;
  resetForm: () => void;
  setForm: (state: T) => void;
  validate: () => boolean;
  errors: {
    hasError: boolean;
    errorMessages: Record<string, string>;
  };
}

const useForm = <T extends Record<string, any>>(
  defaultValues: T,
  schema: ZodSchema<T>
): UseFormProps<T> => {
  const [form, setForm] = useState<T>(defaultValues);
  const [errors, setErrors] = useState<{
    hasError: boolean;
    errorMessages: Record<string, string>;
  }>({
    hasError: false,
    errorMessages: {},
  });

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setForm((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const passObjectToForm = (obj: Partial<T>) => {
    setForm((formData) => ({
      ...formData,
      ...obj,
    }));
  };

  const transformToFormData = (form: T) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(form)) {
      formData.append(key, value as string | Blob);
    }
    return formData;
  };

  const resetForm = () => {
    setForm(defaultValues);
  };

  const validate = () => {
    const result = schema.safeParse(form);
    if (!result.success) {
      const errorMessages: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          errorMessages[error.path[0] as string] = error.message;
        }
      });
      setErrors({ hasError: true, errorMessages });
      return false;
    }
    setErrors({ hasError: false, errorMessages: {} });
    return true;
  };

  return {
    form,
    handleChange,
    passObjectToForm,
    resetForm,
    transformToFormData,
    setForm,
    validate,
    errors,
  };
};

export default useForm;
