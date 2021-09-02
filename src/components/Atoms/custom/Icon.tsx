import React from 'react';
import { ReactSVG } from 'react-svg';

import notification from './icons/notification.svg';

type IProps = {
  name: string;
};

export default function Icon({ name }: IProps) {
  console.log(require(notification));
  return (
    <div>
      <ReactSVG src={`/icons/${name}.svg`} />
    </div>
  );
}
