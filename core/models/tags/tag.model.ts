import { Tag } from "#/catalog";
import { action, computed, makeObservable, observable } from "mobx";
import { EditableContainer, IEditableContainer } from "@/core/containers/editable.container";

export interface ITag extends Tag {
  get editable(): IEditableContainer
  get isValid(): boolean
  setName(name: string): void;
  updateData(data: Tag): void
}

export class TagModel implements ITag {
  @observable private _id: number = 0;
  @observable private _name: string = '';
  private _editable: IEditableContainer = new EditableContainer()
  constructor(data?: Tag) {
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
  get isValid(): boolean {
    return this._name.trim().length >= 3;
  }
  
  get editable(): IEditableContainer {
    return this._editable;
  }
  
  @action
  setName(name: string): void {
    this._name = name;
  }
  
  @action
  updateData(data: Tag) {
    this._id = data.id;
    this._name = data.name;
  }
}