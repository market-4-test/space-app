import { CollectionContainer, ICollectionElement } from "@/core/containers/collection.container";
import { PaginateMeta } from "#/common";
import { action, computed, observable } from "mobx";

export interface ICollectionPaginateContainer<TKey, TElement extends ICollectionElement<TKey>> extends PaginateMeta {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  perPage: number;
  total: number;
  totalPages: number;
  paginatePages: number[];
  
  updatePagination(meta: PaginateMeta): void;
  nextPage(): void;
  prevPage(): void;
  load(): Promise<void>
  goToPage(page: number): Promise<void>
}

export class CollectionPaginateContainer<TKey, TElement extends ICollectionElement<TKey>> extends CollectionContainer<TKey, TElement> implements ICollectionPaginateContainer<TKey, TElement> {
  @observable protected _currentPage: number = 1;
  @observable protected _hasNextPage: boolean = false;
  @observable protected _hasPreviousPage: boolean = false;
  @observable protected _perPage: number = 100;
  @observable protected _total: number = 10;
  @observable protected _totalPages: number = 1;
  @observable protected _paginatePages: number[] = []
  
  constructor() {
    super()
  }
  
  @computed
  get currentPage() {
    return this._currentPage
  }
  
  @computed
  get hasNextPage() {
    return this._hasNextPage
  }
  
  @computed
  get hasPreviousPage() {
    return this._hasPreviousPage
  }
  
  @computed
  get perPage() {
    return this._perPage
  }
  
  @computed
  get total() {
    return this._total
  }
  
  @computed
  get totalPages() {
    return this._totalPages
  }
  
  @computed
  get paginatePages() {
    return this._paginatePages
  }
  
  @action
  protected updatePaginatePages() {
    const maxPages = 5;
    let start = Math.max(1, this._currentPage - 2);
    const end = Math.min(this._totalPages, start + maxPages - 1);
    
    // Если конец меньше максимального количества страниц, сдвигаем начало
    if (end - start + 1 < maxPages) {
      start = Math.max(1, end - maxPages + 1);
    }
    
    this._paginatePages = Array.from(
      { length: Math.min(maxPages, this._totalPages) },
      (_, i) => start + i
    );
  }
  
  @action
  updatePagination(meta: PaginateMeta) {
    this._currentPage = meta.currentPage;
    this._hasNextPage = meta.hasNextPage;
    this._hasPreviousPage = meta.hasPreviousPage;
    this._perPage = meta.perPage;
    this._total = meta.total;
    this._totalPages = meta.totalPages;
    this.updatePaginatePages();
  }
  
  @action
  nextPage() {
    if (!this._hasNextPage) return
    
    this._currentPage++;
  }
  
  @action
  prevPage() {
    if (!this._hasPreviousPage) return
    
    this._currentPage--;
  }
  
  async load(): Promise<void> {
  
  }
  
  @action
  async goToPage(page: number): Promise<void> {
    if (page !== this._currentPage && page >= 1 && page <= this._totalPages) {
      this._currentPage = page;
      await this.load();
    }
  }
}