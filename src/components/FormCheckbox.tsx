import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

// Props for the FormCheckbox component
type FormCheckboxProps = {
  name: string; // The name of the checkbox input (used as the query param key)
  label?: string; // Optional label to display next to the checkbox
  defaultValue?: string; // Default value (from URL query params, e.g., 'on')
};

function FormCheckbox({ name, label, defaultValue }: FormCheckboxProps) {
  // Determine if the checkbox should be checked on initial render
  // In HTML forms, if a checkbox is checked when submitted, the value sent is "on" by default
  // So we check if defaultValue is 'on' and convert it to a boolean
  const defaultChecked = defaultValue === 'on' ? true : false;

  return (
    <div className="mb-2 flex justify-between self-end">
      {/* Label for the checkbox, linked via htmlFor */}
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>

      {/* 
        Checkbox input with name and id.
        When the form is submitted:
        - If the checkbox is checked → it sends shipping=on
        - If not checked → it does not send anything at all for this field
        This is the default HTML form behavior

        On the server side:
        - You can check if (req.query.shipping === 'on')
        - If so, filter only products with shipping: true
        Example in Express:
          if (req.query.shipping === 'on') {
            filter.shipping = true;
          }
      */}
      <Checkbox id={name} name={name} defaultChecked={defaultChecked} />
    </div>
  );
}

export default FormCheckbox;
