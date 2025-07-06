import { TagsService } from "@/core/services/catalog/tags.service";
import { CollectionPaginateContainer } from "@/core/containers/collection-paginate.container";
import { ITag, TagModel } from "@/core/models/tags/tag.model";
import { ILoadingContainer, LoadingContainer } from "@/core/containers/loading.container";
import { Tag } from "#/catalog";
import useConfirm from "@/core/hooks/useConfirm";
import useToasts from "@/core/hooks/useToasts";

export class TagsPaginateModel extends CollectionPaginateContainer<number, ITag> {
  private _tagsService: TagsService
  private _lc: ILoadingContainer = new LoadingContainer()
  
  constructor(tagsService: TagsService) {
    super()
    this._tagsService = tagsService
  }
  
  get lc(): ILoadingContainer {
    return this._lc
  }
  
  override async load() {
    this._lc.loading()
    const response = await this._tagsService.getTagsPaginate({
      params: {
        limit: this._perPage,
        page: this._currentPage
      }
    })
    
    if (response.meta) {
      this.updatePagination(response.meta)
    }
    
    if (response.list) {
      const models = response.list.map((tag) => new TagModel(tag))
      this.fill(models)
    }
    this._lc.loaded()
  }
  
  
  addNewTag() {
    const model = new TagModel()
    model.editable.edit()
    this.tryAdd(model)
  }
  
  async upsertTag(tag: ITag) {
    const toasts = useToasts()
    
    let data: Tag
    if (tag.id === 0) {
      data = await this._tagsService.createTag({
        data: {
          name: tag.name,
        }
      })
      this.replaceKeys(0, data.id)
      
      toasts.success({
        title: 'Tag created successfully',
      })
      
    } else {
      data = await this._tagsService.updateTag({
        id: tag.id,
        data: {
          name: tag.name,
        }
      })
      
      toasts.success({
        title: 'Tag updated successfully',
      })
    }
    tag.updateData(data)
    tag.editable.cancel()
  }
  
  tryRemoveWithConfirm(tag: ITag) {
    const confirm = useConfirm()
    
    confirm.show({
      title: 'Want to remove the tag?',
      desc: 'Tag will disappear from the list, and will be removed irrevocably',
      confirmButtonText: 'Remove',
      onConfirm: async () => {
        this.tryRemove(tag.id)
        try {
          await this._tagsService.deleteTag(tag.id)
        } catch {
        
        }
      },
    })
  }
}