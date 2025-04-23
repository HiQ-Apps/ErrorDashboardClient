import { Input } from "components/ui/input";
import { ChangeEvent } from "react";

interface CustomInputProps {
  id?: string;
  disabled?: boolean;
  readonly?: boolean;
  value: string | number;
  overrideStyles?: string;
  placeholder?: string;
  step?: string;
  type: string;
  name: string;
  max?: number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput = ({
  id,
  disabled = false,
  readonly = false,
  value,
  overrideStyles = "",
  placeholder = "",
  step = "1",
  type,
  name,
  max,
  onChange,
}: CustomInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (type === "number" && max !== undefined) {
      const numberValue = parseInt(inputValue, 10);
      if (numberValue > max) {
        e.target.value = max.toString();
      }
    }

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <Input
      id={id}
      min="0"
      readOnly={readonly}
      disabled={disabled}
      type={type}
      name={name}
      placeholder={placeholder}
      step={step}
      value={value}
      onChange={handleChange}
      max={max}
      className={`border mt-1 px-2 block w-full rounded-md shadow-sm ${overrideStyles}`}
    />
  );
};

export { CustomInput as Input };
