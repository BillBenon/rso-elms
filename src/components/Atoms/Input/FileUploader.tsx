/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ChangeEvent, ReactNode, useRef, useState } from 'react';

import Error from '../../Atoms/Text/Error';

interface IProps {
  maxNumberOfFiles?: number;
  maxFileSizeInBytes?: number;
  allowPreview?: boolean;
  accept: string;
  handleUpload: (_files: FileList | null) => any;
  children: ReactNode;
  error?: string;
  handleBlur?: () => void;
}

export default function FileUploader(props: IProps) {
  const fileInputField = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<FileList | null>();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
    props.handleUpload(e.target.files);
  };

  return (
    <>
      <input
        type="file"
        className="hidden"
        ref={fileInputField}
        onChange={changeHandler}
        onBlur={props.handleBlur}
        accept={props.accept}
      />
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => fileInputField.current?.click()}
        className="inline-block">
        {props.children}
      </div>
      {files && files[0] && (
        <div className="py-2 text-sm font-semibold">{files[0].name}</div>
      )}
      <Error>{props.error && props.error}</Error>
    </>
  );
}
