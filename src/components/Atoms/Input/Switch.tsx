import '../../../styles/components/atoms/custom/switch.scss';

import React, { MouseEvent, useState } from 'react';

type PropType = {
  handleChange: (_active: boolean, _event: MouseEvent<HTMLButtonElement>) => void;
};

export default function Switch({ handleChange }: PropType) {
  const [active, setActive] = useState(false);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    setActive(!active);
    handleChange(active, e);
  }
  return (
    <div className="my-switch">
      <div className="holder">
        <button
          className={`switch-holder ${active && 'active'} outline-none`}
          onClick={handleClick}>
          <div className={`circle ${active ? 'right' : 'left'}`}></div>
        </button>
      </div>
    </div>
  );
}
