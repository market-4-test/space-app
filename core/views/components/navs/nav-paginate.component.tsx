import { observer } from "mobx-react-lite";
import { ICollectionPaginateContainer } from "@/core/containers/collection-paginate.container";
import ButtonBase from "../controls/buttons/button-base.component";

export interface INavPaginateProps {
  container: ICollectionPaginateContainer<unknown, any>
}

const NavPaginate = observer(({container}: INavPaginateProps) => {
  return (
    <div className={ `NavPaginate flex-grow` }>
      { container.paginatePages }
      <div className="NavPaginate__List flex items-center">
        { container.paginatePages && container.paginatePages.length > 0 && (
          container.paginatePages.map((page) => (
            <ButtonBase key={ page } onClick={ () => container.goToPage(page) }
                        disable={ container.currentPage == page }>
              { page }
            </ButtonBase>
          ))
        ) }
      </div>
    </div>
  )
})

export default NavPaginate;