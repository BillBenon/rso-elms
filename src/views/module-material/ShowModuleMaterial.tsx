/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import Icon from '../../components/Atoms/custom/Icon';
import Heading from '../../components/Atoms/Text/Heading';
import { moduleMaterialService } from '../../services/administration/module-material.service';
import { moduleMaterialStore } from '../../store/administration/module-material.store';
import { ModuleMaterialAttachmentInfo } from '../../types/services/module-material.types';

function ShowModuleMaterial({ materialId }: { materialId: string }) {
  const matAttachments = moduleMaterialStore.getModuleMaterialAttachments(materialId);

  const attachments = matAttachments.data?.data.data;

  return (
    <>
      <Heading fontSize="sm" color="txt-secondary" className="p-4 underline">
        ({attachments?.length}) Supporting files
      </Heading>
      {attachments?.map((attach) => (
        <ShowAttachment attach={attach} key={attach.id} />
      ))}
    </>
  );
}

function ShowAttachment({ attach }: { attach: ModuleMaterialAttachmentInfo }) {
  const attachment = moduleMaterialStore.getFileById(attach.attachment_id).data?.data
    .data;

  let filename = attachment?.path_to_file.replace(/^.*[\\/]/, '').slice(36);

  async function download() {
    const file = await (
      await moduleMaterialService.downloadFile(attach.attachment_id + '')
    ).data;

    // eslint-disable-next-line no-undef
    var binaryData: BlobPart[] = [];
    binaryData.push(file);

    const url = window.URL.createObjectURL(
      new Blob(binaryData, { type: attachment?.file_type }),
    );

    const a = document.createElement('a');
    a.href = url;

    a.download = filename + '';

    document.getElementById('downloadme')?.appendChild(a);
    a.click();

    a.setAttribute('disabled', 'true');
    a.parentNode?.removeChild(a);
  }

  return (
    <>
      <div className="flex items-center gap-2 cursor-pointer" onClick={download}>
        <Icon
          name={
            attachment?.file_type === 'application/pdf'
              ? 'pdf'
              : attachment?.file_type === 'application/msword'
              ? 'word'
              : attachment?.file_type === 'application/vnd.ms-excel'
              ? 'excel'
              : attachment?.file_type === 'application/vnd.ms-powerpoint'
              ? 'powerpoint'
              : attachment?.file_type === 'text/plain'
              ? 'text-file'
              : attachment?.file_type.includes('image/')
              ? 'png'
              : 'pdf'
          }
        />
        <div>{filename ? filename : attach.learning_material.title}</div>
      </div>

      <div id="downloadme"></div>
    </>
  );
}

export default ShowModuleMaterial;
