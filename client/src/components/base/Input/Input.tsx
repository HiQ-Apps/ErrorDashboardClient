import { Input } from "components/ui/input";
import { ChangeEvent } from "react";

interface CustomInputProps {
  id?: string;
  disabled?: boolean;
  readonly?: boolean;
  value: string | number;
  overrideStyles?: string;
  placeholder?: string;
  type: string;
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput = ({
  id,
  disabled = false,
  readonly = false,
  value,
  overrideStyles = "",
  placeholder = "",
  type,
  name,
  onChange,
}: CustomInputProps) => {
  return (
    <Input
      id={id}
      min="0"
      readOnly={readonly}
      disabled={disabled}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border mt-1 px-2 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${overrideStyles}`}
    />
  );
};

export { CustomInput as Input };
