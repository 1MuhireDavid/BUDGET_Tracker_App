import { useEffect, useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import TextInput from '@/Components/TextInput';
import { Head, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react'
import Modal from '@/Components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import Progress from '@/Components/Progress';
export default function IndexBudget(props) {
  const { budgets} = usePage().props; 
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const { data, setData, post, processing } = useForm({
    income: '',
    category: '',
    account: '',

  });

  const handleOnChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('Budget.store'));
  };
  return (
    <AuthenticatedLayout
    auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Budget</h2>}
    
    >
      
    <div className='mx-4 space-y-4'>
      <Head title="Budget" />
      {budgets.map((budget) => (
        <div className="bg-white">
        <div className="flex justify-between items-center h-14  m-3 p-2 rounded-lg" key={budget.id} >
          <div className="">
          <p>{budget.category}</p>
          <p>{budget.account}</p>
          </div>
          <div className="text-end">
          <p>{budget.value}</p>
          </div>
        </div>
          <Progress progress={10}/>
        </div>
      ))}
    </div>
    <div className="absolute bottom-4 right-8 bottom-9 fixed">
    <button onClick={toggleModal}><FontAwesomeIcon icon={faCirclePlus} className="w-12 h-12 mr-2 fa-4x" /></button>
      <Modal show={showModal} onClose={toggleModal}>
      <div className='mx-4 space-y-4'>
      <Head title="Budget" />

      <form onSubmit={submit}>
        <div>
          <h3>Budget amount</h3>
          <TextInput
            id="income"
            type="number"
            name="income"
            value={data.income}
            className="mt-1 block w-full"
            onChange={handleOnChange}
          />
        </div>

        <div className="mt-4">
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
