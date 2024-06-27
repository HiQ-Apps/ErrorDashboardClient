import { Label } from "components/ui/label";

interface CustomLabelProps {
  text: string;
  htmlFor: string;
  className?: string;
}

const CustomLabel = ({ text, htmlFor, className }: CustomLabelProps) => {
  return (
    <Label className={className} htmlFor={htmlFor}>
      {text}
    </Label>
  );
};

export { CustomLabel as Label };
