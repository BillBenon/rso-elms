import React from 'react';
import { ReactSVG } from 'react-svg';
import styled, { css } from 'styled-components';

import { bgStyle } from '../../../global/global-vars';
import { Color, colorStyleType } from '../../../types';

type IProps = {
  name: string;
  size?: number;
  color?: Color;
  bgColor?: Color;
};

const iconStyle: colorStyleType = {
  primary: '#2337CC',
  error: '#EF4444',
  warning: 'FACD23',
  success: '#3CD278',
};

const StyledSVGIcon = styled(ReactSVG)`
  svg {
    fill: black;
    ${({ size }: IProps) =>
      size &&
      css`
        width: ${size}px;
        height: ${size}px;
      `}
    path {
      ${({ color }: IProps) =>
        color &&
        css`
          fill: ${iconStyle[color]};
        `}
    }
  }
`;

export default function Icon({ name, color, size = 24, bgColor }: IProps) {
  return (
    <div
      className={`${bgColor && bgStyle[bgColor]}  ${
        size > 16 ? 'w-12 h-12' : 'w-8 h-8'
      }  p-4 flex items-center justify-center rounded-lg`}>
      <StyledSVGIcon src={`/icons/${name}.svg`} color={color} size={size} />
    </div>
  );
}
