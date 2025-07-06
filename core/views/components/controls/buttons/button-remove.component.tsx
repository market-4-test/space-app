import React from 'react';
import { TrashIcon } from "@phosphor-icons/react";
import { IButtonProps } from "@/core/views/components/controls/buttons/button.component";
import ButtonIcon from "@/core/views/components/controls/buttons/button-icon.component";

export interface IButtonRemoveProps extends Omit<IButtonProps, 'children'> {
}

export default function ButtonRemove({onClick}: IButtonRemoveProps) {
  return (
    <ButtonIcon className={ `text-rose-500` } icon={ TrashIcon } onClick={ onClick }/>
  );
}