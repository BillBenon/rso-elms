import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import FileUploader from '../../components/Atoms/Input/FileUploader';
import InputMolecule from '../../components/Molecules/input/InputMolecule';
import TextAreaMolecule from '../../components/Molecules/input/TextAreaMolecule';
import { queryClient } from '../../plugins/react-query';
import programStore from '../../store/administration/program.store';
import { ValueType } from '../../types';
import { ProgramSyllabus } from '../../types/services/program.types';

interface DocParams {
  programId: string;
}

export default function AddProgramSyllabus({ programId }: DocParams) {
  const [attachment, setAttachment] = useState<ProgramSyllabus>({
    description: '',
    purpose: '',
    programId: programId,
  });

  const [file, setFile] = useState<File | null>(null);

  const handleUpload = (files: FileList | null) => {
    setFile(files ? files[0] : null);
  };

  const history = useHistory();
  const { mutateAsync, isLoading } = programStore.addProgramSyllabus();

  function handleChange(e: ValueType) {
    setAttachment({ ...attachment, [e.name]: e.value });
  }

  async function submitForm<T>(e: FormEvent<T>) {
    e.preventDefault();
    console.log(attachment);
    if (file) {
      let data = new FormData();

      data.append('description', `${attachment.description}`);
      data.append('purpose', `${attachment.purpose}`);
      data.append('attachmentFile', file);
      data.append('programId', `${programId}`);

      await mutateAsync(
        { id: programId, docInfo: data },
        {
          onSuccess() {
            toast.success('Document uploaded successfully');
            queryClient.invalidateQueries(['program/syllabus', programId]);
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
          name="purpose">
          Program Syllabus Title
        </InputMolecule>

        <TextAreaMolecule
          value={attachment.description}
          name="description"
          handleChange={handleChange}>
          Syllabus Descripiton
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
