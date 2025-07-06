import { IToastsItem, IToastsItemParams, ToastsItemModel } from "@/core/models/toasts/toasts-item.model";
import { action } from "mobx";
import { CollectionContainer } from "@/core/containers/collection.container";

export class ToastsListModel extends CollectionContainer<string, IToastsItem> {
  private readonly TOAST_LIFETIME = 3000;
  private cleanupInterval: NodeJS.Timeout | null = null;
  
  constructor() {
    super()
    this.startCleanupInterval();
  }
  
  private removeExpiredToasts() {
    const now = new Date();
    this.list.forEach((toast) => {
      if (now.getTime() - toast.createdAt.getTime() >= this.TOAST_LIFETIME) {
        this.tryRemove(toast.id);
      }
    });
  }
  
  private startCleanupInterval() {
    this.cleanupInterval = setInterval(() => {
      this.removeExpiredToasts();
    }, 1000); // Проверяем каждую секунду
  }
  
  @action
  success(item: Omit<IToastsItemParams, 'type'>) {
    this.tryAdd(new ToastsItemModel({
      ...item,
      type: "success"
    }))
  }

  warning(item: Omit<IToastsItemParams, 'type'>) {
    this.tryAdd(new ToastsItemModel({
      ...item,
      type: "warning"
    }))
  }
  
  error(item: Omit<IToastsItemParams, 'type'>) {
    this.tryAdd(new ToastsItemModel({
      ...item,
      type: "error"
    }))
  }
}