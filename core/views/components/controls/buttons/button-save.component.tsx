import React from 'react';
import { FloppyDiskIcon } from "@phosphor-icons/react";
import { IButtonProps } from "@/core/views/components/controls/buttons/button.component";
import ButtonIcon from "@/core/views/components/controls/buttons/button-icon.component";

export interface IButtonSaveProps extends Omit<IButtonProps, 'children'> {
}

export default function ButtonSave({onClick, className, disable}: IButtonSaveProps) {
  return (
    <ButtonIcon className={ `text-cyan-500` } icon={ FloppyDiskIcon } onClick={ onClick }/>
  );
}