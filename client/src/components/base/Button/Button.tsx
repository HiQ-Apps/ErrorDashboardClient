import type { ReactNode } from "react";
import { Button } from "components/ui/button";
import { type ButtonClickEvent } from "shared/types/extra";

interface ButtonProps {
  content?: ReactNode;
  image?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (event: ButtonClickEvent) => void | Promise<void>;
  size?: "default" | "sm" | "lg" | "icon";
  variant:
    | "accent"
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
  overrideStyles?: string;
  isActive?: boolean;
}

const BaseButton = ({
  type = "button",
  content,
  image,
  onClick = () => {},
  variant,
  disabled,
  overrideStyles,
  size,
  isActive = false,
}: ButtonProps) => {
  return (
    <Button
      type={type}
      size={size}
      onClick={(e) => onClick?.(e as ButtonClickEvent)}
      variant={variant}
      className={`${overrideStyles} ${
        isActive ? "text-gray-900 font-bold px-1.5" : ""
      }`}
      disabled={disabled}
    >
      {content ? <>{content}</> : <></>}
      {image ? <img src={image} width="25px" height="25px" /> : <></>}
    </Button>
  );
};

export default BaseButton;
