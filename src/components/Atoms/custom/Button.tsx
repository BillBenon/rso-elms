import React, { ReactNode } from 'react';

type ButtonType = 'fill' | 'outlined' | 'text';
type ButtonStyleType = {
  // eslint-disable-next-line no-unused-vars
  [index in ButtonType]: string;
};

interface PropTypes {
  children: ReactNode;
  type: ButtonType;
}

// button type
// color type
// width type

export default function Button({ children, type }: PropTypes) {
  const buttonStyle: ButtonStyleType = {
    fill: 'bg-primary text-main',
    outlined: 'border border-solid border-primary text-primary',
    text: '',
  };
  return <button className={`${buttonStyle[type]} py-3 px-6`}> {children} </button>;
}
