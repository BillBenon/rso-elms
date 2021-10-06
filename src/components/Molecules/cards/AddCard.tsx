import React from 'react';

import Icon from '../../Atoms/custom/Icon';
import Heading from '../../Atoms/Text/Heading';

interface IProps {
  title: string;
  onClick: () => void;
}
export default function AddCard({ title, onClick }: IProps) {
  return (
    <button
      className="block w-72 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer"
      onClick={onClick}>
      <div className="flex justify-center items-center flex-col h-48">
        <Icon
          name="add"
          size={16}
          stroke="primary"
          className="rounded-full border-2 border-primary-500"
        />
        <Heading color="primary" fontSize="base" fontWeight="normal" className="py-2">
          {title}
        </Heading>
      </div>
    </button>
  );
}
