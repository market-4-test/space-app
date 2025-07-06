import { TagsService } from "@/core/services/catalog/tags.service";

const tagsService = new TagsService()

const useTagsService = () => {
  return tagsService
}

export default useTagsService