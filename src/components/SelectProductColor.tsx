type SelectProductColorProps = {
  colors: string[];
  productColor: string;
  setProductColor: React.Dispatch<React.SetStateAction<string>>;
};

function SelectProductColor({
  colors,
  productColor,
  setProductColor,
}: SelectProductColorProps) {
  return (
    <div className="mt-6">
      <h4 className="text-md font-semibold tracking-wide capitalize text-gray-900 dark:text-gray-100">
        Colors
      </h4>

      <div className="mt-3 flex flex-wrap gap-3">
        {colors.map((color) => {
          const isSelected = color === productColor;
          return (
            <button
              key={color}
              type="button"
              aria-pressed={isSelected}
              className={`
                rounded-full
                w-8 h-8
                transition
                shadow-sm
                focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-primary
                ${
                  isSelected
                    ? 'ring-4 ring-offset-2 ring-primary shadow-lg'
                    : 'ring-1 ring-gray-300 hover:ring-gray-400 dark:ring-gray-600 dark:hover:ring-gray-400'
                }
                hover:scale-110 active:scale-95
                cursor-pointer
              `}
              style={{ backgroundColor: color }}
              onClick={() => setProductColor(color)}
              title={color}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SelectProductColor;
