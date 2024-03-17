export type ComboBox = {
  value: string | number;
  label: string | number;
};

export type SelectPropTypes = {
  options: ComboBox[] | Array<string | number>;
};
