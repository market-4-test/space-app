import { action, computed, makeObservable, observable } from "mobx";
import { Brand } from "#/catalog";
import { EditableContainer, IEditableContainer } from "@/core/containers/editable.container";
import { slugify } from "transliteration";

export interface IBrand extends Brand {
  get editable(): IEditableContainer
  get isValid(): boolean
  setName(name: string): void;
  setSlug(slug: string): void;
  setIsActive(isActive: boolean): void
  updateData(data: Brand): void
}

export class BrandModel implements IBrand {
  @observable private _id: number = 0;
  @observable private _name: string = '';
  @observable private _slug: string = '';
  @observable private _isActive: boolean = true;
  private _editable: IEditableContainer = new EditableContainer()
  
  constructor(data?: Brand) {
    if (data) {
      this.updateData(data)
    }
    makeObservable(this)
  }
  
  @computed
  get id(): number {
    return this._id;
  }
  
  @computed
  get name(): string {
    return this._name;
  }
  
  @computed
  get slug(): string {
    return this._slug;
  }
  
  @computed
  get isActive(): boolean {
    return this._isActive;
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
  setIsActive(isActive: boolean): void {
    this._isActive = isActive;
  }
  
  @action
  updateData(data: Brand) {
    this._id = data.id;
    this._name = data.name;
    this._slug = data.slug;
    this._isActive = data.isActive;
  }
}
