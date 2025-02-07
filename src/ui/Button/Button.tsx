import { FC, HTMLAttributes } from 'react';
import './Button.scss'

interface IButtonprops extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  className: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  type?: "submit" | "reset" | "button";
}

export const Button: FC<IButtonprops> = ({ value, className, type, isLoading, isDisabled }) => {
  return (
    <button
      disabled={isDisabled || isLoading}
      className={`${className} ${isLoading ? 'button--loading' : ''}`}
      type={type}
    >
      {isLoading ? <span className="loader"></span> : value}
    </button>
  )
}


