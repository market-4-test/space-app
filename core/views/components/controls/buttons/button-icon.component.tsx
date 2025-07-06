import React from 'react';
import { Icon } from "@phosphor-icons/react";
import Button, { IButtonProps } from "@/core/views/components/controls/buttons/button.component";

export interface IButtonIconProps extends Omit<IButtonProps, 'children'> {
  icon: Icon
  size?: number
}


export type IButtonIconDefinedProps = Omit<IButtonIconProps, 'icon'>

export default function ButtonIcon(
  {
    onClick,
    className,
    loading,
    disable,
    icon: IconComponent,
    size = 20
  }: IButtonIconProps) {
  return (
    <Button
      className={ `ButtonSave ${ className ?? '' }` }
      onClick={ !disable ? onClick : undefined }
      loading={ loading }
      disable={ disable }
    >
      <IconComponent size={ size }/>
    </Button>
  )
}