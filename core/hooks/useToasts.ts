import { ToastsListModel } from "@/core/models/toasts/toasts-list.model";

const toasts = new ToastsListModel()

const useToasts = () => {
  return toasts
}

export default useToasts