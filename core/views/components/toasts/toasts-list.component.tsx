import useToasts from "@/core/hooks/useToasts";
import ToastsItem from "@/core/views/components/toasts/toasts-item.component";
import { observer } from "mobx-react-lite";

export const  ToastsList = observer(() => {
  const toasts = useToasts()
  
  return (
    <div className={ `ToastsList z-50 fixed top-4 right-4 flex flex-col gap-2` }>
      { toasts.list.map((toast) => (
        <ToastsItem toast={ toast } key={ toast.id } onClick={() => toasts.tryRemove(toast.id)}/>
      )) }
    </div>
  )
})
