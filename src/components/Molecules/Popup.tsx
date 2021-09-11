import '../../styles/components/molecules/popup.scss';

import React, { ReactNode } from 'react';
import Popup from 'reactjs-popup';

import Icon from '../Atoms/custom/Icon';

type PropType = {
  open: boolean;
  children: ReactNode;
  onClose: () => void;
};

export default function PopupMolecule({ open, onClose, children }: PropType) {
  return (
    <Popup open={open} closeOnDocumentClick onClose={onClose} modal>
      <div className="modal block p-2">
        {/* close button  */}
        <div className="flex justify-end">
          <button className="close" onClick={onClose}>
            <Icon size={12} bgColor="txt-secondary" name="close" />
          </button>
        </div>
        {/* content to be renderd in the popup */}
        {children}
      </div>
    </Popup>
  );
}
