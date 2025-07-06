import { CatalogService } from "@/core/services/catalog/catalog.service";
import {
  Brand,
  CreateBrandParams,
  GetBrandsPaginateParams,
  GetBrandsPaginateResponse,
  UpdateBrandParams
} from "#/catalog";

export class BrandsService extends CatalogService {
  constructor() {
    super('/brands');
  }
  
  getBrandsPaginate(params?: GetBrandsPaginateParams) {
    const searchParams = new URLSearchParams({
      limit: params?.params?.limit ?? 10,
      page: params?.params?.page ?? 1,
    })
    
    return this._cli.get<GetBrandsPaginateResponse>('', {
      searchParams
    });
  }
  
  
  updateBrand(params: UpdateBrandParams) {
    return this._cli.put<Brand>(`${ params.id }`, {
      data: params.data
    });
  }
  
  createBrand(params: CreateBrandParams) {
    console.log(params)
    return this._cli.post<Brand>(``, params);
  }
  
  deleteBrand(id: number) {
    return this._cli.delete(`${id}`);
  }
}