import '../../styles/components/Molecules/popup.scss';

import React, { ReactNode } from 'react';
import Popup from 'reactjs-popup';

import Icon from '../Atoms/custom/Icon';
import Heading from '../Atoms/Text/Heading';

type PropType = {
  open: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
};

export default function PopupMolecule({ open, title, onClose, children }: PropType) {
  return (
    <Popup open={open} closeOnDocumentClick onClose={onClose} modal>
      <div className="modal block pt-9 px-8 py-16">
        {/* close button  */}
        <div className={`flex pb-8 ${title ? 'justify-between' : 'justify-end'}`}>
          {title && (
            <Heading fontWeight="semibold" color="primary">
              {title}
            </Heading>
          )}

          <button className="close self-end" onClick={onClose}>
            <Icon size={12} bgColor="tertiary" name="close" />
          </button>
        </div>
        {/* content to be renderd in the popup */}
        {children}
      </div>
    </Popup>
  );
}
