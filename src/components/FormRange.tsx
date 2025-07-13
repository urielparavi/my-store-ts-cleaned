import { formatAsDollars } from '@/utils';
import { useState } from 'react';

import { Label } from '@/components/ui/label';
import { Slider } from './ui/slider';

// Define the props type for the component
type FormRangeProps = {
  name: string; // Name of the input field (used for htmlFor, id, and form submission)
  label?: string; // Optional label text (falls back to name if not provided)
  defaultValue?: string; // Optional default value as a string (usually from query params)
};

function FormRange({ name, label, defaultValue }: FormRangeProps) {
  const step = 1000; // Slider step size - changes value by 1000 units (e.g. cents)
  const maxPrice = 100000; // Maximum slider value (100,000 cents = $1,000)

  // Convert the defaultValue from string to number; use maxPrice if defaultValue is not
  // provided
  const defaultPrice = defaultValue ? Number(defaultValue) : maxPrice;

  // Use React state to store the selected price, initialized with defaultPrice
  const [selectedPrice, setSelectedPrice] = useState(defaultPrice);

  return (
    <div className="mb-2">
      {/* Label for the slider input showing either the label or the name, plus the formatted selected price */}
      <Label htmlFor={name} className="capitalize flex justify-between">
        {label || name} {/* Show label if provided, else fallback to name */}
        <span>{formatAsDollars(selectedPrice)}</span>
        {/* Display the selected price formatted as dollars */}
      </Label>

      {/* Slider component with configuration */}
      <Slider
        id={name} // Unique identifier (linked to label via htmlFor)
        name={name} // Name attribute for form submission and identification
        step={step} // Step size for slider increments (1000 units)
        max={maxPrice} // Maximum slider value (100000 units)
        value={[selectedPrice]} // Current value as an array (because slider supports range
        // with multiple handles)
        onValueChange={(value) => setSelectedPrice(value[0])}
        // Event handler that receives an array of values on change; updates state with the
        // first value
        className="mt-4"
      />
    </div>
  );
}
export default FormRange;
