import { useEffect } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function NewExpense() {
  const { data, setData, post, processing } = useForm({
    category: '',
    value: '',
    account: '',
    date: '',
    time: '',
    notes: '',
    to: '',
  });

  const handleOnChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('Expense.store'), data); // Assuming your API expects the entire data object.
  };

  return (
    <div>
      <Head title="New Expense" />

      <form onSubmit={submit}>
        <div>
          <h3>Category</h3>
          <TextInput
            id="category"
            type="text"
            name="category"
            value={data.category}
            className="mt-1 block w-full"
            onChange={handleOnChange}
          />
        </div>

        <div className="mt-4">
          <h3>Value</h3>
          <TextInput
            id="value"
            type="number"
            name="value"
            value={data.value}
            className="mt-1 block w-full"
            onChange={handleOnChange}
          />
        </div>

        <div className="mt-4">
          <h3>Account</h3>
          <TextInput
            id="account"
            type="text"
            name="account"
            value={data.account}
            className="mt-1 block w-full"
            onChange={handleOnChange}
          />
        </div>

        <div className="mt-4">
          <h3>Date</h3>
          <TextInput
            id="date"
            type="date"
            name="date"
            value={data.date}
            className="mt-1 block w-full"
            onChange={handleOnChange}
          />
        </div>

        <div className="mt-4">
          <h3>Time</h3>
          <TextInput
            id="time"
            type="time"
            name="time"
            value={data.time}
            className="mt-1 block w-full"
            onChange={handleOnChange}
          />
        </div>

        <div className="mt-4">
          <h3>Notes</h3>
          <TextInput
            id="notes"
            type="text"
            name="notes"
            value={data.notes}
            className="mt-1 block w-full"
            onChange={handleOnChange}
          />
        </div>
        <div className="mt-4">
          <h3>To</h3>
          <TextInput
            id="to"
            type="text"
            name="to"
            value={data.to}
            className="mt-1 block w-full"
            onChange={handleOnChange}
          />
        </div>

        <div className="flex items-center justify-end mt-4">
          <PrimaryButton className="ml-4" disabled={processing}>
            Save
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}
