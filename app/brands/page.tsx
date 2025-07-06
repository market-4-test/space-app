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
import useBrandsService from "@/core/hooks/useBrandsService";
import { BrandsPaginateModel } from "@/core/models/brands/brands-paginate.model";

const BrandsPage = observer(() => {
  const brandsService = useBrandsService()
  const [brands] = useState(new BrandsPaginateModel(brandsService))
  
  useEffect(() => {
    brands.load()
  }, [])
  
  return (
    <BaseLayout title={`Brands`} paginate={brands} onAdd={() => brands.addNewBrand()}>
      <Table>
        <TableHeader>
          <TableCol size={60}>ID</TableCol>
          <TableCol>Name</TableCol>
          <TableCol size={300}>Slug</TableCol>
          <TableCol size={70}></TableCol>
        </TableHeader>
        <TableBody>
          {brands.list.map(brand => (
            <TableRow key={brand.id}>
              <TableCell>{ brand.id ? brand.id : undefined }</TableCell>
              <TableCell>{ !brand.editable.isEditing ? brand.name : <FieldText value={brand.name} onChange={(value) => brand.setName(value)} /> }</TableCell>
              <TableCell>{ !brand.editable.isEditing ? brand.slug : <FieldText value={brand.slug} onChange={(value) => brand.setSlug(value)} readonly={true} /> }</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  { !brand.editable.isEditing ? <ButtonEdit onClick={() => brand.editable.edit()} /> : <ButtonSave disable={!brand.isValid} onClick={() => brands.upsertBrand(brand)} /> }
                  { !brand.editable.isEditing ? <ButtonRemove onClick={() => brands.tryRemoveWithConfirm(brand)} /> : undefined }
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseLayout>
  );
});

export default BrandsPage;
