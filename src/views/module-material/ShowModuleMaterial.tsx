import React from 'react';

import { moduleMaterialStore } from '../../store/administration/module-material.store';

function ShowModuleMaterial({ materialId }: { materialId: string }) {
  const matAttachments = moduleMaterialStore.getModuleMaterialAttachment(materialId);

  console.log(matAttachments);

  return <div></div>;
}

export default ShowModuleMaterial;
