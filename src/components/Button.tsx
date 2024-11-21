import { MouseEventHandler } from "react";

interface ButtonProps {
  label: string;
  onClick: MouseEventHandler;
  type: string;
  id: string;
}

export function Button({ id, label, onClick }: ButtonProps) {
  return (
    <button type="button" onClick={onClick} id={id}>
      {label}
    </button>
  );
}
