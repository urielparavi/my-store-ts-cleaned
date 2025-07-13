import { Form, useLoaderData, Link } from 'react-router-dom';
import { Button } from './ui/button';
import { type ProductsResponseWithParams } from '@/utils';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormRange from './FormRange';
import FormCheckbox from './FormCheckbox';

function Filters() {
  const { meta, params } = useLoaderData() as ProductsResponseWithParams;
  const { search, company, category, shipping, order, price } = params;

  return (
    <Form className="rounded-2xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 shadow-sm">
      <FormInput
        type="search"
        label="Search product"
        name="search"
        defaultValue={search}
        className="col-span-1"
      />
      <FormSelect
        label="Select category"
        name="category"
        options={meta.categories}
        defaultValue={category}
        className="col-span-1"
      />
      <FormSelect
        label="Select company"
        name="company"
        options={meta.companies}
        defaultValue={company}
        className="col-span-1"
      />
      <FormSelect
        label="Order by"
        name="order"
        options={['a-z', 'z-a', 'high', 'low']}
        defaultValue={order}
        className="col-span-1"
      />
      <FormRange
        label="Price"
        name="price"
        defaultValue={price}
        className="col-span-1"
      />
      <FormCheckbox
        label="Free shipping"
        name="shipping"
        defaultValue={shipping}
        className="col-span-1 self-end"
      />
      <Button
        type="submit"
        size="sm"
        className="col-span-1 self-end bg-orange-500 hover:bg-orange-600 text-white"
      >
        Search
      </Button>
      <Button
        type="button"
        asChild
        size="sm"
        variant="outline"
        className="col-span-1 self-end border-gray-400 dark:border-zinc-600 text-gray-800 dark:text-gray-200"
      >
        <Link to="/products">Reset</Link>
      </Button>
    </Form>
  );
}

export default Filters;
