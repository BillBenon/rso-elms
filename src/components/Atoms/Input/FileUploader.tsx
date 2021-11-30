import React, { useRef, useState } from 'react';
import { ChangeEvent, ReactNode } from 'react-router/node_modules/@types/react';

interface IProps {
  maxNumberOfFiles?: number;
  maxFileSizeInBytes?: number;
  allowPreview?: boolean;
  accept: string;
  handleUpload: (_files: FileList | null) => any;
  children: ReactNode;
}

export default function FileUploader(props: IProps) {
  const fileInputField = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<FileList | null>();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
    props.handleUpload(e.target.files);
  };

  return (
    <div>
      <input
        type="file"
        className="hidden"
        ref={fileInputField}
        onChange={changeHandler}
        accept={props.accept}
      />
      <div onClick={() => fileInputField.current?.click()} className="inline-block">
        {props.children}
      </div>
      {files && files[0] && (
        <div className="py-2 text-sm font-semibold">{files[0].name}</div>
      )}
    </div>
  );
}
