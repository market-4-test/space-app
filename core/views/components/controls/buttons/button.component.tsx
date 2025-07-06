import React, { useState } from 'react';
import { SpinnerIcon } from "@phosphor-icons/react";

export interface IButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disable?: boolean
  loading?: boolean
}

export default function Button({children, onClick, className, loading, disable}: IButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  
  const handleMouseDown = () => {
    setIsPressed(true);
  };
  
  const handleMouseUp = () => {
    setIsPressed(false);
  };
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  
  return (
    <div
      className={ `Button relative flex items-center justify-center text-center cursor-pointer transition ${ isPressed ? 'opacity-75' : '' } ${ className ?? '' }  ${ disable ? 'pointer-events-none grayscale' : '' }`  }
      onMouseDown={ handleMouseDown }
      onMouseUp={ handleMouseUp }
      onMouseLeave={ handleMouseUp }
      onClick={ handleClick }
    >
      { children }
      { loading ?
        <div className={ `absolute w-full h-full bg-inherit p-2` } style={ {
          'borderRadius': 'inherit'
        } }>
          <SpinnerIcon className={ `w-full h-full animate-spin` }/>
        </div>
        : undefined
      }
    </div>
  );
}