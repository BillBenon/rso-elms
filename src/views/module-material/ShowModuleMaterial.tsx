import React, { useEffect, useState } from 'react';

import Icon from '../../components/Atoms/custom/Icon';
import Heading from '../../components/Atoms/Text/Heading';
import { moduleMaterialStore } from '../../store/administration/module-material.store';
import { ModuleMaterialAttachmentInfo } from '../../types/services/module-material.types';
import { downloadFile } from '../../utils/file-util';

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

  let filename = attachment?.path_to_file.replace(/^.*[\\/]/, '').slice(36) || '';

  const [url, setUrl] = useState('');

  useEffect(() => {
    async function getIt() {
      setUrl(await downloadFile(attach.attachment_id));
    }
    getIt();
  }, [attach.attachment_id]);

  return (
    <>
      <div className="flex items-center justify-between w-4/5">
        <div className="flex items-center max-w-full">
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
          <p className="truncate">{filename}</p>
        </div>
        <a href={url} download={true}>
          <Icon name="download" fill="primary" />
        </a>
      </div>

      <div id="downloadme"></div>
    </>
  );
}

export default ShowModuleMaterial;
