import React from 'react';
import Popup from 'reactjs-popup';

import Icon from '../Atoms/custom/Icon';

type PropType = {
  open: boolean;
  onClose: () => void;
};

export default function PopupMolecule({ open, onClose }: PropType) {
  return (
    <Popup open={open} closeOnDocumentClick onClose={onClose} modal>
      <div className="modal">
        <button className="close" onClick={onClose}>
          <Icon name="close" />
        </button>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni omnis
        delectus nemo, maxime molestiae dolorem numquam mollitia, voluptate ea, accusamus
        excepturi deleniti ratione sapiente! Laudantium, aperiam doloribus. Odit, aut.
      </div>
    </Popup>
  );
}
