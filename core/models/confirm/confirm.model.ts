import { action, computed, makeObservable, observable } from "mobx";

export interface IConfirmParams {
  title: string
  desc?: string
  cancelButtonText?: string
  confirmButtonText: string
  onCancel?: null | (() => Promise<void>)
  onConfirm?: null | (() => Promise<void>)
}

export class ConfirmModel {
  @observable private _title: string = ''
  @observable private _desc: string = ''
  @observable private _cancelButtonText: string = ''
  @observable private _confirmButtonText: string = ''
  @observable private _onCancel: null | (() => Promise<void>) = null
  @observable private _onConfirm: null | (() => Promise<void>) = null
  @observable private _isShow: boolean = false
  
  constructor() {
    makeObservable(this)
  }
  
  @computed get isShow(): boolean {
    return this._isShow
  }
  
  @computed get title(): string {
    return this._title
  }
  
  @computed get desc(): string {
    return this._desc
  }
  
  @computed get cancelButtonText(): string {
    return this._cancelButtonText
  }
  
  @computed get confirmButtonText(): string {
    return this._confirmButtonText
  }
  
  @computed get onCancel(): null | (() => Promise<void>) {
    return this._onCancel
  }
  
  @computed get onConfirm(): null | (() => Promise<void>) {
    return this._onConfirm
  }
  
  @action protected hide(): void {
    this._isShow = false
  }
  
  @action show(params: IConfirmParams): void {
    this._title = params.title
    this._desc = params.desc ?? ''
    this._cancelButtonText = params.cancelButtonText ?? 'Cancel'
    this._confirmButtonText = params.confirmButtonText
    this._onCancel = params.onCancel ?? null
    this._onConfirm = params.onConfirm ?? null
    this._isShow = true
  }
  
  @action confirm(): void {
    if (this._onConfirm) {
      this._onConfirm().then(() => this.hide())
    } else {
      this.hide()
    }
  }
  
  @action cancel(): void {
    if (this._onCancel) {
      this._onCancel().then(() => this.hide())
    } else {
      this.hide()
    }
  }
  
  @action reset(): void {
    this._title = ''
    this._desc = ''
    this._cancelButtonText = ''
    this._confirmButtonText = ''
    this._onCancel = null
    this._onConfirm = null
  }
}
