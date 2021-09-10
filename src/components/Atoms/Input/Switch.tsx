import '../../../styles/components/atoms/input/switch.scss';

import React, { useEffect, useState } from 'react';

import { ValueType } from '../../../types';

type PropType = {
  handleChange: (_e: ValueType) => void;
  value?: boolean;
  name: string;
};

/**
 * Switch component will emit `true` when it is `on`, `false` when it is `off`
 */
export default function Switch({
  handleChange,
  value = false,
  name,
  ...attrs
}: PropType) {
  const [active, setActive] = useState(false);

  useEffect(() => setActive(value), []);

  function handleClick(e: ValueType) {
    setActive(!active);
    handleChange(e);
  }
  return (
    <div className="my-switch" {...attrs}>
      <div className="holder">
        <button
          className={`switch-holder ${active && 'active'} outline-none`}
          // @ts-ignore
          onClick={(event) => handleClick({ value, name, event })}>
          <div className={`circle ${active ? 'right' : 'left'}`}></div>
        </button>
      </div>
    </div>
  );
}
