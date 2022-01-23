/* eslint-disable no-undef */
export interface ActionsType<T> {
  name: string;
  handleAction: (_data?: T[keyof T]) => void;
}
