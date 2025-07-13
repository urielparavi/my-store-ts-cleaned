import { Input } from './ui/input';
import { Label } from './ui/label';

type FormInputProps = {
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
  autoComplete?: string;
  className?: string;
};

function FormInput({
  label,
  name,
  type,
  defaultValue,
  autoComplete,
  className,
}: FormInputProps) {
  return (
    <div className={`mb-2 ${className ?? ''}`}>
      <Label
        htmlFor={name}
        className="capitalize text-sm font-medium text-muted-foreground mb-1"
      >
        {label || name}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
      />
    </div>
  );
}

export default FormInput;
