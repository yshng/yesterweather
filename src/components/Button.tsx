import { ButtonHTMLAttributes } from "react";

export function Button({ disabled, className, id, content, type, onClick }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button disabled={disabled} className={className} type={type} onClick={onClick} id={id}>
      {content}
    </button>
  );
}
