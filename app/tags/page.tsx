'use client'

import { observer } from "mobx-react-lite";
import BaseLayout from "@/core/views/layouts/base.layout";
import useTagsService from "@/core/hooks/useTagsService";
import { TagsPaginateModel } from "@/core/models/tags/tags-paginate.model";
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

const TagsPage = observer(() => {
  const tagsService = useTagsService()
  const [tags] = useState(new TagsPaginateModel(tagsService))
  
  useEffect(() => {
    tags.load()
  }, [])
  
  return (
    <BaseLayout title={`Tags`} paginate={tags} onAdd={() => tags.addNewTag()}>
      <Table>
        <TableHeader>
          <TableCol size={60}>ID</TableCol>
          <TableCol>Name</TableCol>
          <TableCol size={70}></TableCol>
        </TableHeader>
        <TableBody>
          {tags.list.map(tag => (
            <TableRow key={tag.id}>
              <TableCell>{ tag.id ? tag.id : undefined }</TableCell>
              <TableCell>{ !tag.editable.isEditing ? tag.name : <FieldText value={tag.name} onChange={(value) => tag.setName(value)} /> }</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  { !tag.editable.isEditing ? <ButtonEdit onClick={() => tag.editable.edit()} /> : <ButtonSave disable={!tag.isValid} onClick={() => tags.upsertTag(tag)} /> }
                  { !tag.editable.isEditing ? <ButtonRemove onClick={() => tags.tryRemoveWithConfirm(tag)} /> : undefined }
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseLayout>
  );
});

export default TagsPage;