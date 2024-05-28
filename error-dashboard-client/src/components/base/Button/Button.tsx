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
  override_styles?: string;
};

const BaseButton = ({
  content,
  onClick,
  variant,
  override_styles,
}: ButtonProps) => {
  const isIcon = typeof content === 'function';
  
  return (
    <Button onClick={onClick} variant={variant} className={override_styles}>
      {isIcon ? React.createElement(content as IconType) : content}
    </Button>
  );
};

export default BaseButton;
