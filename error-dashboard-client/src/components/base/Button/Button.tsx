import React, { ReactNode } from 'react';
import { Button } from "components/ui/button";
import type { IconType } from "react-icons";

interface ButtonProps {
  content: ReactNode
  onClick: () => void;
  variant:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "success"
    | "warning"
    | "error";
  disabled?: boolean;
  override_styles?: string;
};

const BaseButton = ({
  content,
  onClick,
  variant,
  disabled,
  override_styles,
}: ButtonProps) => {
  const isIcon = typeof content === 'function';
  
  return (
    <Button onClick={onClick} variant={variant} className={override_styles} disabled={disabled}>
      {isIcon ? React.createElement(content as IconType) : content}
    </Button>
  );
};

export default BaseButton;
