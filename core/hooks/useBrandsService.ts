import { BrandsService } from "@/core/services/catalog/brands.service";

const brandsService = new BrandsService()

const useBrandsService = () => {
  return brandsService
}

export default useBrandsService