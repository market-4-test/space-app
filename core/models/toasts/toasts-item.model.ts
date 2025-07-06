import { v4 } from "uuid";

export type ToastsItemType = 'success' | 'warning' | 'error';

export interface IToastsItemParams {
  title: string;
  message?: string;
  type?: ToastsItemType;
}

export interface IToastsItem {
  get id(): string
  
  get title(): string
  
  get message(): string
  
  get type(): ToastsItemType
  
  get createdAt(): Date
}

export class ToastsItemModel implements IToastsItem {
  private _id: string = v4()
  private readonly _title: string
  private readonly _message: string
  private readonly _type: ToastsItemType
  private readonly _createdAt: Date = new Date();
  
  constructor(params: IToastsItemParams) {
    this._title = params.title;
    this._message = params.message ?? '';
    this._type = params.type ?? 'success';
  }
  
  get id(): string {
    return this._id
  }
  
  get title(): string {
    return this._title;
  }
  
  get message(): string {
    return this._message;
  }
  
  get type(): ToastsItemType {
    return this._type;
  }
  
  get createdAt(): Date {
    return this._createdAt;
  }
}