import React from 'react';
import { PlusIcon } from "@phosphor-icons/react";
import ButtonIcon, { IButtonIconDefinedProps } from "@/core/views/components/controls/buttons/button-icon.component";

export default function ButtonAdd({onClick}: IButtonIconDefinedProps) {
  return (
    <ButtonIcon className={ `!fixed right-6 bottom-6 text-white bg-cyan-700 w-20 h-20 rounded-full border` } icon={ PlusIcon } onClick={onClick} size={40}/>
  );
}