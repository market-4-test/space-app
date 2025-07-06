import { action, computed, makeObservable, observable } from "mobx";

export interface IEditableContainer {
  isEditing: boolean;
  edit(): void;
  cancel(): void;
}

export class EditableContainer implements IEditableContainer {
  @observable private _isEditing: boolean = false
  constructor() {
    makeObservable(this)
  }
  
  @computed
  get isEditing(): boolean {
    return this._isEditing
  }
  
  @action
  edit() {
    this._isEditing = true
  }
  
  @action
  cancel() {
    this._isEditing = false
  }
}