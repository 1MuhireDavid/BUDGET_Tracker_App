import React, { useState, } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, usePage } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PieChart, Pie, Tooltip } from 'recharts';

export default function Dashboard(props) {
  console.log(props);

  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const toggleModal1 = () => {
    setShowModal1(!showModal1);
  };

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

  const submit = (e) => {
    e.preventDefault();

    post(route('Transaction.store'), data); // Assuming your API expects the entire data object.
  };
  const data01 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Card 1 */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">    
              <div className="p-6 text-gray-900 dark:text-gray-100">Content for card 1</div>
            </div>
            {/* Card 2 */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">           
              <div className="p-6 text-gray-900 dark:text-gray-100">Content for card 2</div>
            </div>
            {/* Card 3 */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">              
              <div className="p-6 text-gray-900 dark:text-gray-100">
                <h2>Expenses</h2>
              <PieChart width={150} height={150}>
                <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={40} fill="#8884d8" />
                <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={10} outerRadius={30} fill="#82ca9d" label />
                <Tooltip/>
              </PieChart>
              </div>
            </div>
        </div>
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">Welcome!</div>
          </div>
        <div className="absolute right-4 bottom-16 mb-10">
    <button onClick={toggleModal}><FontAwesomeIcon icon={faCirclePlus} className="w-12 h-12 mr-2 fa-4x" color="green"/></button>
      <Modal show={showModal} onClose={toggleModal}>
      <div className='mx-4 space-y-4'>
      <Head title="Budget" />

      <form onSubmit={submit}>
        <div className="flex flex-wrap -mx-3 mb-6 justify-between">
        <div className="w-80 px-3 mb-6 md:mb-0">
          <h3>Category</h3>
          <select id="category" name="category" onChange={handleOnChange} className="mt-1 block w-full">
          <option>Enter Category</option>
            {
              props.categorys.map((cat,i) => <option value={cat.id} key={i}>{cat.name}</option>)
            }
          </select>

          
        </div>

        <div className="w-80 px-3 mb-6">
          <h3>Value</h3>
          <TextInput
            id="value"
            type="number"
            name="value"
            value={data.value}
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
          <select id="account" name="account" onChange={handleOnChange} className="mt-1 block w-full">
          <option>Enter Account</option>
            {
              props.accounts.map((acc,i) => <option key={i} value={acc.id}>{acc.name}</option>)
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
    <button onClick={toggleModal1}><FontAwesomeIcon icon={faCirclePlus} className="w-12 h-12 mr-2 fa-4x" color="red"/></button>
      <Modal show={showModal1} onClose={toggleModal1}>
      <div className='mx-4 space-y-4'>
      <Head title="Budget" />

      <form onSubmit={submit}>
      <div className="flex flex-wrap -mx-3 mb-6 justify-between">
        <div className="w-80 px-3 mb-6 md:mb-0">
          <h3>Category</h3>
          <select id="category" name="category" onChange={handleOnChange} className="mt-1 block w-full">
          <option>Enter Category</option>
            {
              props.categorys.map((cat,i) => <option value={cat.id} key={i}>{cat.name}</option>)
            }
          </select>
        </div>

        <div className="w-80 px-3 mb-6">
          <h3>Value</h3>
          <TextInput
            id="value"
            type="number"
            name="value"
            value={data.value}
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
          <select id="account" name="account" onChange={handleOnChange} className="mt-1 block w-full">
          <option>Enter Account</option>
            {
              props.accounts.map((acc,i) => <option key={i} value={acc.id}>{acc.name}</option>)
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
