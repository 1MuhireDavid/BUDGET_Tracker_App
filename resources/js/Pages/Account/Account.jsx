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
export default function Account(props) {
  const { budgets } = usePage().props; 
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const { data, setData, post, processing } = useForm({
    aname: '',
    value: '',
    notes: '',
  });

  const handleOnChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('Account.store'), data); // Assuming your API expects the entire data object.
  };

  return (
    <AuthenticatedLayout
    auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Budget</h2>}
    
    >
      
    <div className='mx-4 space-y-4'>
    <Head title="Category" />
      <h1>Category</h1>

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
          <h3>Name</h3>
          <TextInput
            id="aname"
            type="text"
            name="aname"
            value={data.aname}
            className="mt-1 block w-full"
            onChange={handleOnChange}
          />
        </div>

        <div className="mt-4">
          <h3>Initial amount</h3>
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
