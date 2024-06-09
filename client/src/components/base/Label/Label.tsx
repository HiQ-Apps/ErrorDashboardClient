import { Label } from "components/ui/label";

interface CustomLabelProps {
  text: string;
  htmlFor: string;
}

const CustomLabel = ({ text, htmlFor }: CustomLabelProps) => {
  return <Label htmlFor={htmlFor}>{text}</Label>;
};

export { CustomLabel as Label };
