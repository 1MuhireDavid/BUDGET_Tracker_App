import React, { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, usePage } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus,faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
export default function IncomeTab(props) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editIncomeId, setEditIncomeId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { data, setData, post, processing } = useForm({
    name: '',
    type: "income"
  }); 
  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
  };
  const handleOnChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('Category.store'), data); // Assuming your API expects the entire data object.
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const editIncome = (income) => {
    setEditIncomeId(income.id);
    setData({
      name: income.name,
      type: income.type
    });
    toggleEditModal();
  };
  
  const submitEdit = async (e) => {
    console.log(editIncomeId);
    e.preventDefault();
    try {
      await patch(route('Category.update', editIncomeId));
      toggleEditModal();
      // Optionally, you can update the UI by fetching the updated data from the server
      // and setting it in the component state
    } catch (error) {
      console.error(`Error updating Income with id ${editIncomeId}`, error);
    }
  };
  const deleteIncome = async(incomeId) => {
    // Implement delete functionality (e.g., send a request to delete the Income from the database)
    try {
      await destroy(route('Income.destroy', incomeId));
      // Optionally, you can update the UI by removing the deleted Income from the local state
      // For example, if using React useState hook, you can filter out the deleted Income
      const updatedIncomes = props.Category.filter((income) => income.id !== incomeId);
      setData(updatedIncomes); // Assuming you have a setData method to update state
    } catch (error) {
      console.error(`Error deleting Income with id ${incomeId}`, error);
    }
  };
  return (
    <>
    <div className="">
    {props.Category.filter((category) => category.type === "income").map((category) => (
        <div className="flex justify-between items-center h-14 bg-white m-3 p-2 rounded-lg" key={category.id} >
          <div className="">
          <p>{category.name}</p>
          </div>
          <div className="flex items-center space-x-4">
                <button onClick={() => editIncome(Income)}>
                  <FontAwesomeIcon icon={faEdit} className="text-blue-500 cursor-pointer" />
                </button>
                <button onClick={() => deleteIncome(Income.id)}>
                  <FontAwesomeIcon icon={faTrash} className="text-red-500 cursor-pointer" />
                </button>
              </div>
        </div>
      ))}
    </div>
    <div className="absolute bottom-4 right-4 bottom-3 fixed">
    <button onClick={toggleModal}><FontAwesomeIcon icon={faCirclePlus} className="w-12 h-12 mr-2 fa-4x" /></button>
      <Modal show={showModal} onClose={toggleModal}>
      <div className='mx-4 space-y-4'>
      <Head title="Budget" />

      <form onSubmit={submit}>
        <div>
          <h3>Category Name</h3>
          <TextInput
            id="name"
            type="text"
            name="name"
            value={data.name}
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
      <Head title="Budget" />

      <form onSubmit={submitEdit}>
        <div>
          <h3>Category Name</h3>
          <TextInput
            id="name"
            type="text"
            name="name"
            value={data.name}
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
    </>
  )
}
