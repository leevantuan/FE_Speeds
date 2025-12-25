// eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-explicit-any
export type AppOption<T = any> = {
  label: string;
  value: T;
  disabled?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/consistent-type-definitions
export type AppKVOption<T = any> = {
  label: string;
  value: T;
  disabled?: boolean;
};
