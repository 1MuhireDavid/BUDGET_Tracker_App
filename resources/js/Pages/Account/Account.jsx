import { useEffect, useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import TextInput from '@/Components/TextInput';
import { Head, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react'
import Modal from '@/Components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus,faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
export default function Account(props) {
  const { accounts } = usePage().props; 
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editAccountId, setEditAccountId] = useState(null);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
  };
  const { data, setData, post, processing,delete: destroy, patch  } = useForm({
    aname: '',
    value: '', 
    notes: '',
  });
  const editAccount = (account) => {
    setEditAccountId(account.id);
    setData({
      aname: account.name,
      value: account.value,
      notes: account.notes,
    });
    console.log(account);
    toggleEditModal();
  };
  
  const submitEdit = async (e) => {
    console.log(editAccountId);
    e.preventDefault();
    try {
      await patch(route('Account.update', editAccountId));
      toggleEditModal();
      // Optionally, you can update the UI by fetching the updated data from the server
      // and setting it in the component state
    } catch (error) {
      console.error(`Error updating Account with id ${editAccountId}`, error);
    }
  };
  const deleteAccount = async(accountId) => {
    // Implement delete functionality (e.g., send a request to delete the Account from the database)
    try {
      await destroy(route('Account.destroy', accountId));
      // Optionally, you can update the UI by removing the deleted Account from the local state
      // For example, if using React useState hook, you can filter out the deleted Account
      const updatedAccounts = accounts.filter((account) => account.id !== accountId);
      setData(updatedAccounts); // Assuming you have a setData method to update state
    } catch (error) {
      console.error(`Error deleting Account with id ${accountId}`, error);
    }
  };

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
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Accounts</h2>}
    
    >
      {props.success&&alert("account updated successfully")}
      
    <div className='mx-4 space-y-4'>
    <Head title="Category" />
      <h1>My accounts</h1>

      {/* Render the Account data */}
      {props.accounts.map((account) => (
        <div className="bg-white">
        <div className="flex justify-between items-center h-14  m-3 p-2 rounded-lg" key={Account.id} >
          <div className="">
          <p>{account.name}</p>
          <p>{account.notes}</p>
          
          </div>
          <div className="text-end">
          <p>{account.value}</p>
          </div>
          <div className="flex items-center space-x-4">
                <button onClick={() => editAccount(account)}>
                  <FontAwesomeIcon icon={faEdit} className="text-blue-500 cursor-pointer" />
                </button>
                <button onClick={() => deleteAccount(account.id)}>
                  <FontAwesomeIcon icon={faTrash} className="text-red-500 cursor-pointer" />
                </button>
              </div>
        </div>
        </div>
      ))}
    </div>
    <div className="absolute bottom-4 right-4 bottom-3 fixed">
    <button onClick={toggleModal}><FontAwesomeIcon icon={faCirclePlus} className="w-6 h-6 mr-2" /></button>
      <Modal show={showModal} onClose={toggleModal}>
      <div className='mx-4 space-y-4'>
      <Head title="account" />

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
      <Modal show={showEditModal} onClose={toggleEditModal}>
      <div className='mx-4 space-y-4'>
      <Head title="account" />

      <form onSubmit={submitEdit}>
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