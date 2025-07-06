import { ProductsService } from "@/core/services/catalog/products.service";

const productsService = new ProductsService()

const useProductsService = () => {
  return productsService
}

export default useProductsService