import { useEffect } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Select from '@/Components/Select';
import { Head, useForm } from '@inertiajs/react';

export default function NewExpense({categorys, accounts}) {
 
  const { data, setData, post, processing } = useForm({
    category: '',
    value: '',
    account: '',
    date: '',
    time: '',
    notes: '',
    senders: '',
    type: 'expense'
    
  });


  const handleOnChange = (event) => {
    if (event.target.name === "category" || event.target.name === "account") {
      // Get the selected category's ID
      const selectedCategoryId = parseInt(event.target.value);
  
      // Update the data with the ID
      setData(event.target.name, selectedCategoryId);
    } else {
      // Update other fields as usual
      setData(event.target.name, event.target.value);
    }
  };

  console.log(data);

  const submit = (e) => {
    e.preventDefault();
    post(route('Transaction.store'), data); // Assuming your API expects the entire data object.
  };

  return (
    <div>
      <Head title="New Expense" />

      <form onSubmit={submit}>
        <div>
          <h3>Category</h3>
          <select id="category" name="category" onChange={handleOnChange} className="mt-1 block w-full">
          <option>Enter Category</option>
            {
              categorys.map((cat,i) => <option value={cat.id} key={i}>{cat.name}</option>)
            }
          </select>
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
          <select id="account" name="account" onChange={handleOnChange} className="mt-1 block w-full">
          <option>Enter Account</option>
            {
              accounts.map((acc,i) => <option key={i} value={acc.id}>{acc.name}</option>)
            }
          </select>
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
            id="senders"
            type="text"
            name="senders"
            value={data.senders}
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
