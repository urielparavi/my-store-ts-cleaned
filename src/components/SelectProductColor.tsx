// Define the props type for the component
type SelectProductColorProps = {
  colors: string[]; // Array of available color options (e.g., ['#33FF57', '#3366FF'])
  productColor: string; // Currently selected color
  setProductColor: React.Dispatch<React.SetStateAction<string>>;
  // This type represents the updater function from React's useState hook.
  // It accepts either a new string value or a function that receives the current state and returns a new value.
  // We use this type because the setter function is passed as a prop to update the selected color.
};

// Functional component that renders color selection buttons
function SelectProductColor({
  colors,
  productColor,
  setProductColor,
}: SelectProductColorProps) {
  return (
    <div className="mt-6">
      {/* Section heading */}
      <h4 className="text-md font-medium tracking-wider capitalize">colors</h4>

      {/* Container for color buttons */}
      <div className="mt-2">
        {colors.map((color) => {
          return (
            <button
              key={color}
              type="button" // Ensure it's not treated as a form submit button
              className={`rounded-full w-6 h-6 mr-2 border-2 ${
                color === productColor ? 'border-primary' : 'border-transparent'
              }`} // Adds border if the color is selected, otherwise transparent border
              style={{ backgroundColor: color }} // Sets the background to the current color
              onClick={() => setProductColor(color)} // Update selected color on click
            ></button>
          );
        })}
      </div>
    </div>
  );
}

export default SelectProductColor;
