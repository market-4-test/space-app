import { action, computed, makeObservable, observable } from "mobx";

export interface ICollectionElement<T = number> {
  get id(): T
}

export interface ICollectionContainer<TKey, TElement extends ICollectionElement<TKey>> {
  get list(): TElement[]
  
  get hasMoreOne(): boolean
  
  getOne(id: TKey): TElement | undefined
  
  getAll(): TElement[]
  
  fill(elements: TElement[]): void
  
  getOneByIndex(index: number): TElement | undefined
  
  tryAdd(element: TElement): void
  
  hasById(id: TKey): boolean
  
  hasByElement(element: TElement): boolean
  
  tryRemove(id: TKey): void
  
  tryRemoveByIndex(index: number): void
  
  clear(): void
}

export class CollectionContainer<TKey, TElement extends ICollectionElement<TKey>> implements ICollectionContainer<TKey, TElement>
{
  @observable.shallow protected _list: TElement[] = []
  protected _map: Map<TKey, TElement> = new Map()
  
  constructor() {
    makeObservable(this);
  }
  
  @computed get hasMoreOne(): boolean {
    return this._list.length > 1
  }
  
  @computed get list(): TElement[] {
    return this._list
  }
  
  getOne(id: TKey): TElement | undefined {
    return this._map.get(id)
  }
  
  getOneByIndex(index: number): TElement | undefined {
    return this._list[index]
  }
  
  getAll(): TElement[] {
    return this._list
  }
  
  @action tryAdd(element: TElement): void {
    if (this.hasByElement(element)) return
    this._list.push(element)
    this._map.set(element.id, element)
  }
  
  @action fill(elements: TElement[]): void {
    this.clear()
    for (const element of elements) {
      this._map.set(element.id, element)
    }
    this._list.push(...elements)
  }
  
  hasById(id: TKey): boolean {
    return this._map.has(id)
  }
  
  hasByElement(element: TElement): boolean {
    return this.hasById(element.id)
  }
  
  replaceKeys(oldId: TKey, newId: TKey): void {
    if (!this.hasById(oldId)) return
    
    const item = this.getOne(oldId)
    if (!item) return
    
    this._map.delete(oldId)
    this._map.set(newId, item)
  }
  
  @action tryRemove(id: TKey): void {
    if (!this.hasById(id)) return
    
    const index = this._list.findIndex(item => item.id === id)
    this._list.splice(index, 1)
    this._map.delete(id)
  }
  
  @action tryRemoveByIndex(index: number): void {
    const element = this._list[index]
    if (!element) return
    
    this._list.splice(index, 1)
    this._map.delete(element.id)
  }
  
  @action clear(): void {
    this._list = []
    this._map.clear()
  }
}
