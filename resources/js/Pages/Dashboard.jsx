import React, { useState, } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, usePage } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus,faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PieChart, Pie, Tooltip } from 'recharts';

export default function Dashboard(props) {
  console.log(props);

  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  
  const { data, setData, post, processing } = useForm({
    category: '',
    income: '',
    account: '',
    date: '',
    time: '',
    notes: '',
    senders: '',
    type: ''
  });
  const toggleModal = () => {
    setShowModal(true);
    // Set "income" as the initial type when the modal opens
    setData({ ...data, type: "income" });
  };
  const toggleModal1 = () => {
    setShowModal1(true);
    // Set "income" as the initial type when the modal opens
    setData({ ...data, type: "expense" });
  };
    const handleOnChange = (event) => {
      if (event.target.name === "category" || event.target.name === "account") {
        // Get the selected category's ID
        const selectedCategoryId = parseInt(event.target.value);
    
        // Update the data with the ID
        setData(event.target.name, selectedCategoryId);
      } else  {
        // Update other fields as usual
        setData(event.target.name, event.target.value);
      }
    };

  const submit = (e) => {
    e.preventDefault();

    post(route('Transaction.store'), data); // Assuming your API expects the entire data object.
  };
  const data02 = [
    { name: 'A1', value: 100 },
    { name: 'A2', value: 300 },
    { name: 'B1', value: 100 },
    { name: 'B2', value: 80 },
    { name: 'B3', value: 40 },
  ];

  return ( 
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
    >
      <Head title="Dashboard" />

      <div className="flex flex-col md:flex-row">
        <main className="flex-grow p-6">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg m-3">
          <h2 className='p-4'>Transactions</h2>
          {props.Transactions.map((transaction) => (
        <div className="flex justify-between items-center h-14 bg-white m-3 p-2 shadow-sm sm:rounded-lg"  key={transaction.id} >
        <div className="">
        <p>{transaction.category.name}</p>
        <p>{transaction.account.name}</p>
        </div>
        <div className="text-end">
            <p>{transaction.amount}</p>
            <p>{transaction.date}</p>
            </div>
          
        </div>
      ))}
          </div>
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg m-3">
          <h2 className='p-4'>Accounts</h2>
        {props.accounts.map((account) => (
        <div className="bg-white ">
        <div className="flex justify-between items-center h-14  m-3 p-2 rounded-lg" key={account.id} >
          <div className="">
          <p>{account.name}</p>
          <p>{account.notes}</p>
          
          </div>
          <div className="text-end">
          <p>{account.value}</p>
          </div>
        </div>
        </div>
      ))}
          </div>
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg m-3">
          <h2 className='p-4'>Categories</h2>
        {props.categorys.map((category) => (
        <div className="bg-white ">
        <div className="flex justify-between items-center h-14  m-3 p-2 rounded-lg" key={category.id} >
          <div className="">
          <p>{category.name}</p>
          </div>
        </div>
        </div>
      ))}
          </div>
        <div className="absolute right-4 bottom-16 mb-10">
    <button onClick={toggleModal}><FontAwesomeIcon icon={faCirclePlus} className="w-12 h-12 mr-2 fa-4x" color="green"/></button>
      <Modal show={showModal} onClose={toggleModal}>
      <div className='mx-4 space-y-4'>
      <Head title="Budget" />

      <form onSubmit={submit} className='text-black'>
        <h2 className='text-center text-black'>New Income</h2>
        <div className="flex flex-wrap -mx-3 mb-6 justify-between">
        <div className="w-80 px-3 mb-6 md:mb-0">
  <h3>Category</h3>
  <select
    id="category"
    name="category"
    onChange={handleOnChange}
    className="mt-1 block w-full"
    value={data.category || ''}
  >
    {!data.category && <option value="" disabled>Select Category</option>}
    {props.categorys.filter((category) => category.type === "income").map((cat, i) => (
      <option value={cat.id} key={i}>
        {cat.name}
      </option>
    ))}
  </select>
</div>


        <div className="w-80 px-3 mb-6">
          <h3>Value</h3>
          <TextInput
            id="income"
            type="number"
            name="income"
            placeholder="Enter the amount"
            value={data.income}
            className="mt-1 block w-full"
            onChange={handleOnChange}
          />
          <TextInput
            id="type"
            type="hidden"
            name="type"
            value="income"
            className="mt-1 block w-full"
            onChange={handleOnChange}
          />
        </div></div>
        <div className="flex flex-wrap -mx-3 mb-6 justify-between gap-4">

        
        <div className="w-80 px-3 mb-6">
          <h3>Account</h3>
          <select id="account" 
          name="account"
           onChange={handleOnChange} 
           value={data.account || ''}
           className="mt-1 block w-full">

{!data.account && <option value="" disabled>Select Account</option>}
          
            {
              props.accounts.map((acc,i) => <option key={i} value={acc.id}>{acc.name}
              
              </option>)
            }
          </select>
        </div>

        <div className="w-80 px-3 mb-6">
          <h3>Date</h3>
          <TextInput
            id="date"
            type="date"
            name="date"
            value={data.date}
            className="mt-1 block w-full"
            onChange={handleOnChange}
          />
        </div></div>
        <div className="flex flex-wrap -mx-3 mb-6 justify-between gap-4">
        <div className="w-80 px-3 mb-6">
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

        <div className="w-80 px-3 mb-6">
          <h3>Notes</h3>
          <TextInput
            id="notes"
            type="text"
            name="notes"
            value={data.notes}
            className="mt-1 block w-full"
            onChange={handleOnChange}
          />
        </div></div>

        <div className="w-80 px-3 mb-6">
          <h3>From</h3>
          <TextInput
            id="senders"
            type="text"
            name="senders"
            value={data.senders}
            className="mt-1 block w-full"
            onChange={handleOnChange}
          />
        </div>

        <div className="flex items-center justify-end my-4">
          <PrimaryButton className="ml-4" onClick={toggleModal} disabled={processing}>
            Cancel
          </PrimaryButton>
          <PrimaryButton className="ml-4" disabled={processing}>
            Save
          </PrimaryButton>
        </div>
      </form>
      
    </div>
          </Modal>
          </div>
          <div className="absolute right-4 bottom-11">
    <button onClick={toggleModal1}><FontAwesomeIcon icon={faCircleMinus} className="w-12 h-12 mr-2 fa-4x" color="red"/></button>
      <Modal show={showModal1} onClose={toggleModal1}>
      <div className='mx-4 space-y-4'>
      <Head title="Budget" />

      <form onSubmit={submit} className='text-black'>
      <h2 className='text-center text-black'>New Expense</h2>
      <div className="flex flex-wrap -mx-3 mb-6 justify-between">
        <div className="w-80 px-3 mb-6 md:mb-0">
          <h3>Category</h3>
          <select
    id="category"
    name="category"
    onChange={handleOnChange}
    className="mt-1 block w-full"
    value={data.category || ''}
  >
    {!data.category && <option value="" disabled>Select Category</option>}
    {props.categorys.filter((category) => category.type === "expense").map((cat, i) => (
      <option value={cat.id} key={i}>
        {cat.name}
      </option>
    ))}
  </select>
        </div>

        <div className="w-80 px-3 mb-6">
          <h3>Value</h3>
          <TextInput
            id="income"
            type="number"
            name="income"
            placeholder="Enter the amount"
            value={data.income}
            className="mt-1 block w-full"
            onChange={handleOnChange}
          />
          <TextInput
            id="type"
            type="hidden"
            name="type"
            value="expense"
            className="mt-1 block w-full"
            onChange={handleOnChange}
          />
        </div></div>
        <div className="flex flex-wrap -mx-3 mb-6 justify-between">
        <div className="w-80 px-3 mb-6">
          <h3>Account</h3>
          <select id="account" 
          name="account"
           onChange={handleOnChange} 
           value={data.account || ''}
           className="mt-1 block w-full">

{!data.account && <option value="" disabled>Select Account</option>}
          
            {
              props.accounts.map((acc,i) => <option key={i} value={acc.id}>{acc.name}
              
              </option>)
            }
          </select>
        </div>

        <div className="w-80 px-3 mb-6">
          <h3>Date</h3>
          <TextInput
            id="date"
            type="date"
            name="date"
            value={data.date}
            className="mt-1 block w-full"
            onChange={handleOnChange}
          />
        </div></div>
        <div className="flex flex-wrap -mx-3 mb-6 justify-between">
        <div className="w-80 px-3 mb-6">
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

        <div className="w-80 px-3 mb-6">
          <h3>Notes</h3>
          <TextInput
            id="notes"
            type="text"
            name="notes"
            value={data.notes}
            className="mt-1 block w-full"
            onChange={handleOnChange}
          />
        </div></div>
        <div className="w-80 px-3 mb-6">
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

        <div className="flex items-center justify-end my-4">
        <PrimaryButton className="ml-4" onClick={toggleModal1} disabled={processing}>
            Cancel
          </PrimaryButton>
          <PrimaryButton className="ml-4" disabled={processing}>
            Save
          </PrimaryButton>
        </div>
      </form>
      
    </div>
          </Modal>
          </div>
        </main>
      </div>
    </AuthenticatedLayout>
  );
}
