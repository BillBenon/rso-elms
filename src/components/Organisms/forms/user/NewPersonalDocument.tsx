import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import { queryClient } from '../../../../plugins/react-query';
import { levelStore } from '../../../../store/administration/level.store';
import usersStore from '../../../../store/administration/users.store';
import { ValueType } from '../../../../types';
import { INewPersonalDoc } from '../../../../types/services/user.types';
import Button from '../../../Atoms/custom/Button';
import FileUploader from '../../../Atoms/Input/FileUploader';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

interface DocParams {
  personId: string;
}

export default function NewPersonalDocument({ personId }: DocParams) {
  const [attachment, setAttachment] = useState<INewPersonalDoc>({
    description: '',
    purpose: '',
    personId: personId,
  });

  const [file, setFile] = useState<File | null>(null);

  const handleUpload = (files: FileList | null) => {
    setFile(files ? files[0] : null);
  };

  const history = useHistory();
  const { mutateAsync, isLoading } = usersStore.addPersonalDoc();

  function handleChange(e: ValueType) {
    setAttachment({ ...attachment, [e.name]: e.value });
  }

  async function submitForm<T>(e: FormEvent<T>) {
    e.preventDefault();
    if (file) {
      let data = new FormData();

      data.append('description', `${attachment.description}`);
      data.append('purpose', `${attachment.purpose}`);
      data.append('attachmentFile', file);
      data.append('personId', `${personId}`);

      await mutateAsync(
        { id: personId, docInfo: data },
        {
          onSuccess(data) {
            toast.success(data.data.message);
            queryClient.invalidateQueries(['user/personal_docs', personId]);
            history.goBack();
          },
          onError(error: any) {
            toast.error(error.response.data.message);
          },
        },
      );
    }
  }

  return (
    <form onSubmit={submitForm}>
      <div className="mb-6">
        <InputMolecule
          value={attachment.purpose}
          handleChange={handleChange}
          placeholder="Enter attachment purpose"
          name="name">
          Personal Doc Purpose
        </InputMolecule>

        <TextAreaMolecule
          value={attachment.description}
          name="description"
          handleChange={handleChange}>
          Doc Descripiton
        </TextAreaMolecule>

        <FileUploader allowPreview={false} handleUpload={handleUpload} accept={'*'}>
          <Button styleType="outline" type="button">
            upload doc
          </Button>
        </FileUploader>
      </div>

      <Button disabled={isLoading} type="submit">
        Save
      </Button>
    </form>
  );
}
