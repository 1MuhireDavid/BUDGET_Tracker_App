import { useEffect, useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import TextInput from '@/Components/TextInput';
import { Head, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react'
import Modal from '@/Components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
export default function Expense(props) {
  const { budgets} = usePage().props; 
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

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

  console.log(data);

  const submit = (e) => {
    e.preventDefault();

    post(route('Expense.store'), data); // Assuming your API expects the entire data object.
  };

  return (
    <AuthenticatedLayout
    auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Budget</h2>}
    
    >
      
    <div className='mx-4 space-y-4'>
    <Head title="Category" />
      <h1>Expense</h1>

      {/* Render the budget data */}
      {budgets.map((budget) => (
        <div key={budget.id} >
        <h3><Link href={route('Budget.show', budget.id)}>{budget.category}</Link></h3>
          <p>{budget.account}</p>
          <p>{budget.value}</p>
        </div>
      ))}
    </div>
    <div className="absolute bottom-4 right-4 bottom-3 fixed">
    <button onClick={toggleModal}><FontAwesomeIcon icon={faPlus} className="w-6 h-6 mr-2" /></button>
      <Modal show={showModal} onClose={toggleModal}>
      <div className='mx-4 space-y-4'>
      <Head title="Budget" />

      <form onSubmit={submit}>
        <div>
          <h3>Category</h3>
          <select id="category" name="category" onChange={handleOnChange} className="mt-1 block w-full">
          <option>Enter Category</option>
            {
              categorys.map((cat,i) => <option key={i}>{cat.name}</option>)
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
              accounts.map((acc,i) => <option key={i}>{acc.name}</option>)
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
          </Modal>
          </div>
    </AuthenticatedLayout>
  );
}
