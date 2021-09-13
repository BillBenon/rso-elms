import React, { useState } from 'react';

import Button from '../components/Atoms/custom/Button';
import Dashboard from '../components/Molecules/Dashboard';
import PopupMolecule from '../components/Molecules/Popup';

export default function Popup() {
  const [open, setOpen] = useState(false); // state to controll the popup
  const closeModel = () => setOpen(false); // when this is fired the popup will be closed
  const openModel = () => setOpen(true); // when this is fired the popup will be oponed

  return (
    <Dashboard>
      <section>
        <Button onClick={openModel}> show it</Button>

        {/* start of popup, anything you enter inside will be visible as long us open === true, 
        no need to add close button it is automatically handled inside this molecule */}
        <PopupMolecule open={open} onClose={closeModel}>
          <div className="w-60">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni omnis
            delectus nemo, maxime molestiae dolorem numquam mollitia, voluptate ea,
            accusamus excepturi deleniti ratione sapiente! Laudantium, aperiam doloribus.
            Odit, aut.
          </div>
        </PopupMolecule>
        {/* end of popup */}
      </section>
    </Dashboard>
  );
}
