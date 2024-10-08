import { useState, ChangeEvent } from "react";
import { ZodSchema } from "zod";

export type FormState<T> = Record<string, T>;

interface UseFormProps<T> {
  form: T;
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  resetForm: () => void;
  setForm: (state: T | ((prevForm: T) => T)) => void;
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

    if (event.target instanceof HTMLInputElement) {
      const { type } = event.target;

      let updatedValue: any = value;

      if (type === "number") {
        updatedValue = value === "" ? undefined : Number(value);
      }
      setForm((formData) => ({
        ...formData,
        [name]: updatedValue || value,
      }));
    }
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
    resetForm,
    setForm,
    validate,
    errors,
  };
};

export default useForm;
