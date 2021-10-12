import React from 'react';

import { Link } from '../../types';
import Icon from '../Atoms/custom/Icon';

type PropType = {
  list: Link[];
};
export default function Cacumber({ list }: PropType) {
  return (
    <div>
      <div className="flex ">
        {list.map((link, i) => (
          <a href={link.to} className=" flex items-center" key={i}>
            <div className="text-txt-secondary capitalize">{link.title}</div>
            {i !== list.length - 1 && <Icon size={20} name="chevron-right" />}
          </a>
        ))}
      </div>
    </div>
  );
}
