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
        <PopupMolecule open={open} onClose={closeModel}>
          <div className="w-60">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni omnis
            delectus nemo, maxime molestiae dolorem numquam mollitia, voluptate ea,
            accusamus excepturi deleniti ratione sapiente! Laudantium, aperiam doloribus.
            Odit, aut.
          </div>
        </PopupMolecule>
      </section>
    </Dashboard>
  );
}
