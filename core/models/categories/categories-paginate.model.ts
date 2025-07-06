import { CollectionPaginateContainer } from "@/core/containers/collection-paginate.container";
import { ILoadingContainer, LoadingContainer } from "@/core/containers/loading.container";
import { Category } from "#/catalog";
import useConfirm from "@/core/hooks/useConfirm";
import useToasts from "@/core/hooks/useToasts";
import { CategoriesService } from "@/core/services/catalog/categories.service";
import { CategoryModel, ICategory } from "@/core/models/categories/category.model";

export class CategoriesPaginateModel extends CollectionPaginateContainer<number, ICategory> {
  private _categoriesService: CategoriesService
  private _lc: ILoadingContainer = new LoadingContainer()
  
  constructor(tagsService: CategoriesService) {
    super()
    this._categoriesService = tagsService
  }
  
  get lc(): ILoadingContainer {
    return this._lc
  }
  
  override async load() {
    this._lc.loading()
    const response = await this._categoriesService.getCategoriesPaginate({
      params: {
        limit: this._perPage,
        page: this._currentPage
      }
    })
    
    if (response.meta) {
      this.updatePagination(response.meta)
    }
    
    if (response.list) {
      const models = response.list.map((tag) => new CategoryModel(tag))
      this.fill(models)
    }
    this._lc.loaded()
  }
  
  
  addNewCategory() {
    const model = new CategoryModel()
    model.editable.edit()
    this.tryAdd(model)
  }
  
  async upsertCategory(tag: ICategory) {
    const toasts = useToasts()
    
    let data: Category
    if (tag.id === 0) {
      data = await this._categoriesService.createCategory({
        data: {
          name: tag.name,
          slug: tag.slug,
          isActive: tag.isActive
        }
      })
      this.replaceKeys(0, data.id)
      
      toasts.success({
        title: 'Category created successfully',
      })
      
    } else {
      data = await this._categoriesService.updateCategory({
        id: tag.id,
        data: {
          name: tag.name,
          slug: tag.slug,
          isActive: tag.isActive
        }
      })
      
      toasts.success({
        title: 'Category updated successfully',
      })
    }
    tag.updateData(data)
    tag.editable.cancel()
  }
  
  tryRemoveWithConfirm(tag: ICategory) {
    const confirm = useConfirm()
    
    confirm.show({
      title: 'Want to remove the category?',
      desc: 'Category will disappear from the list, and will be removed irrevocably',
      confirmButtonText: 'Remove',
      onConfirm: async () => {
        this.tryRemove(tag.id)
        try {
          await this._categoriesService.deleteCategory(tag.id)
        } catch {
        
        }
      },
    })
  }
}