import { ButtonHTMLAttributes } from "react";

export function Button({ id, content, type, onClick }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} onClick={onClick} id={id}>
      {content}
    </button>
  );
}
