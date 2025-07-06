import { action, computed, makeObservable, observable } from "mobx";
import { Product, ProductMeta } from "#/catalog";
import { EditableContainer, IEditableContainer } from "@/core/containers/editable.container";
import { slugify } from "transliteration";

export interface IProduct extends ProductMeta {
  get id(): string
  get editable(): IEditableContainer
  get isValid(): boolean
  setName(name: string): void;
  setSlug(slug: string): void;
  setDescription(description: string): void
  setPrice(price: number): void
  updateData(data: Product): void
}

export class ProductModel implements IProduct {
  @observable private _id: string = '';
  @observable private _uuid: Uint8Array = new Uint8Array();
  @observable private _name: string = '';
  @observable private _description: string = '';
  @observable private _slug: string = '';
  @observable private _price: number = 0;
  private _editable: IEditableContainer = new EditableContainer()
  
  constructor(data?: Product) {
    if (data) {
      this.updateData(data)
    }
    makeObservable(this)
  }
  
  @computed
  get id(): string {
    return this._id;
  }
  
  
  @computed
  get uuid(): Uint8Array {
    return this._uuid;
  }
  
  @computed
  get name(): string {
    return this._name;
  }
  
  @computed
  get description(): string {
    return this._description;
  }
  
  @computed
  get slug(): string {
    return this._slug;
  }
  
  @computed
  get price(): number {
    return this._price;
  }
  
  @computed
  get isValid(): boolean {
    return this._name.trim().length >= 3;
  }
  
  get editable(): IEditableContainer {
    return this._editable;
  }
  
  @action
  setName(name: string): void {
    this._name = name;
    this._slug = slugify(name, {
      lowercase: true,
      trim: true,
      separator: '-',
    })
  }
  
  @action
  setSlug(slug: string): void {
    this._slug = slug;
  }
  
  @action
  setDescription(description: string): void {
    this._description = description;
  }
  
  
  @action
  setPrice(price: number): void {
    this._price = price;
  }
  
  @action
  updateData(data: Product) {
    this._id = data.meta?.uuid as unknown as string;
    // this._uuid = data.meta?.uuid ?? this._uuid;
    this._name = data.meta?.name ?? this._name;
    this._description = data.meta?.description ?? this._description;
    this._slug = data.meta?.slug ?? this._slug;
    this._price = data.meta?.price ?? this._price;
  }
}
