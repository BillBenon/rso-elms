import React, { useRef, useState } from 'react';

interface IProps {
  maxNumberOfFiles?: number;
  maxFileSizeInBytes?: number;
  allowPreview: boolean;
  accept?: string;
  handleUpload: () => any;
}

export default function FileUploader() {
  const fileInputField = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState({});

  return (
    <div>
      <input type="file" ref={fileInputField} />
    </div>
  );
}
