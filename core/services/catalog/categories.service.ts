import { CatalogService } from "@/core/services/catalog/catalog.service";
import {
  Category,
  CreateCategoryParams,
  GetCategoriesPaginateParams,
  GetCategoriesPaginateResponse,
  UpdateCategoryParams
} from "#/catalog";

export class CategoriesService extends CatalogService {
  constructor() {
    super('/categories');
  }
  
  getCategoriesPaginate(params?: GetCategoriesPaginateParams) {
    const searchParams = new URLSearchParams({
      limit: params?.params?.limit ?? 10,
      page: params?.params?.page ?? 1,
    })
    
    return this._cli.get<GetCategoriesPaginateResponse>('', {
      searchParams
    });
  }
  
  
  updateCategory(params: UpdateCategoryParams) {
    return this._cli.put<Category>(`${ params.id }`, {
      data: params.data
    });
  }
  
  createCategory(params: CreateCategoryParams) {
    console.log(params)
    return this._cli.post<Category>(``, params);
  }
  
  deleteCategory(id: number) {
    return this._cli.delete(`${id}`);
  }
}