import '../../../styles/components/atoms/input/switch.scss';

import React, { MouseEvent, useEffect, useState } from 'react';

type PropType = {
  handleChange: (_active: boolean, _event: MouseEvent<HTMLButtonElement>) => void;
  value?: boolean;
};

/**
 * Switch component will emit `true` when it is `on`, `false` when it is `off`
 */
export default function Switch({ handleChange, value = false, ...attrs }: PropType) {
  const [active, setActive] = useState(false);

  useEffect(() => setActive(value), []);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    setActive(!active);
    handleChange(active, e);
  }
  return (
    <div className="my-switch" {...attrs}>
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
