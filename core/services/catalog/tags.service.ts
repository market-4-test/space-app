import { CatalogService } from "@/core/services/catalog/catalog.service";
import { CreateTagParams, GetTagsPaginateParams, GetTagsPaginateResponse, Tag, UpdateTagParams } from "#/catalog";

export class TagsService extends CatalogService {
  constructor() {
    super('/tags');
  }
  
  getTagsPaginate(params?: GetTagsPaginateParams) {
    const searchParams = new URLSearchParams({
      limit: params?.params?.limit ?? 10,
      page: params?.params?.page ?? 1,
    })
    
    return this._cli.get<GetTagsPaginateResponse>('', {
      searchParams
    });
  }
  
  
  updateTag(params: UpdateTagParams) {
    return this._cli.put<Tag>(`${ params.id }`, {
      data: params.data
    });
  }
  
  createTag(params: CreateTagParams) {
    console.log(params)
    return this._cli.post<Tag>(``, params);
  }
  
  deleteTag(id: number) {
    return this._cli.delete(`${id}`);
  }
}