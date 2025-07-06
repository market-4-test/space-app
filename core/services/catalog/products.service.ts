import { CatalogService } from "@/core/services/catalog/catalog.service";
import { CreateProductParams, GetProductsPaginateParams, GetProductsPaginateResponse, Product, } from "#/catalog";
import { UpsertProductMetaParams } from "#/catalog/products";

export class ProductsService extends CatalogService {
  constructor() {
    super('/products');
  }
  
  getProductsPaginate(params?: GetProductsPaginateParams) {
    const searchParams = new URLSearchParams({
      limit: params?.params?.limit ?? 10,
      page: params?.params?.page ?? 1,
    })
    
    return this._cli.get<GetProductsPaginateResponse>('', {
      searchParams
    });
  }
  
  updateProduct(uuid: string, params: UpsertProductMetaParams) {
    return this._cli.put<Product>(`${ uuid }`, {
      data: params
    });
  }
  
  createProduct(params: CreateProductParams) {
    return this._cli.post<Product>(``, params);
  }
  
  deleteProduct(uuid: string) {
    return this._cli.delete(`${uuid}`);
  }
}