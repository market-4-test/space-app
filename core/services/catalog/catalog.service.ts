import { NetClient } from "@/core/transport/net/net.client";

export class CatalogService {
  protected _cli: NetClient
  constructor(postfix: string) {
    this._cli = new NetClient(`${process.env.NEXT_PUBLIC_CATALOG_SERVICE_REST_ENDPOINT}${postfix}`);
  }
}