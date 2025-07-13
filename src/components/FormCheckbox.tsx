import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

type FormCheckboxProps = {
  name: string;
  label?: string;
  defaultValue?: string;
  className?: string;
};

function FormCheckbox({
  name,
  label,
  defaultValue,
  className,
}: FormCheckboxProps) {
  const defaultChecked = defaultValue === 'on';

  return (
    <div
      className={`mb-4 flex items-center justify-between gap-3 ${
        className ?? ''
      }`}
    >
      <Label
        htmlFor={name}
        className="capitalize text-gray-800 dark:text-gray-200 font-medium select-none"
      >
        {label || name}
      </Label>

      <Checkbox
        id={name}
        name={name}
        defaultChecked={defaultChecked}
        className="h-5 w-5 rounded border-gray-300 dark:border-gray-600
                   checked:bg-blue-600 checked:border-blue-600
                   focus-visible:ring-2 focus-visible:ring-blue-400
                   transition-colors duration-200 cursor-pointer"
      />
    </div>
  );
}

export default FormCheckbox;
