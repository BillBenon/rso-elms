import React from 'react';
import { ReactSVG } from 'react-svg';
import styled, { css } from 'styled-components';

import { bgStyle } from '../../../global/global-vars';
import { Color, colorStyleType } from '../../../types';
type IProps = {
  name: string;
  size?: number;
  fill?: Color;
  stroke?: Color;
  bgColor?: Color;
};
const iconStyle: colorStyleType = {
  primary: '#2337CC',
  error: '#EF4444',
  warning: '#FACD23',
  success: '#3CD278',
  'txt-secondary': '#949ca5',
};
const StyledSVGIcon = styled(ReactSVG)`
  svg {
    ${({ size }: IProps) =>
      size &&
      css`
        width: ${size}px;
        height: ${size}px;
      `}
    path,circle {
      ${({ stroke }: IProps) =>
        stroke &&
        css`
          stroke: ${iconStyle[stroke]};
        `}
      ${({ fill }: IProps) =>
        fill &&
        css`
          fill: ${iconStyle[fill]};
        `}
    }
  }
`;

export default function Icon({
  name,
  fill = 'none',
  stroke = 'none',
  size = 24,
  bgColor,
}: IProps) {
  return (
    <div
      className={`${bgColor && bgStyle[bgColor]}  ${
        size > 16 ? 'w-12 h-12' : 'w-8 h-8'
      }  p-4 flex items-center justify-center rounded-lg`}>
      <StyledSVGIcon src={`/icons/${name}.svg`} stroke={stroke} fill={fill} size={size} />
    </div>
  );
}
