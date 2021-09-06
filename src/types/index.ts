export type Color =
  | 'primary'
  | 'secondary'
  | 'main'
  | 'error'
  | 'warning'
  | 'success'
  | 'txt-primary'
  | 'txt-secondary';

export type fontSize = 'xs' | 'sm' | 'tiny' | 'lg' | '2xl';
export type width = 'default' | 'full';
export type fontWeight = 'normal' | 'medium' | 'bold';

export type colorStyleType = {
  // eslint-disable-next-line no-unused-vars
  [index in Color]?: string;
};

export type bgStyleType = {
  // eslint-disable-next-line no-unused-vars
  [index in Color]?: string;
};

export type fontWeightStyleType = {
  // eslint-disable-next-line no-unused-vars
  [index in fontWeight]: string;
};

export type fontSizeStyleType = {
  // eslint-disable-next-line no-unused-vars
  [index in fontSize]: string;
};

export interface Link {
  icon?: string;
  title: string;
  to: string;
}

export interface SelectData {
  value: string;
  label: string;
}
