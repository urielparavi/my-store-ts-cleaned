import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export enum Mode {
  SingleProduct = 'singleProduct',
  CartItem = 'cartItem',
}

type SelectProductAmountProps = {
  mode: Mode.SingleProduct;
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
};

type SelectCartItemAmountProps = {
  mode: Mode.CartItem;
  amount: number;
  setAmount: (value: number) => void;
};

function SelectProductAmount({
  mode,
  amount,
  setAmount,
}: SelectProductAmountProps | SelectCartItemAmountProps) {
  const isCartItem = mode === Mode.CartItem;
  const maxOptions = isCartItem ? amount + 10 : 10;

  return (
    <div className="flex flex-col">
      <label
        htmlFor="select-amount"
        className="mb-2 font-medium text-gray-900 dark:text-gray-100 select-none"
      >
        Amount:
      </label>
      <Select
        defaultValue={amount.toString()}
        onValueChange={(value) => setAmount(Number(value))}
      >
        <SelectTrigger
          id="select-amount"
          className={`transition-shadow duration-300 rounded-md ${
            isCartItem ? 'w-[75px]' : 'w-[150px]'
          } shadow-sm hover:shadow-md focus:shadow-lg`}
          aria-label="Select amount"
        >
          <SelectValue placeholder={amount.toString()} />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: maxOptions }, (_, index) => {
            const selectValue = (index + 1).toString();
            return (
              <SelectItem key={selectValue} value={selectValue}>
                {selectValue}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectProductAmount;
