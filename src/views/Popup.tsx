import React, { useState } from 'react';

import Button from '../components/Atoms/custom/Button';
import Dashboard from '../components/Molecules/Dashboard';
import PopupMolecule from '../components/Molecules/Popup';

export default function Popup() {
  const [open, setOpen] = useState(false);
  const closeModel = () => setOpen(false);
  const openModel = () => setOpen(true);

  return (
    <Dashboard>
      <section>
        <Button onClick={openModel}> show it</Button>
        <PopupMolecule open={open} onClose={closeModel}></PopupMolecule>
      </section>
    </Dashboard>
  );
}
