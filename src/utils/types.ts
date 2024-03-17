export type ComboBox = {
  value: string | number;
  label: string | number;
};

export type SelectPropTypes = {
  options: ComboBox[] | Array<string | number>;
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  className?: string;
};
