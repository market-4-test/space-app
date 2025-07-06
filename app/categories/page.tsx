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
import { CategoriesPaginateModel } from "@/core/models/categories/categories-paginate.model";
import useCategoriesService from "@/core/hooks/useCategoriesService";

const CategoriesPage = observer(() => {
  const categoriesService = useCategoriesService()
  const [categories] = useState(new CategoriesPaginateModel(categoriesService))
  
  useEffect(() => {
    categories.load()
  }, [])
  
  return (
    <BaseLayout title={`Categories`} paginate={categories} onAdd={() => categories.addNewCategory()}>
      <Table>
        <TableHeader>
          <TableCol size={60}>ID</TableCol>
          <TableCol>Name</TableCol>
          <TableCol size={300}>Slug</TableCol>
          <TableCol size={70}></TableCol>
        </TableHeader>
        <TableBody>
          {categories.list.map(category => (
            <TableRow key={category.id}>
              <TableCell>{ category.id ? category.id : undefined }</TableCell>
              <TableCell>{ !category.editable.isEditing ? category.name : <FieldText value={category.name} onChange={(value) => category.setName(value)} /> }</TableCell>
              <TableCell>{ !category.editable.isEditing ? category.slug : <FieldText value={category.slug} onChange={(value) => category.setSlug(value)} readonly={true} /> }</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  { !category.editable.isEditing ? <ButtonEdit onClick={() => category.editable.edit()} /> : <ButtonSave disable={!category.isValid} onClick={() => categories.upsertCategory(category)} /> }
                  { !category.editable.isEditing ? <ButtonRemove onClick={() => categories.tryRemoveWithConfirm(category)} /> : undefined }
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseLayout>
  );
});

export default CategoriesPage;