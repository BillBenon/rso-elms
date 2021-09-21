import '../../../styles/components/Atoms/input/switch.scss';

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

  function handleClick(e: any) {
    setActive(!active);
    handleChange({ value: active, name, event: e });
  }
  return (
    <div className="my-switch" {...attrs}>
      <div className="holder">
        <button
          className={`switch-holder ${active && 'active'} outline-none`}
          // @ts-ignore
          onClick={handleClick}>
          <div className={`circle ${active ? 'right' : 'left'}`}></div>
        </button>
      </div>
    </div>
  );
}
