import { IToastsItem, ToastsItemType } from "@/core/models/toasts/toasts-item.model";
import { SealWarningIcon } from "@phosphor-icons/react";

export interface IToastsItemProps {
  toast: IToastsItem
  onClick?: () => void;
}

const typeClasses: Record<ToastsItemType, string> = {
  'success': 'text-green-500',
  'warning': 'text-yellow-400',
  'error': 'text-rose-400',
}

export default function ToastsItem({toast, onClick}: IToastsItemProps) {
  return (
    <div className={ `ToastsItem ${ typeClasses[toast.type] } flex flex-col py-2 px-4 gap-2 bg-white border rounded` }
         onClick={ onClick }>
      <div className={ `ToastsItem__Head flex items-center gap-2` }>
        <SealWarningIcon size={ 20 }/>
        <div className={ `ToastsItem__Title` }>
          { toast.title }
        </div>
      </div>
      { toast.message ?
        <div className={ `ToastsItem__Body` }>
          <div className={ `ToastsItem__Message text-sm` }>
            { toast.message }
          </div>
        </div>
        : undefined
      }
    </div>
  )
}
