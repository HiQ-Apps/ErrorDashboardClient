import { type ReactNode } from "react";
import { Button } from "components/ui/button";

interface ButtonProps {
  content?: ReactNode;
  image?: string;
  onClick: () => void;
  size?: "default" | "sm" | "lg" | "icon";
  variant:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "success"
    | "warning"
    | "error"
    | "navbutton"
    | "sidenavbutton";
  disabled?: boolean;
  override_styles?: string;
}

const BaseButton = ({
  content,
  image,
  onClick,
  variant,
  disabled,
  override_styles,
  size,
}: ButtonProps) => {
  return (
    <Button
      size={size}
      onClick={onClick}
      variant={variant}
      className={override_styles}
      disabled={disabled}
    >
      {content ? <>{content}</> : <></>}
      {image ? <img src={image} width="25px" height="25px" /> : <></>}
    </Button>
  );
};

export default BaseButton;
