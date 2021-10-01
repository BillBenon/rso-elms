import React from 'react';
import { ReactSVG } from 'react-svg';
import styled, { css } from 'styled-components';

import { bgStyle } from '../../../global/global-vars';
import { Color, colorStyleType, IconType } from '../../../types';
type IProps = {
  name: IconType;
  size?: number;
  fill?: Color;
  stroke?: Color;
  transform?: string;
  bgColor?: Color;
  useheightandpadding?: boolean;
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
    ${({ transform }: IProps) =>
      transform &&
      css`
        transform: ${transform};
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
  transform = '',
  size = 24,
  bgColor,
  useheightandpadding = true,
}: IProps) {
  return (
    <div
      className={`${bgColor && bgStyle[bgColor]}  ${
        size > 16 && useheightandpadding ? 'w-12 h-12 p-4' : 'w-8 h-8 p-4'
      } flex items-center justify-center rounded-lg`}>
      <StyledSVGIcon
        src={`/icons/${name}.svg`}
        stroke={stroke}
        transform={transform}
        fill={fill}
        size={size}
        useheightandpadding={useheightandpadding}
      />
    </div>
  );
}
