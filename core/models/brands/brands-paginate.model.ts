import { CollectionPaginateContainer } from "@/core/containers/collection-paginate.container";
import { ILoadingContainer, LoadingContainer } from "@/core/containers/loading.container";
import { Brand } from "#/catalog";
import useConfirm from "@/core/hooks/useConfirm";
import useToasts from "@/core/hooks/useToasts";
import { BrandsService } from "@/core/services/catalog/brands.service";
import { BrandModel, IBrand } from "@/core/models/brands/brand.model";

export class BrandsPaginateModel extends CollectionPaginateContainer<number, IBrand> {
  private _brandsService: BrandsService
  private _lc: ILoadingContainer = new LoadingContainer()
  
  constructor(tagsService: BrandsService) {
    super()
    this._brandsService = tagsService
  }
  
  get lc(): ILoadingContainer {
    return this._lc
  }
  
  override async load() {
    this._lc.loading()
    const response = await this._brandsService.getBrandsPaginate({
      params: {
        limit: this._perPage,
        page: this._currentPage
      }
    })
    
    if (response.meta) {
      this.updatePagination(response.meta)
    }
    
    if (response.list) {
      const models = response.list.map((tag) => new BrandModel(tag))
      this.fill(models)
    }
    this._lc.loaded()
  }
  
  
  addNewBrand() {
    const model = new BrandModel()
    model.editable.edit()
    this.tryAdd(model)
  }
  
  async upsertBrand(tag: IBrand) {
    const toasts = useToasts()
    
    let data: Brand
    if (tag.id === 0) {
      data = await this._brandsService.createBrand({
        data: {
          name: tag.name,
          slug: tag.slug,
          isActive: tag.isActive
        }
      })
      this.replaceKeys(0, data.id)
      
      toasts.success({
        title: 'Brand created successfully',
      })
      
    } else {
      data = await this._brandsService.updateBrand({
        id: tag.id,
        data: {
          name: tag.name,
          slug: tag.slug,
          isActive: tag.isActive
        }
      })
      
      toasts.success({
        title: 'Brand updated successfully',
      })
    }
    tag.updateData(data)
    tag.editable.cancel()
  }
  
  tryRemoveWithConfirm(tag: IBrand) {
    const confirm = useConfirm()
    
    confirm.show({
      title: 'Want to remove the brand?',
      desc: 'Brand will disappear from the list, and will be removed irrevocably',
      confirmButtonText: 'Remove',
      onConfirm: async () => {
        this.tryRemove(tag.id)
        try {
          await this._brandsService.deleteBrand(tag.id)
        } catch {
        
        }
      },
    })
  }
}