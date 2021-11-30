import React from 'react';

import Button from '../Atoms/custom/Button';
import Heading from '../Atoms/Text/Heading';
import PopupMolecule from '../Molecules/Popup';

interface IConfirmationProps {
  onProceed: (_input: string) => void;
  onConfirmationClose: () => void;
  loading?: boolean;
  title: string;
  open: boolean;
  id: any;
}

export default function ConfirmationOrganism({
  onProceed,
  loading,
  title,
  open = false,
  onConfirmationClose,
  id,
}: IConfirmationProps) {
  return (
    <PopupMolecule
      closeOnClickOutSide={false}
      open={open}
      title="Do you want to continue?"
      onClose={onConfirmationClose}>
      <div>
        <Heading fontWeight="semibold">{title}</Heading>
        <p className="course-card-description leading-5 pb-6 w-96 text-txt-secondary text-sm mt-4">
          You are about to attempt this {title} test. Are you sure you want to do it now ?
          This action is irreversible.
        </p>

        <div className="flex justify-starg">
          <Button disabled={loading} onClick={() => onProceed(id)}>
            <span className="font-semibold">Start Evaluation</span>
          </Button>
        </div>
      </div>
    </PopupMolecule>
  );
}
