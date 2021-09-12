import React from 'react';

import Icon from '../Atoms/custom/Icon';

type PropType = {
  list: string[];
};
export default function Cacumber({ list }: PropType) {
  return (
    <div>
      <div className="flex pl-4">
        {list.map((cuc, i) => (
          <div className=" flex items-center" key={i}>
            <div className="text-txt-secondary">{cuc}</div>
            {i !== list.length - 1 && <Icon size={10} name="chevron-right" />}
          </div>
        ))}
      </div>
    </div>
  );
}
