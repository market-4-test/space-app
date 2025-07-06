'use client'

import { observer } from "mobx-react-lite";
import BaseLayout from "@/core/views/layouts/base.layout";
import { useEffect, useState } from "react";
import TableHeader from "@/core/views/components/table/table-header.component";
import TableBody from "@/core/views/components/table/table-body.component";
import TableRow from "@/core/views/components/table/table-row.component";
import TableCell from "@/core/views/components/table/table-cell.component";
import Table from "@/core/views/components/table/table.component";
import TableCol from "@/core/views/components/table/table-col.component";
import ButtonRemove from "@/core/views/components/controls/buttons/button-remove.component";
import ButtonEdit from "@/core/views/components/controls/buttons/button-edit.component";
import ButtonSave from "@/core/views/components/controls/buttons/button-save.component";
import FieldText from "@/core/views/components/controls/fields/field-text.component";
import { ProductsPaginateModel } from "@/core/models/products/products-paginate.model";
import useProductsService from "@/core/hooks/useProductsService";

const ProductsPage = observer(() => {
  const categoriesService = useProductsService()
  const [categories] = useState(new ProductsPaginateModel(categoriesService))
  
  useEffect(() => {
    categories.load()
  }, [])
  
  return (
    <BaseLayout title={`Products`} paginate={categories} onAdd={() => categories.addNewProduct()}>
      <Table>
        <TableHeader>
          <TableCol size={200}>ID</TableCol>
          <TableCol>Name</TableCol>
          <TableCol>Description</TableCol>
          <TableCol size={200}>Slug</TableCol>
          <TableCol size={100}>Price</TableCol>
          <TableCol size={70}></TableCol>
        </TableHeader>
        <TableBody>
          {categories.list.map(product => (
            <TableRow key={product.id}>
              <TableCell>{ product.id ? product.id : undefined }</TableCell>
              <TableCell>{ !product.editable.isEditing ? product.name : <FieldText value={product.name} onChange={(value) => product.setName(value)} /> }</TableCell>
              <TableCell>{ !product.editable.isEditing ? product.description : <FieldText value={product.description} onChange={(value) => product.setDescription(value)} /> }</TableCell>
              <TableCell>{ !product.editable.isEditing ? product.slug : <FieldText value={product.slug} onChange={(value) => product.setSlug(value)} /> }</TableCell>
              <TableCell>{ !product.editable.isEditing ? product.price : <FieldText value={String(product.price)} onChange={(value) => product.setPrice(Number(value.replace(/\D/g, '')))} /> }</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  { !product.editable.isEditing ? <ButtonEdit onClick={() => product.editable.edit()} /> : <ButtonSave disable={!product.isValid} onClick={() => categories.upsertProduct(product)} /> }
                  { !product.editable.isEditing ? <ButtonRemove onClick={() => categories.tryRemoveWithConfirm(product)} /> : undefined }
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseLayout>
  );
});

export default ProductsPage;