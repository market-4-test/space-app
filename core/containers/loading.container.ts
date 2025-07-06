import { action, makeObservable, observable } from "mobx";

export interface ILoadingContainer {
  readonly isLoading: boolean
  readonly isLoaded: boolean
  
  loading(): void
  
  loaded(): void
  
  reset(): void
}

export class LoadingContainer  implements ILoadingContainer {
  private _isLoading: boolean = false
  private _isLoaded: boolean = false
  
  constructor() {
    makeObservable(this, {
      _isLoading: observable,
      _isLoaded: observable,
      loading: action,
      loaded: action,
      reset: action,
    })
  }
  
  get isLoading(): boolean {
    return this._isLoading
  }
  
  get isLoaded(): boolean {
    return this._isLoaded
  }
  
  loading(): void {
    this._isLoading = true
  }
  
  loaded(): void {
    this._isLoading = false
    this._isLoaded = true
  }
  
  reset(): void {
    this._isLoading = false
    this._isLoaded = false
  }
}
