import { formatAsDollars } from '@/utils';
import { useState } from 'react';

import { Label } from '@/components/ui/label';
import { Slider } from './ui/slider';

type FormRangeProps = {
  name: string;
  label?: string;
  defaultValue?: string;
  className?: string;
};

function FormRange({ name, label, defaultValue, className }: FormRangeProps) {
  const step = 1000;
  const maxPrice = 100000;
  const defaultPrice = defaultValue ? Number(defaultValue) : maxPrice;
  const [selectedPrice, setSelectedPrice] = useState(defaultPrice);

  return (
    <div className={`mb-6 ${className ?? ''}`}>
      <Label
        htmlFor={name}
        className="capitalize flex justify-between items-center font-medium text-gray-800 dark:text-gray-200 select-none"
      >
        <span className="text-base">{label || name}</span>
        <span className="text-sm font-semibold text-blue-gray-600 dark:text-blue-gray-400">
          {formatAsDollars(selectedPrice)}
        </span>
      </Label>

      <Slider
        id={name}
        name={name}
        step={step}
        max={maxPrice}
        value={[selectedPrice]}
        onValueChange={(value) => setSelectedPrice(value[0])}
        className="mt-3 h-2 rounded-lg bg-gray-200 dark:bg-gray-700 accent-blue-600 transition-colors duration-200"
      />
    </div>
  );
}

export default FormRange;
