import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router';

import Badge from '../../components/Atoms/custom/Badge';
import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import Loader from '../../components/Atoms/custom/Loader';
import FileUploader from '../../components/Atoms/Input/FileUploader';
import Heading from '../../components/Atoms/Text/Heading';
import { queryClient } from '../../plugins/react-query';
import { moduleMaterialStore } from '../../store/administration/module-material.store';
import { ModuleMaterialAttachment } from '../../types/services/module-material.types';
import { advancedTypeChecker } from '../../utils/getOption';

interface ParamType {
  id: string;
  materialId: string;
}

function NewModuleMaterialAttach() {
  const { materialId, id } = useParams<ParamType>();
  const history = useHistory();

  const { data: materials, isLoading } =
    moduleMaterialStore.getModuleMaterial(materialId);

  const material = materials?.data.data;

  const [attach] = useState<ModuleMaterialAttachment>({
    attachment_id: '',
    learning_material_id: 0,
  });

  const [file, setFile] = useState<File | null>(null);

  const { mutate } = moduleMaterialStore.addFile();
  const { mutateAsync } = moduleMaterialStore.addModuleMaterialAttachment();

  const handleUpload = (files: FileList | null) => {
    setFile(files ? files[0] : null);
  };

  async function submitForm(e: FormEvent) {
    e.preventDefault(); // prevent page to reload:
    if (file) {
      let formData = new FormData();
      formData.append('file', file);

      await mutate(formData, {
        onSuccess(data) {
          toast.success(data.data.message);
          mutateAsync(
            {
              ...attach,
              attachment_id: data.data.data.id + '',
              learning_material_id: parseInt(material?.id + ''),
            },
            {
              async onSuccess(data) {
                toast.success(data.data.message);
                queryClient.invalidateQueries(['material/attachment']);
                history.push(`/dashboard/modules/${id}`);
              },
              onError(error: any) {
                toast.error(error.response.data.message);
              },
            },
          );
        },
        onError(error: any) {
          toast.error(error.response.data.message);
        },
      });
    } else {
      toast.error('Please add file');
    }
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <form className="bg-main w-7/12 px-6 py-4 mt-4" onSubmit={submitForm}>
          <div className="flex items-center justify-between mb-4">
            <Heading fontSize="base" className="py-4">
              {material?.title} attachment
            </Heading>
            {material?.type && (
              <Badge className="h-4/5" badgecolor={advancedTypeChecker(material.type)}>
                {material.type}
              </Badge>
            )}
          </div>
          <FileUploader
            allowPreview={false}
            handleUpload={handleUpload}
            accept={
              'application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*'
            }>
            <Button type="button" styleType="outline" icon={true}>
              <span className="flex items-center">
                <Icon name={'attach'} fill="primary" />
                <span className="pr-3">Attach supporting file</span>
              </span>
            </Button>
          </FileUploader>
          <div className="mt-5">
            <Button type="submit">Save</Button>
          </div>
        </form>
      )}
    </>
  );
}

export default NewModuleMaterialAttach;
