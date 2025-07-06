import { CategoriesService } from "@/core/services/catalog/categories.service";

const categoriesService = new CategoriesService()

const useCategoriesService = () => {
  return categoriesService
}

export default useCategoriesService