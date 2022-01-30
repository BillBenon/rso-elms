/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import Heading from '../../components/Atoms/Text/Heading';
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

  const file = moduleMaterialStore.downloadFile(attach.attachment_id + '').data?.data;

  function download() {
    var binaryData: Blob[] = [];

    if (file) {
      binaryData.push(file as Blob);
    }

    const url = window.URL.createObjectURL(
      new Blob(binaryData, { type: attachment?.file_type }),
    );

    const a = document.createElement('a');
    a.href = url;

    a.download = filename + '';

    document.getElementById('downloadme')?.appendChild(a);
    a.click();
    a.remove();

    setTimeout(() => URL.revokeObjectURL(a.href), 7000);
    a.parentNode?.removeChild(a);
  }

  return (
    <>
      <div className="flex items-center justify-between w-1/2">
        <div className="flex items-center">
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
          <p>{filename ? filename : attach.learning_material.title}</p>
        </div>
        <Button onClick={download} icon styleType="text" className="cursor-pointer">
          <Icon name="download" fill="primary" />
        </Button>
      </div>

      <div id="downloadme"></div>
    </>
  );
}

export default ShowModuleMaterial;
