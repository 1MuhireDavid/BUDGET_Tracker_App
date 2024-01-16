import { useEffect, useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


export default function Budget(props) {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editAccountId, setEditAccountId] = useState(null);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const { data, setData, post, processing } = useForm({
    income: '',
    category: '',
    account: '',

  });
  const editAccount = (account) => {
    setEditAccountId(account.id);
    setData({
      aname: account.name,
      value: account.value,
      notes: account.notes,
    });}

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
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">New Budget</h2>}
    >
    <div className='mx-4 space-y-4'>
      <Head title="Budget" />

      <form onSubmit={submitEdit}>
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
    </AuthenticatedLayout>
  );
}
