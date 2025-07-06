import { CollectionPaginateContainer } from "@/core/containers/collection-paginate.container";
import { ILoadingContainer, LoadingContainer } from "@/core/containers/loading.container";
import { Product } from "#/catalog";
import useConfirm from "@/core/hooks/useConfirm";
import useToasts from "@/core/hooks/useToasts";
import { ProductsService } from "@/core/services/catalog/products.service";
import { IProduct, ProductModel } from "@/core/models/products/product.model";

export class ProductsPaginateModel extends CollectionPaginateContainer<string, IProduct> {
  private _productsService: ProductsService
  private _lc: ILoadingContainer = new LoadingContainer()
  
  constructor(productsService: ProductsService) {
    super()
    this._productsService = productsService
  }
  
  get lc(): ILoadingContainer {
    return this._lc
  }
  
  override async load() {
    this._lc.loading()
    const response = await this._productsService.getProductsPaginate({
      params: {
        limit: this._perPage,
        page: this._currentPage
      }
    })
    
    if (response.meta) {
      this.updatePagination(response.meta)
    }
    
    if (response.list) {
      const models = response.list.map((product) => new ProductModel(product))
      this.fill(models)
    }
    this._lc.loaded()
  }
  
  
  addNewProduct() {
    const model = new ProductModel()
    model.editable.edit()
    this.tryAdd(model)
  }
  
  async upsertProduct(product: IProduct) {
    const toasts = useToasts()
    
    let data: Product
    if (product.id === '') {
      data = await this._productsService.createProduct({
        data: {
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price
        }
      })
      this.replaceKeys('', data.meta?.uuid as unknown as string ?? '')
      
      toasts.success({
        title: 'Product created successfully',
      })
      
    } else {
      data = await this._productsService.updateProduct(product.id, {
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price
      })
      
      toasts.success({
        title: 'Product updated successfully',
      })
    }
    product.updateData(data)
    product.editable.cancel()
  }
  
  tryRemoveWithConfirm(product: IProduct) {
    const confirm = useConfirm()
    
    confirm.show({
      title: 'Want to remove the product?',
      desc: 'Product will disappear from the list, and will be removed irrevocably',
      confirmButtonText: 'Remove',
      onConfirm: async () => {
        this.tryRemove(product.id)
        try {
          await this._productsService.deleteProduct(product.id)
        } catch {
        
        }
      },
    })
  }
}