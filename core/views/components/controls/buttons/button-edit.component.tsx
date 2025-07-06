import React from 'react';
import { PencilLineIcon } from "@phosphor-icons/react";
import ButtonIcon, { IButtonIconDefinedProps } from "@/core/views/components/controls/buttons/button-icon.component";

export default function ButtonEdit({onClick}: IButtonIconDefinedProps) {
  return (
    <ButtonIcon className={ `text-cyan-500` } icon={ PencilLineIcon } onClick={onClick}/>
  );
}