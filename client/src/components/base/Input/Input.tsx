import { Input } from "components/ui/input";
import { ChangeEvent } from "react";

interface CustomInputProps {
  id?: string;
  disabled?: boolean;
  value: string;
  override_styles?: string;
  placeholder?: string;
  type: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput = ({
  id,
  disabled = false,
  value,
  override_styles = "",
  placeholder = "",
  type,
  name,
  onChange,
}: CustomInputProps) => {
  return (
    <Input
      id={id}
      disabled={disabled}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${override_styles} border mt-1 px-2 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
    />
  );
};

export { CustomInput as Input };
