/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import toast from 'react-hot-toast';

import Icon from '../../components/Atoms/custom/Icon';
import { moduleMaterialStore } from '../../store/administration/module-material.store';

function ShowModuleMaterial({ materialId }: { materialId: string }) {
  const matAttachments = moduleMaterialStore.getModuleMaterialAttachments(materialId);

  const attachments = matAttachments.data?.data.data;

  const { mutateAsync } = moduleMaterialStore.downloadFile();

  async function download(attachmentId: string) {
    mutateAsync(attachmentId, {
      onSuccess: () => {
        toast.success('Your download should be completed now');
      },
      onError: () => {
        toast.error(
          'something wrong happened while downloading this file, Please try again later',
        );
      },
    });
  }

  return (
    <>
      {attachments?.map((attach) => (
        <div
          key={attach.id}
          className="flex items-center gap-2 cursor-default"
          onClick={() => download(attach.id.toString())}>
          <Icon name="pdf" />
          <div>{attach.learning_material.title}</div>
        </div>
      ))}
    </>
  );
}

export default ShowModuleMaterial;
