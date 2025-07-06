import React from 'react';
import Button, { IButtonProps } from "@/core/views/components/controls/buttons/button.component";

export type ButtonBaseType = 'primary' | 'secondary' | 'success' | 'warning' | 'error'
export type ButtonBaseSize = 'sm' | 'md' | 'lg'

export interface IButtonBaseProps extends IButtonProps {
  type?: ButtonBaseType
  size?: ButtonBaseSize
}


const typeClasses: Record<ButtonBaseType, string> = {
  primary: 'bg-cyan-600 hover:bg-cyan-500',
  secondary: 'bg-gray-400 hover:bg-gray-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
}

const sizeClasses: Record<ButtonBaseSize, string> = {
  sm: 'px-2 py-1 gap-1 text-sm text-white rounded-sm',
  md: 'px-3 py-2 gap-2 text-base text-white rounded-md',
  lg: 'px-4 py-3 gap-3 text-lg text-white rounded-lg',
}

export default function ButtonBase({children, onClick, className, type = 'primary', size = 'md'}: IButtonBaseProps) {
  const classes = `ButtonBase ${sizeClasses[size]} ${typeClasses[type]} ${ className ?? '' }`;
  return (
    <Button className={ classes } onClick={ onClick }>
      { children }
    </Button>
  );
}
