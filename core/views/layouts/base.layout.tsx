'use client'

import NavSide from "@/core/views/components/navs/nav-side.component";
import { ToastsList } from "../components/toasts/toasts-list.component";
import ConfirmOverlay from "@/core/views/components/overlays/confirm/confirm-overlay.component";
import { ICollectionPaginateContainer } from "@/core/containers/collection-paginate.container";
import NavPaginate from "@/core/views/components/navs/nav-paginate.component";
import ButtonAdd from "../components/controls/buttons/button-add.component";

export default function BaseLayout(
  {
    children,
    title,
    paginate,
    onAdd
  }: Readonly<{
    children: React.ReactNode;
    title: string;
    onAdd?: () => void;
    paginate?: ICollectionPaginateContainer<unknown, any>
  }>
) {
  return (
    <>
      <div className={ `BaseLayout flex h-screen` }>
        <NavSide/>
        <div className={ `flex flex-col w-full` }>
          <div className={ `flex items-center pt-4 px-4 gap-2` }>
            <h1 className={ 'text-3xl font-bold' }>{ title }</h1>
          </div>
          <div className={ `overflow-y-auto p-4` }>
            { children }
          </div>
          { onAdd && <ButtonAdd onClick={ onAdd }/> }
          { paginate && <NavPaginate container={ paginate }/> }
        </div>
      </div>
      <ToastsList/>
      <ConfirmOverlay/>
    </>
  );
}
