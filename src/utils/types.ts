export type InputFieldProps = {
  icon: React.ElementType;
  type: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  showToggle?: boolean;
  onToggle?: () => void;
  showPassword?: boolean;
};